import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./app/utils/decodeToken";

const protectedRoutes = ["/profile", "/my-bookings", "/checkout"];
const authRoutes = ["/login", "/signup"];
const adminRoutes = ["/admin/events", "/admin/categorys", "/admin/bookings", "/admin/users"]

export function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    const token = req.cookies.get("accessToken")?.value;
    let decoded;

    if (token) {
        decoded = decodeToken(token);
    }

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isAdminRoute = adminRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);

    if ((isProtectedRoute || isAdminRoute) && !token) {
        const loginUrl = new URL("/login", req.url);

        const redirectPath = encodeURIComponent(pathname + search);

        loginUrl.searchParams.set("redirect", redirectPath);

        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }


    if (isAdminRoute && decoded?.role !== 'admin') {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"]
};
