import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const isLogged = !!req.nextauth.token;

        if (isLogged && pathname === '/login') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (isLogged && pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (!isLogged && pathname === '/') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const { pathname } = req.nextUrl;

                if (pathname.startsWith('/api/login') || pathname.startsWith('/api/auth')) {
                    return true;
                }

                if (pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
                    return !!token;
                }
                return true;
            }
        }
    }
);

export const config = {
    matcher: ['/:path*']
};