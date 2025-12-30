import Image from 'next/image';
import Link from 'next/link';
import { Users } from 'lucide-react';

interface Member {
    id: string;
    name: string;
    avatar: string;
    role: string;
    storiesCount: number;
}

interface FriendsGridProps {
    members: Member[];
}

export default function FriendsGrid({ members }: FriendsGridProps) {
    return (
        <section className="py-16">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的旅伴</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        一起探索世界的好朋友们
                    </p>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {members.map((member) => (
                        <Link
                            key={member.id}
                            href={`/members/${member.id}`}
                            className="group text-center"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                <div className="absolute inset-0 rounded-full gradient-primary opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
                                    <Image
                                        src={member.avatar}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-[var(--primary)] transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">{member.role}</p>
                            <p className="text-xs text-[var(--primary)]">
                                {member.storiesCount} 篇故事
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
