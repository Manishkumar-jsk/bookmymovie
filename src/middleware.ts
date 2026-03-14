import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/my-bookings", "/admin", "/checkout"];
const authRoutes = ["/login", "/signup"];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get("token")?.value;

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.includes(pathname);

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"]
};
