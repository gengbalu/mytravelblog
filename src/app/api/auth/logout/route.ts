import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        // 清除认证 Cookie
        const cookieStore = await cookies();
        cookieStore.delete('auth_token');

        return NextResponse.json({ success: true, message: '已退出登录' });
    } catch {
        return NextResponse.json(
            { success: false, message: '退出失败' },
            { status: 500 }
        );
    }
}
