import { requireAdmin } from "@/lib/auth/adminMiddleware";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import UserDetailPanel from "@/components/admin/UserDetailPanel";

const UserDetailPage = async ({ params }: { params: { id: string } }) => {
  await requireAdmin();

  //get id from the params
  const userId = params.id;

  //fetch specific user from db
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { tidRecord: true },
  });

  //handle for user not found
  if (!user) notFound();

  return (
    <div className="p-6">
      <UserDetailPanel user={user!} />
    </div>
  );
};

export default UserDetailPage;
