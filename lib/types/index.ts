export interface User {
  id: string;
  userType: "athlete" | "scout" | "admin";
  sid?: string;
  status: "pending" | "rejected" | "verified" | "suspended";
  auth: {
    email: string;
    passwordHash: string;
  };
  timestamp: {
    joined: Date;
    lastActive: Date | null;
  };
}

export interface SId {
  uid: string;
  prefix: "ATH" | "SCT";
  created: Date;
  userId: string;
}
