'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import ScrollAnimation from '@/components/ScrollAnimation';

// 示例数据 - 后续会从 Notion 获取
const storiesData: Record<string, {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: { name: string; avatar: string; bio: string };
    location: string;
    date: string;
    likes: number;
    comments: number;
    tags: string[];
    images: string[];
}> = {
    '1': {
        id: '1',
        title: '在京都的七天：穿越千年的古都之旅',
        excerpt: '漫步在岚山竹林，感受千年古刹的宁静，品尝地道的抹茶甜品，这是一段难忘的日本之旅...',
        content: `
## 第一天：初遇京都

清晨的京都站，阳光透过玻璃穹顶洒落，为这座古都镀上一层金色。走出车站的那一刻，我就被这座城市的宁静所震撼——尽管是繁忙的交通枢纽，却没有喧嚣，只有井然有序的人流。

我们入住的旅馆在祇园附近，是一家传统的町家改造而成的民宿。推开木质的大门，榻榻米的清香扑面而来，让人瞬间忘记了旅途的疲惫。

## 第二天：岚山竹林

岚山的竹林是此行的第一个重要目的地。清晨六点，我们就抵达了这里，只为避开人潮，独享这片竹海的静谧。

漫步在竹林小径中，阳光透过密密的竹叶洒落，形成斑驳的光影。风吹过时，竹叶沙沙作响，仿佛在诉说着千年的故事。

## 第三天：金阁寺与龙安寺

金阁寺的美，是一种让人窒息的华丽。金色的阁楼倒映在镜湖池中，与周围的青松绿柏形成绝妙的对比。我们在这里驻足良久，从不同的角度欣赏这座建筑的美。

龙安寺的枯山水庭院则是另一种美——简约、禅意、深邃。十五块石头散落在白砂之上，据说无论从哪个角度看，都无法同时看到全部的石头。

## 第四天：伏见稻荷大社

千本�的红色壮观景象，是我此行最期待的景点之一。一万多根朱红色的鸟居，绵延在稻荷山的山路上，形成一条通往神域的隧道。

我们花了近四个小时，走完了整条登山路线。山顶的风景虽然不算惊艳，但一路上的体验却是无与伦比的。

## 尾声

七天的京都之旅，让我深深爱上了这座城市。它是如此的独特——现代与传统在这里完美融合，繁华与宁静在这里和谐共存。

下次，我一定会再来。也许是樱花盛开的春天，也许是红叶似火的秋天。京都，我们后会有期。
        `,
        coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80',
        author: {
            name: '小明',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
            bio: '旅行摄影师 | 用镜头记录世界'
        },
        location: '日本 · 京都',
        date: '2024-12-15',
        likes: 24,
        comments: 8,
        tags: ['日本', '文化', '寺庙', '自然'],
        images: [
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
            'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
        ]
    },
    '2': {
        id: '2',
        title: '瑞士阿尔卑斯：雪山与湖泊的交响曲',
        excerpt: '乘坐少女峰登山火车，穿越云海之上，眺望欧洲之巅的壮丽景色...',
        content: `
## 少女峰之巅

凌晨四点出发，我们踏上了前往少女峰的旅程。登山火车缓缓穿过绿色的草甸，越过云层，最终抵达欧洲最高的火车站。

站在观景台上，阿莱奇冰川在脚下延伸，白雪皑皑的山峰环绕四周。这一刻，所有的言语都显得苍白无力。

## 因特拉肯的黄昏

回到因特拉肯，我们在图恩湖边漫步。夕阳将湖面染成金色，远处的少女峰在暮色中若隐若现。这是最美的瑞士记忆。
        `,
        coverImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80',
        author: {
            name: '小红',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            bio: '户外爱好者 | 征服每一座山峰'
        },
        location: '瑞士 · 少女峰',
        date: '2024-11-20',
        likes: 42,
        comments: 15,
        tags: ['瑞士', '雪山', '自然', '户外'],
        images: [
            'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        ]
    },
    '3': {
        id: '3',
        title: '东南亚美食探索：从曼谷到新加坡',
        excerpt: '从曼谷街头小吃到新加坡米其林，一场跨越三个国家的美食冒险...',
        content: `
## 曼谷的街头滋味

夜幕降临，曼谷的街头开始热闹起来。烧烤摊的烟火气、冬阴功汤的酸辣香、芒果糯米饭的甜蜜，这里是美食天堂。

我们在考山路的小摊前驻足，尝试了各种从未见过的小吃。有些惊艳，有些...需要勇气。但这正是旅行的乐趣所在。

## 新加坡的米其林之夜

旅程的最后一站，我们预订了新加坡的一家米其林餐厅。精致的摆盘，细腻的口感，每一道菜都是艺术品。

从街头小吃到米其林星级，这趟美食之旅让我明白：美食无高低之分，只有用心与否。
        `,
        coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
        author: {
            name: '大华',
            avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80',
            bio: '美食探险家 | 用味蕾环游世界'
        },
        location: '泰国 · 曼谷',
        date: '2024-10-08',
        likes: 38,
        comments: 12,
        tags: ['美食', '东南亚', '泰国', '新加坡'],
        images: [
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
            'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&q=80',
        ]
    }
};

export default function StoryDetailPage() {
    const params = useParams();
    const storyId = params.id as string;
    const story = storiesData[storyId];

    if (!story) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">故事不存在</h1>
                    <Link href="/" className="btn-primary">返回首页</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px]">
                <Image
                    src={story.coverImage}
                    alt={story.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Back Button */}
                <motion.div
                    className="absolute top-24 left-6 z-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        返回首页
                    </Link>
                </motion.div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Tags */}
                            <div className="flex gap-2 mb-4">
                                {story.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
                                {story.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/80">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {story.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {story.date}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <ScrollAnimation animation="fadeUp">
                            <div className="prose prose-lg max-w-none">
                                {story.content.split('\n').map((paragraph, index) => {
                                    if (paragraph.startsWith('## ')) {
                                        return (
                                            <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                                                {paragraph.replace('## ', '')}
                                            </h2>
                                        );
                                    }
                                    if (paragraph.trim()) {
                                        return (
                                            <p key={index} className="text-gray-600 leading-relaxed mb-4">
                                                {paragraph}
                                            </p>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </ScrollAnimation>

                        {/* Image Gallery */}
                        <ScrollAnimation animation="fadeUp" delay={0.2}>
                            <div className="mt-12">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">旅途瞬间</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {story.images.map((src, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                                            <Image
                                                src={src}
                                                alt={`${story.title} - 图片 ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <ScrollAnimation animation="slideRight" delay={0.3}>
                            <div className="sticky top-24 space-y-8">
                                {/* Author Card */}
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                            <Image
                                                src={story.author.avatar}
                                                alt={story.author.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{story.author.name}</h4>
                                            <p className="text-sm text-gray-500">{story.author.bio}</p>
                                        </div>
                                    </div>
                                    <button className="w-full btn-primary text-sm">关注作者</button>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-around py-4 border-y border-gray-200">
                                    <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                                        <Heart className="w-6 h-6" />
                                        <span className="text-sm">{story.likes}</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-[var(--primary)] transition-colors">
                                        <MessageCircle className="w-6 h-6" />
                                        <span className="text-sm">{story.comments}</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-[var(--primary)] transition-colors">
                                        <Share2 className="w-6 h-6" />
                                        <span className="text-sm">分享</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-[var(--accent)] transition-colors">
                                        <Bookmark className="w-6 h-6" />
                                        <span className="text-sm">收藏</span>
                                    </button>
                                </div>

                                {/* Related Stories */}
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-4">相关故事</h4>
                                    <div className="space-y-4">
                                        {Object.values(storiesData)
                                            .filter(s => s.id !== storyId)
                                            .slice(0, 2)
                                            .map(relatedStory => (
                                                <Link
                                                    key={relatedStory.id}
                                                    href={`/stories/${relatedStory.id}`}
                                                    className="flex gap-4 group"
                                                >
                                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={relatedStory.coverImage}
                                                            alt={relatedStory.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-medium text-gray-900 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                                                            {relatedStory.title}
                                                        </h5>
                                                        <p className="text-sm text-gray-500 mt-1">{relatedStory.location}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </div>
        </article>
    );
}
