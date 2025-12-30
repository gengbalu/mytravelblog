'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Camera, Utensils, Bed, Plane } from 'lucide-react';

export interface TripDay {
    day: number;
    date: string;
    title: string;
    location: string;
    activities: {
        time: string;
        title: string;
        description: string;
        type: 'activity' | 'food' | 'hotel' | 'transport' | 'photo';
    }[];
}

interface TripTimelineProps {
    days: TripDay[];
    tripTitle?: string;
}

const getActivityIcon = (type: string) => {
    switch (type) {
        case 'food': return <Utensils className="w-4 h-4" />;
        case 'hotel': return <Bed className="w-4 h-4" />;
        case 'transport': return <Plane className="w-4 h-4" />;
        case 'photo': return <Camera className="w-4 h-4" />;
        default: return <MapPin className="w-4 h-4" />;
    }
};

export default function TripTimeline({ days, tripTitle = '行程安排' }: TripTimelineProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{tripTitle}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        详细的旅行计划，记录每一天的精彩行程
                    </p>
                </div>

                {/* Horizontal Timeline */}
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-6 min-w-max px-4">
                        {days.map((day, dayIndex) => (
                            <motion.div
                                key={day.day}
                                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: dayIndex * 0.15 }}
                            >
                                {/* Day Header */}
                                <div className="gradient-primary p-4 text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                                            {day.day}
                                        </div>
                                        <h3 className="text-xl font-bold">{day.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/80">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {day.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {day.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Activities */}
                                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                                    {day.activities.map((activity, actIndex) => (
                                        <motion.div
                                            key={actIndex}
                                            className="relative pl-6 pb-3 last:pb-0 border-l-2 border-gray-200 last:border-transparent"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: actIndex * 0.05 }}
                                        >
                                            {/* Timeline Dot */}
                                            <div className={`absolute left-[-5px] top-1 w-2 h-2 rounded-full ${activity.type === 'food' ? 'bg-orange-500' :
                                                activity.type === 'hotel' ? 'bg-purple-500' :
                                                    activity.type === 'transport' ? 'bg-blue-500' :
                                                        activity.type === 'photo' ? 'bg-pink-500' :
                                                            'bg-[var(--primary)]'
                                                }`} />

                                            <div className="flex items-center gap-2 mb-1">
                                                <Clock className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">{activity.time}</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{activity.title}</h4>
                                            <p className="text-xs text-gray-600">{activity.description}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Connector Arrow (except last) */}
                                {dayIndex < days.length - 1 && (
                                    <div className="absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 text-[var(--primary)] hidden md:block">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}
