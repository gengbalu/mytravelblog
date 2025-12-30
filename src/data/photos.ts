// 照片画廊数据配置文件
// 编辑此文件即可管理首页显示的照片

export interface Photo {
    id: string;
    src: string;      // 图片URL
    alt: string;      // 图片描述
    location: string; // 拍摄地点
}

// 照片列表 - 在这里添加或删除照片
export const photos: Photo[] = [
    { id: '1', src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', alt: '京都竹林', location: '京都岚山' },
    { id: '2', src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', alt: '阿尔卑斯雪山', location: '少女峰' },
    { id: '3', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: '山间日出', location: '瑞士' },
    { id: '4', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', alt: '泰国美食', location: '曼谷' },
    { id: '5', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', alt: '湖泊风光', location: '卢塞恩' },
    { id: '6', src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', alt: '巴黎铁塔', location: '巴黎' },
    { id: '7', src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&q=80', alt: '威尼斯', location: '威尼斯' },
    { id: '8', src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', alt: '迪拜夜景', location: '迪拜' },
];

// 获取所有照片
export function getAllPhotos(): Photo[] {
    return photos;
}
