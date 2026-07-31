import FlaggedContent from "@/components/admin/FlaggedContent";
import { requireAdmin } from "@/lib/auth/adminMiddleware";

const page = async () => {
  //invoke the requireAdmin function to trigger security checks
  await requireAdmin();

  return (
    <div>
      <FlaggedContent />
    </div>
  );
};

export default page;
