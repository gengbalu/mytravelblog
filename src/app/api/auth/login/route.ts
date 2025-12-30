import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 简单的密码验证
// 密码存储在环境变量中，生产环境请使用 .env.local 配置
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'friends2024';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        if (password === SITE_PASSWORD) {
            // 设置认证 Cookie，有效期 7 天
            const cookieStore = await cookies();
            cookieStore.set('auth_token', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 天
                path: '/',
            });

            return NextResponse.json({ success: true, message: '登录成功' });
        } else {
            return NextResponse.json(
                { success: false, message: '密码错误，请重试' },
                { status: 401 }
            );
        }
    } catch {
        return NextResponse.json(
            { success: false, message: '服务器错误' },
            { status: 500 }
        );
    }
}
