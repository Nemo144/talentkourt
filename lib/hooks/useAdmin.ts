import { useSession } from "next-auth/react";

export const useAdmin = () => {
  const { data: session, status } = useSession();

  //check if the data still loading
  const isLoading = status === "loading";

  //check if the user is an admin
  const isAdmin =
    status === "authenticated" && session.user.userType === "ADMIN";

  return {
    session,
    isLoading,
    isAdmin,
    isAuthenticated: status === "authenticated",
  };
};
