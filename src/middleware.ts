import { NextRequest, NextResponse } from 'next/server';

// 不需要认证的路径
const publicPaths = ['/login', '/api/auth/login', '/api/auth/logout'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 检查是否是公开路径
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // 静态资源不需要认证
    const isStaticResource = pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.');

    if (isPublicPath || isStaticResource) {
        return NextResponse.next();
    }

    // 检查认证 Cookie
    const authToken = request.cookies.get('auth_token');

    if (!authToken || authToken.value !== 'authenticated') {
        // 未认证，重定向到登录页
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * 匹配所有路径除了:
         * - api/auth (认证相关API)
         * - _next/static (静态文件)
         * - _next/image (图片优化)
         * - favicon.ico (网站图标)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
