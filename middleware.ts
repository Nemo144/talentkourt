import { auth } from "./auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const publicRoutes = ["/", "/sign-in", "/signup", "/forgot-password"];

const protectedRoutes = ["/dashboard", "/admin"];

export default auth((req) => {
  //pathname for the routes
  const { pathname } = req.nextUrl;

  //convert isLoggedIn to boolean
  const isLoggedIn = !!req.auth;

  //confirm the pathname for the public routes
  const isPublicRoutes = publicRoutes.includes(pathname);

  //confirm the pathname for the protected routes
const isProtectedRoutes = protectedRoutes.some((route) =>
  pathname.startsWith(route),
);
  //redirect to sign-in page
  if (isProtectedRoutes && !isLoggedIn) {
    return NextResponse.redirect(new URL(publicRoutes[1], req.url));
  }

  //send signed-in users to their own home
  if (isPublicRoutes && isLoggedIn && pathname !== "/") {
  const role = req.auth?.user?.userType;
  const home =
    role === "ADMIN"
      ? "/admin"
      : role === "SCOUT"
        ? "/dashboard/scout"
        : "/dashboard/player";
  return NextResponse.redirect(new URL(home, req.url));
}

  //request passed through
  return NextResponse.next();
});

//run middleware on everything except api routes, nextjs internals and static files
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
