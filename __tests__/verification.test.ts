import { approveUser, rejectUser } from "@/lib/actions/verification";
import { prisma } from "@/lib/prisma";
import { issueTId } from "@/lib/services/tidService";
import { createNotification } from "@/lib/services/notificationService";
import { revalidatePath } from "next/cache";

// 1. ✅ FIXED JEST MOCK: Separated instantiation to eliminate implicit cyclical self-referencing types
jest.mock("@/lib/prisma", () => {
  const mockPrisma = {
    verificationLog: {
      create: jest.fn().mockResolvedValue({ id: "log-abc" }),
    },
    user: {
      update: jest
        .fn()
        .mockResolvedValue({
          id: "user-123",
          status: "VERIFIED",
          tid: "ATH-00123",
        }),
    },
    $transaction: jest.fn(),
  };

  // Safely assign transactional implementation using an absolute callback parameter signature block
  mockPrisma.$transaction.mockImplementation(
    (callback: (tx: typeof mockPrisma) => Promise<unknown>) =>
      callback(mockPrisma),
  );

  return { prisma: mockPrisma };
});

// Mock tidService
jest.mock("@/lib/services/tidService", () => ({
  issueTId: jest.fn().mockResolvedValue(undefined),
}));

// Mock notificationService
jest.mock("@/lib/services/notificationService", () => ({
  createNotification: jest.fn().mockResolvedValue({ success: true }),
}));

// Mock revalidatePath
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Admin Verification Server Actions", () => {
  const mockAdminId = "admin-999";
  const mockUserId = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========================================================
  // TEST CASE 1: APPROVE USER
  // ========================================================
  it("should successfully approve a user, issue a T.ID, and log metrics", async () => {
    const response = await approveUser(mockAdminId, mockUserId, "ATHLETE");

    expect(response).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: mockUserId },
        data: expect.objectContaining({ status: "VERIFIED" }),
      }),
    );
    expect(issueTId).toHaveBeenCalledWith(mockUserId);
    expect(createNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: mockUserId,
        type: "TID_ISSUED",
      }),
    );
    expect(revalidatePath).toHaveBeenCalledWith("/admin/moderation");
  });

  // ========================================================
  // TEST CASE 2: REJECT USER
  // ========================================================
  it("should successfully reject a user and dispatch an alert notification", async () => {
    // Override user update mock value specifically for the rejection pipeline
    (prisma.user.update as jest.Mock).mockResolvedValueOnce({
      id: mockUserId,
      status: "REJECTED",
    });

    const response = await rejectUser(
      mockAdminId,
      mockUserId,
      "ADMIN",
      "Incomplete verification files provided.",
    );

    expect(response).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );

    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: mockUserId },
        data: expect.objectContaining({ status: "REJECTED" }),
      }),
    );
    expect(issueTId).not.toHaveBeenCalled(); // Rejections must NEVER issue a T.ID passport
    expect(createNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: mockUserId,
        type: "VERIFICATION_REJECTED",
      }),
    );
    expect(revalidatePath).toHaveBeenCalledWith("/admin/moderation");
  });
});
