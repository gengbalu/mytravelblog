'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Heart, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Photo {
    id: string;
    src: string;
    alt: string;
    location?: string;
    date?: string;
}

interface PhotoGalleryProps {
    photos: Photo[];
    title?: string;
}

export default function PhotoGallery({ photos, title = '精彩瞬间' }: PhotoGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const goToPrevious = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
        }
    };

    const goToNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % photos.length);
        }
    };

    return (
        <section className="py-16">
            <div className="container-custom">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                        <p className="text-gray-600">记录旅途中的每一个精彩瞬间</p>
                    </div>
                    <button className="btn-secondary hidden md:flex items-center gap-2">
                        查看全部
                    </button>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                        <span className="text-white text-2xl">+</span>
                                    </div>
                                </div>
                            </div>
                            {photo.location && (
                                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm font-medium drop-shadow-lg">
                                        📍 {photo.location}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
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
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            onClick={closeLightbox}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation */}
                        <button
                            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
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
                                src={photos[selectedIndex].src}
                                alt={photos[selectedIndex].alt}
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Actions */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
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
                        <div className="absolute bottom-6 right-6 text-white/70 text-sm">
                            {selectedIndex + 1} / {photos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
