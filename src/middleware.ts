import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/my-bookings", "/admin", "/checkout"];
const authRoutes = ["/login", "/signup"];

export function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    const token = req.cookies.get("accessToken")?.value;

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.includes(pathname);

    if (isProtectedRoute && !token) {
        const loginUrl = new URL("/login", req.url);

        const redirectPath = encodeURIComponent(pathname + search);

        loginUrl.searchParams.set("redirect", redirectPath);

        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"]
};
