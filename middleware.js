import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export const middleware = async (req) => {
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/login';
    const token = req.cookies.get('token')?.value || '';

    if (path === '/') return NextResponse.redirect(new URL('/dashboard', req.url));

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', req.url))
    } else if (isPublicPath && !isTokenExpired(token)) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
}

const isTokenExpired = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        return true
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/dashboard',
        '/estimates',
        '/new-estimate'
    ],
}