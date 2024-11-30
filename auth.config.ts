import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname === '/login';
            const isOnLanding = nextUrl.pathname === '/';
            
            if (isLoggedIn && isOnLoginPage && !isOnLanding) {
                // Nếu đã đăng nhập và đang ở trang login, chuyển hướng tới trang chủ
                return Response.redirect(new URL('/home', nextUrl));
            }

            if (!isLoggedIn && !isOnLoginPage && !isOnLanding) {
                // Nếu chưa đăng nhập và không ở trang login, chuyển hướng tới trang login
                return Response.redirect(new URL('/login', nextUrl));
            }

            // Mặc định, cho phép truy cập trang
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
