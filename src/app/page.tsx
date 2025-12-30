import Hero from '@/components/Hero';
import StoryCard from '@/components/StoryCard';
import PhotoGallery from '@/components/PhotoGallery';
import TripTimeline from '@/components/TripTimeline';
import FriendsGrid from '@/components/FriendsGrid';
import ScrollAnimation from '@/components/ScrollAnimation';
import { ArrowRight, Sparkles, PenLine } from 'lucide-react';
import Link from 'next/link';

// 从数据服务层获取数据 - 自动选择 Notion 或本地数据
import { fetchMembers, fetchStories, fetchPhotos, fetchTrip } from '@/lib/data-service';

export default async function Home() {
  // 并行获取所有数据
  const [members, stories, photos, currentTrip] = await Promise.all([
    fetchMembers(),
    fetchStories(),
    fetchPhotos(),
    fetchTrip(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Latest Stories */}
      <ScrollAnimation animation="fadeUp">
        <section className="py-20">
          <div className="container-custom">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 text-[var(--primary)] mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">精选故事</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">最新旅行故事</h2>
              </div>
              <Link
                href="/stories"
                className="hidden md:flex items-center gap-2 text-[var(--primary)] font-medium hover:gap-3 transition-all"
              >
                查看全部 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <ScrollAnimation key={story.id} animation="fadeUp" delay={index * 0.1}>
                  <StoryCard story={story} />
                </ScrollAnimation>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 text-center md:hidden">
              <Link href="/stories" className="btn-primary inline-flex items-center gap-2">
                查看更多故事 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Photo Gallery */}
      <ScrollAnimation animation="fadeUp" delay={0.1}>
        <PhotoGallery photos={photos} title="精彩瞬间" />
      </ScrollAnimation>

      {/* Trip Timeline */}
      <ScrollAnimation animation="slideLeft" delay={0.1}>
        <TripTimeline days={currentTrip.days} tripTitle={currentTrip.title} />
      </ScrollAnimation>

      {/* Friends */}
      <ScrollAnimation animation="fadeUp" delay={0.1}>
        <FriendsGrid members={members} />
      </ScrollAnimation>

      {/* CTA Section */}
      <ScrollAnimation animation="scale" delay={0.1}>
        <section className="py-20 gradient-primary cta-section">
          <div className="container-custom text-center text-white relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 cta-title">
              准备好分享你的故事了吗？
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto cta-subtitle">
              加入我们，与朋友一起记录每一次难忘的旅程
            </p>
            <button className="cta-button">
              <PenLine className="w-5 h-5 cta-icon" />
              发布你的第一篇故事
            </button>
          </div>
        </section>
      </ScrollAnimation>
    </>
  );
}

