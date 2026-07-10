import VerificationQueue from "@/components/admin/VerificationQueue";
import { requireAdmin } from "@/lib/auth/adminMiddleware";

const page = async () => {
  //invoke the requireAdmin function to trigger security checks
  await requireAdmin();
  return (
    <div>
      <VerificationQueue />
    </div>
  );
};

export default page;
