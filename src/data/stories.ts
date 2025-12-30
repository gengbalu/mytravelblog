// 旅行故事数据配置文件
// 编辑此文件即可管理首页显示的故事列表

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

// 故事列表 - 在这里添加或删除故事
export const stories: Story[] = [
    {
        id: '1',
        title: '在京都的七天：穿越千年的古都之旅',
        excerpt: '漫步在岚山竹林，感受千年古刹的宁静，品尝地道的抹茶甜品，这是一段难忘的日本之旅...',
        coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
        author: { name: '小明', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
        location: '日本 · 京都',
        date: '2024-12-15',
        likes: 24,
        comments: 8,
        tags: ['日本', '文化'],
    },
    {
        id: '2',
        title: '瑞士阿尔卑斯：雪山与湖泊的交响曲',
        excerpt: '乘坐少女峰登山火车，穿越云海之上，眺望欧洲之巅的壮丽景色...',
        coverImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
        author: { name: '小红', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
        location: '瑞士 · 少女峰',
        date: '2024-11-20',
        likes: 42,
        comments: 15,
        tags: ['瑞士', '雪山'],
    },
    {
        id: '3',
        title: '东南亚美食探索：从曼谷到新加坡',
        excerpt: '从曼谷街头小吃到新加坡米其林，一场跨越三个国家的美食冒险...',
        coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
        author: { name: '大华', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80' },
        location: '泰国 · 曼谷',
        date: '2024-10-08',
        likes: 38,
        comments: 12,
        tags: ['美食', '东南亚'],
    },
];

// 获取所有故事
export function getAllStories(): Story[] {
    return stories;
}

// 根据ID获取故事
export function getStoryById(id: string): Story | undefined {
    return stories.find(story => story.id === id);
}
