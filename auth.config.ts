import type { NextAuthConfig } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = request.nextUrl.pathname === '/login';
            const isOnLanding = request.nextUrl.pathname === '/';
            const isAuthPage = isOnLoginPage || isOnLanding;
            const isApi = request.nextUrl.pathname.startsWith('/api');

            // Đã đăng nhập -> chuyển về home nếu đang ở trang auth
            if (isLoggedIn && isAuthPage && !isApi) {
                return NextResponse.redirect(new URL('/home', request.nextUrl));
            }

            // Chưa đăng nhập -> chuyển về login nếu không ở trang auth
            if (!isLoggedIn && !isAuthPage && !isApi) {
                return NextResponse.redirect(new URL('/login', request.nextUrl));
            }

            // Kiểm tra token khi gọi API
            if(isApi){
                const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
                if (!token) {
                    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
                }
            }

            return true;
        },
    },
    providers: [], // Providers sẽ được định nghĩa trong auth.ts
} satisfies NextAuthConfig;
