'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Compass, LogOut, BookOpen, Camera, Footprints } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-gradient' : 'text-white'
              }`}>旅行日记</span>
          </Link>

          {/* Desktop Navigation - 中间导航 */}
          <nav className="hidden md:flex items-center gap-6">
            {/* 首页 */}
            <Link
              href="/"
              className={`font-medium transition-colors relative group ${isScrolled
                ? 'text-[var(--muted)] hover:text-[var(--primary)]'
                : 'text-white/80 hover:text-white'
                }`}
            >
              首页
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-[var(--primary)]' : 'bg-white'
                }`} />
            </Link>

            {/* 行程计划 - 带脚步图标 */}
            <Link
              href="/trips"
              className={`flex items-center gap-1.5 font-medium transition-colors relative group ${isScrolled
                ? 'text-[var(--muted)] hover:text-[var(--primary)]'
                : 'text-white/80 hover:text-white'
                }`}
            >
              <Footprints className="w-4 h-4" />
              行程计划
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-[var(--primary)]' : 'bg-white'
                }`} />
            </Link>

            {/* 分隔线 */}
            <div className={`w-px h-5 ${isScrolled ? 'bg-[var(--border)]' : 'bg-white/30'}`} />

            {/* 浏览故事 */}
            <Link
              href="/stories"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${isScrolled
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20'
                : 'bg-white/15 text-white hover:bg-white/25'
                }`}
            >
              <BookOpen className="w-4 h-4" />
              浏览故事
            </Link>

            {/* 查看相册 */}
            <Link
              href="/gallery"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${isScrolled
                ? 'bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20'
                : 'bg-white/15 text-white hover:bg-white/25'
                }`}
            >
              <Camera className="w-4 h-4" />
              查看相册
            </Link>
          </nav>

          {/* User Actions - 右侧：主题切换 + 登录（间距加大） */}
          <div className="hidden md:flex items-center gap-8">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className={`flex items-center gap-1.5 text-sm py-2 px-4 rounded-full font-semibold transition-all border-2 ${isScrolled
                ? 'border-red-400 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500'
                : 'border-white/50 text-white hover:bg-white/10'
                }`}>
              <LogOut className="w-4 h-4" />
              退出
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className={`p-2 ${isScrolled ? 'text-[var(--foreground)]' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--border)] animate-fade-in bg-[var(--background)]">
            <Link
              href="/"
              className="block py-3 text-[var(--muted)] hover:text-[var(--primary)] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              href="/trips"
              className="flex items-center gap-2 py-3 text-[var(--muted)] hover:text-[var(--primary)] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Footprints className="w-4 h-4" />
              行程计划
            </Link>
            <Link
              href="/stories"
              className="flex items-center gap-2 py-3 text-[var(--primary)] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="w-4 h-4" />
              浏览故事
            </Link>
            <Link
              href="/gallery"
              className="flex items-center gap-2 py-3 text-[var(--accent)] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Camera className="w-4 h-4" />
              查看相册
            </Link>
            <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--border)]">
              <button
                onClick={handleLogout}
                className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-1 text-red-500 border-red-400 hover:bg-red-500 hover:text-white">
                <LogOut className="w-4 h-4" />
                退出登录
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
