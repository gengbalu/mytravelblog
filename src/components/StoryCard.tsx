import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Heart, MessageCircle } from 'lucide-react';

export interface Story {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    author: {
        name: string;
        avatar: string;
    };
    location: string;
    date: string;
    likes: number;
    comments: number;
    tags: string[];
}

interface StoryCardProps {
    story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
    return (
        <Link href={`/stories/${story.id}`}>
            <article className="group bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100">
                {/* Cover Image */}
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={story.coverImage}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {story.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="tag bg-white/90 backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {story.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {story.date}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                        {story.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {story.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                    src={story.author.avatar}
                                    alt={story.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                {story.author.name}
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {story.likes}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {story.comments}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
