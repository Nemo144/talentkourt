import { auth } from "@/auth";
import { getNotifications } from "@/lib/services/notificationService";
import NotificationCenter from "./NotificationCenter";

export default async function NotificationCenterWrapper() {
  const session = await auth();

  if (!session?.user?.id) return null;

  const result = await getNotifications(session.user.id);
  const notifications = result.success && result.data ? result.data : [];

  return <NotificationCenter notifications={notifications} />;
}
