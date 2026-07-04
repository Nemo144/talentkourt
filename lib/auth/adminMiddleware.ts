import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const requireAdmin = async () => {
  //initialize the loggin session
  const session = await auth();

  //check if user is not logged in
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  //check if user logged in is not admin
  if (session.user.userType !== "ADMIN") {
    redirect("/");
  }

  //if admin, allow
  return session;
};
