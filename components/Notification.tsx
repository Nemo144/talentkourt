"use client";

import React, { useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Bell, X } from "lucide-react";
import { NotificationType } from "@/lib/generated/prisma/enums";

interface NotificationToastProps {
  id: string;
  message: string;
  type: NotificationType;
  onClose: (id: string) => void;
  durationMs?: number; // Optional fallback timer override (default: 4000ms)
}
