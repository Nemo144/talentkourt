export enum VerificationStatus {
  Pending = "PENDING",
  Rejected = "REJECTED",
  Verified = "VERIFIED",
  Suspended = "SUSPENDED",
}
export interface User {
  id: string;
  userType: "athlete" | "scout" | "admin";
  TId?: string;
  status: VerificationStatus;
  auth: {
    email: string;
    passwordHash: string;
  };
  timestamp: {
    joined: Date;
    lastActive: Date | null;
  };
}

export interface TId {
  uid: string;
  prefix: "ATH" | "SCT";
  created: Date;
  userId: string;
}
