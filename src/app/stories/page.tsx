'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const stories = [
    {
        id: 1,
        title: '东京秋日漫步',
        excerpt: '在落叶纷飞的季节，漫步于明治神宫的参道上，感受这座城市独特的静谧与繁华交织...',
        location: '日本·东京',
        date: '2024年11月',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
        author: '小明',
        readTime: '5分钟',
    },
    {
        id: 2,
        title: '巴厘岛的日落',
        excerpt: '金巴兰海滩的日落，是我见过最美的晚霞。海天一色，渔船点点，这一刻值得永远珍藏...',
        location: '印尼·巴厘岛',
        date: '2024年10月',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        author: '小红',
        readTime: '4分钟',
    },
    {
        id: 3,
        title: '瑞士阿尔卑斯之旅',
        excerpt: '乘坐冰川列车穿越雪山，在少女峰顶俯瞰云海，这是一场梦幻般的旅程...',
        location: '瑞士·因特拉肯',
        date: '2024年9月',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
        author: '小刚',
        readTime: '6分钟',
    },
    {
        id: 4,
        title: '北海道雪国物语',
        excerpt: '二世古的粉雪，小樽的运河，函馆的夜景，在这片银白世界里享受冬日的浪漫...',
        location: '日本·北海道',
        date: '2024年2月',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        author: '小明',
        readTime: '5分钟',
    },
    {
        id: 5,
        title: '普吉岛蜜月之旅',
        excerpt: '蔚蓝的安达曼海，洁白的沙滩，椰林树影，这里是热带天堂的代名词...',
        location: '泰国·普吉岛',
        date: '2024年5月',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        author: '小红',
        readTime: '4分钟',
    },
    {
        id: 6,
        title: '新西兰南岛自驾',
        excerpt: '从皇后镇出发，沿着壮阔的峡湾公路，探索中土世界的自然奇观...',
        location: '新西兰·皇后镇',
        date: '2024年3月',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        author: '小刚',
        readTime: '7分钟',
    },
];

export default function StoriesPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <section className="container-custom mb-16">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        旅行<span className="text-gradient">故事</span>
                    </h1>
                    <p className="text-[var(--muted)] text-lg">
                        每一次旅行都是一个故事，每一个故事都值得被记录。
                        <br />
                        这里收藏着我们走过的山川湖海，遇见的人和风景。
                    </p>
                </motion.div>
            </section>

            {/* Stories Grid */}
            <section className="container-custom">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <motion.article
                            key={story.id}
                            className="card-glass overflow-hidden group"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>{story.location}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {story.date}
                                    </span>
                                    <span>{story.readTime}阅读</span>
                                </div>
                                <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
                                    {story.title}
                                </h2>
                                <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">
                                    {story.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[var(--muted)]">
                                        作者：{story.author}
                                    </span>
                                    <Link
                                        href={`/stories/${story.id}`}
                                        className="flex items-center gap-1 text-[var(--primary)] font-medium text-sm hover:gap-2 transition-all"
                                    >
                                        阅读更多
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </main>
    );
}
