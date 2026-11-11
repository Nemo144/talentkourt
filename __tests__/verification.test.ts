import { approveUser, rejectUser } from "@/lib/actions/verification";
import { prisma } from "@/lib/prisma";
import { issueTId } from "@/lib/services/tidService";
import { createNotification } from "@/lib/services/notificationService";
import { requireAdmin } from "@/lib/auth/adminMiddleware";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    verificationLog: { create: jest.fn().mockResolvedValue({ id: "log-abc" }) },
    user: { update: jest.fn().mockResolvedValue({ id: "user-123" }) },
    $transaction: jest.fn().mockResolvedValue([]),
  },
}));

jest.mock("@/lib/auth/adminMiddleware", () => ({
  requireAdmin: jest.fn(),
}));

jest.mock("@/lib/services/tidService", () => ({
  issueTId: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/lib/services/notificationService", () => ({
  createNotification: jest.fn().mockResolvedValue({ success: true }),
}));

describe("Admin verification server actions", () => {
  const adminId = "admin-999";
  const userId = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
    (requireAdmin as jest.Mock).mockResolvedValue({ user: { id: adminId } });
  });

  it("approves a user, issues a T.id, logs it with the session admin id and notifies", async () => {
    const response = await approveUser(userId, "ATHLETE");

    expect(response.success).toBe(true);
    expect(issueTId).toHaveBeenCalledWith(userId, "ATHLETE");
    expect(prisma.verificationLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId,
        adminId,
        verificationStatus: "VERIFIED",
      }),
    });
    expect(createNotification).toHaveBeenCalledWith(
      expect.objectContaining({ userId, type: "TID_ISSUED" }),
    );
  });

  it("rejects a user with the typed reason and never issues a T.id", async () => {
    const reason = "Incomplete verification files provided.";
    const response = await rejectUser(userId, reason);

    expect(response.success).toBe(true);
    expect(issueTId).not.toHaveBeenCalled();
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(prisma.verificationLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId,
        adminId,
        verificationStatus: "REJECTED",
        notes: reason,
      }),
    });
    expect(createNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        userId,
        type: "VERIFICATION_REJECTED",
        content: expect.stringContaining(reason),
      }),
    );
  });

  it("does not run any action when the caller is not an admin", async () => {
    (requireAdmin as jest.Mock).mockRejectedValue(new Error("NEXT_REDIRECT"));

    await expect(approveUser(userId, "ATHLETE")).rejects.toThrow();

    expect(issueTId).not.toHaveBeenCalled();
    expect(prisma.verificationLog.create).not.toHaveBeenCalled();
  });
});
