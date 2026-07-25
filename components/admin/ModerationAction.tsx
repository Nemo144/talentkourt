"use client";

import React, { useTransition } from "react";
import {
  approveContent,
  removeContent,
  warnUser,
} from "@/lib/actions/moderation";
import { useSession } from "next-auth/react";

interface ModerationActionProps {
  contentId: string;
  userId: string;
}

const ModerationAction = ({ contentId, userId }: ModerationActionProps) => {
  //useTransition to prevent UI blocking by handling server action states
  //at the same time without a manual loading spinner state
  const [isPending, tartTransition] = useTransition();

  //useSession to manage the adminId's session
  const { data: session } = useSession();

  const adminId = session?.user.id ?? "";
  return <div>ModerationAction</div>;
};

export default ModerationAction;
