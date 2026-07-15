import UsersTable from "@/components/admin/UsersTable";
import { requireAdmin } from "@/lib/auth/adminMiddleware";

const page = async () => {
  //invoke the requireAdmin function to trigger security checks
  await requireAdmin();

  return <UsersTable />;
};

export default page;
