'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Download, Share2, Filter, Grid, LayoutGrid } from 'lucide-react';
import ScrollAnimation from '@/components/ScrollAnimation';

interface Photo {
    id: string;
    src: string;
    alt: string;
    location: string;
    date: string;
    category: string;
}

// 示例数据
const allPhotos: Photo[] = [
    { id: '1', src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', alt: '京都竹林', location: '日本 · 京都', date: '2024-12', category: '自然' },
    { id: '2', src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80', alt: '阿尔卑斯雪山', location: '瑞士 · 少女峰', date: '2024-11', category: '自然' },
    { id: '3', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: '山间日出', location: '瑞士', date: '2024-11', category: '自然' },
    { id: '4', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', alt: '泰国美食', location: '泰国 · 曼谷', date: '2024-10', category: '美食' },
    { id: '5', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', alt: '湖泊风光', location: '瑞士 · 卢塞恩', date: '2024-11', category: '自然' },
    { id: '6', src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', alt: '巴黎铁塔', location: '法国 · 巴黎', date: '2024-09', category: '城市' },
    { id: '7', src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80', alt: '威尼斯', location: '意大利 · 威尼斯', date: '2024-08', category: '城市' },
    { id: '8', src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', alt: '迪拜夜景', location: '阿联酋 · 迪拜', date: '2024-07', category: '城市' },
    { id: '9', src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', alt: '日本神社', location: '日本 · 东京', date: '2024-12', category: '文化' },
    { id: '10', src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', alt: '日本庭院', location: '日本 · 京都', date: '2024-12', category: '文化' },
    { id: '11', src: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&q=80', alt: '街头美食', location: '泰国 · 曼谷', date: '2024-10', category: '美食' },
    { id: '12', src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80', alt: '威尼斯运河', location: '意大利 · 威尼斯', date: '2024-08', category: '城市' },
];

const categories = ['全部', '自然', '城市', '文化', '美食'];

export default function GalleryPage() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState('全部');
    const [layout, setLayout] = useState<'grid' | 'masonry'>('masonry');

    const filteredPhotos = activeCategory === '全部'
        ? allPhotos
        : allPhotos.filter(photo => photo.category === activeCategory);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const goToPrevious = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
        }
    };

    const goToNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % filteredPhotos.length);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container-custom">
                {/* Header */}
                <ScrollAnimation animation="fadeUp">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">照片画廊</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            记录旅途中的每一个精彩瞬间，与朋友分享世界的美好
                        </p>
                    </div>
                </ScrollAnimation>

                {/* Filters */}
                <ScrollAnimation animation="fadeUp" delay={0.1}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                            ? 'bg-[var(--primary)] text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Layout Toggle */}
                        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setLayout('grid')}
                                className={`p-2 rounded-md transition-colors ${layout === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                                    }`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setLayout('masonry')}
                                className={`p-2 rounded-md transition-colors ${layout === 'masonry' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                                    }`}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Photo Grid */}
                <div className={`${layout === 'grid'
                        ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                        : 'columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'
                    }`}>
                    {filteredPhotos.map((photo, index) => (
                        <ScrollAnimation key={photo.id} animation="scale" delay={index * 0.05}>
                            <motion.div
                                className={`relative overflow-hidden rounded-xl cursor-pointer group ${layout === 'grid' ? 'aspect-square' : 'break-inside-avoid mb-4'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => openLightbox(index)}
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={400}
                                    height={layout === 'grid' ? 400 : (index % 3 === 0 ? 500 : 300)}
                                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-white font-medium">{photo.alt}</p>
                                        <p className="text-white/70 text-sm">{photo.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollAnimation>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPhotos.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500">该分类暂无照片</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                            onClick={closeLightbox}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation */}
                        <button
                            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={selectedIndex}
                            className="relative max-w-5xl max-h-[80vh] w-full h-full m-6"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={filteredPhotos[selectedIndex].src}
                                alt={filteredPhotos[selectedIndex].alt}
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Photo Info */}
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-xl font-bold">{filteredPhotos[selectedIndex].alt}</h3>
                            <p className="text-white/70">{filteredPhotos[selectedIndex].location} · {filteredPhotos[selectedIndex].date}</p>
                        </div>

                        {/* Actions */}
                        <div className="absolute bottom-6 right-6 flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Counter */}
                        <div className="absolute top-6 left-6 text-white/70 text-sm">
                            {selectedIndex + 1} / {filteredPhotos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
