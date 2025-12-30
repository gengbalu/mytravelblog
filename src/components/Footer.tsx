import Link from 'next/link';
import { Compass, Heart, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container-custom py-16">
                {/* Logo & Description - 居中显示 */}
                <div className="flex flex-col items-center text-center">
                    <Link href="/" className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                            <Compass className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold">旅行日记</span>
                    </Link>
                    <p className="text-gray-400 mb-6 max-w-md">
                        与朋友分享旅行的点滴，记录每一次冒险，规划下一段旅程。
                        这里是属于我们的私密空间。
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Bottom - 版权信息居中 */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col items-center gap-2">
                    <p className="text-gray-500 text-sm">
                        © 2024 旅行日记. Made with <Heart className="w-4 h-4 inline text-red-500" /> by friends.
                    </p>
                </div>
            </div>
        </footer>
    );
}
