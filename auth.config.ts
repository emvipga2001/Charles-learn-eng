import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname === '/login';
            const isOnLanding = nextUrl.pathname === '/';
            const isAuthPage = isOnLoginPage || isOnLanding;

            // Đã đăng nhập -> chuyển về home nếu đang ở trang auth
            if (isLoggedIn && isAuthPage) {
                return NextResponse.redirect(new URL('/home', nextUrl));
            }

            // Chưa đăng nhập -> chuyển về login nếu không ở trang auth
            if (!isLoggedIn && !isAuthPage) {
                return NextResponse.redirect(new URL('/login', nextUrl));
            }

            return true;
        },
    },
    providers: [], // Providers sẽ được định nghĩa trong auth.ts
} satisfies NextAuthConfig;
