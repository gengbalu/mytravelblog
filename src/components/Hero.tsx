'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

// 打字机效果组件
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 80);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, text, started]);

    return (
        <span className="inline-block">
            {displayedText}
            {currentIndex < text.length && (
                <span className="animate-pulse text-[var(--accent)]">|</span>
            )}
        </span>
    );
}

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Ken Burns Animation */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80')`,
                    }}
                />
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 gradient-hero" />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-6 max-w-4xl" style={{ marginTop: '-40px' }}>


                {/* 标题横排一行 */}
                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight whitespace-nowrap"
                    style={{ marginBottom: '40px' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    分享旅程，<span className="text-[var(--accent)]">记录美好</span>
                </motion.h1>

                {/* 副标题 - 从右向左打字机效果 */}
                <motion.div
                    className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto h-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <TypewriterText
                        text="与好友分享旅行的点滴，记录每一次同游的故事，规划下一段精彩的旅程。"
                        delay={1200}
                    />
                </motion.div>


            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ChevronDown className="w-8 h-8 text-white/70" />
            </motion.div>
        </section>
    );
}
