// 数据服务层 - 自动选择 Notion 或本地数据源
// 如果 Notion 配置了相应的数据库，则使用 Notion 数据
// 否则降级使用本地配置文件数据

import {
    getMembers as getNotionMembers,
    getStories as getNotionStories,
    getPhotos as getNotionPhotos,
    isNotionConfigured
} from '@/lib/notion';

import {
    members as localMembers,
    stories as localStories,
    photos as localPhotos,
    currentTrip as localTrip,
    type Member,
    type Story,
    type Photo,
    type Trip
} from '@/data';

// 获取旅伴数据
export async function fetchMembers(): Promise<Member[]> {
    if (isNotionConfigured() && process.env.NOTION_MEMBERS_DB) {
        const notionMembers = await getNotionMembers();
        if (notionMembers.length > 0) {
            return notionMembers;
        }
    }
    return localMembers;
}

// 获取故事数据
export async function fetchStories(): Promise<Story[]> {
    if (isNotionConfigured() && process.env.NOTION_STORIES_DB) {
        const notionStories = await getNotionStories();
        if (notionStories.length > 0) {
            return notionStories;
        }
    }
    return localStories;
}

// 获取照片数据
export async function fetchPhotos(): Promise<Photo[]> {
    if (isNotionConfigured() && process.env.NOTION_PHOTOS_DB) {
        const notionPhotos = await getNotionPhotos();
        if (notionPhotos.length > 0) {
            return notionPhotos;
        }
    }
    return localPhotos;
}

// 获取行程数据（目前仅支持本地配置）
export async function fetchTrip(): Promise<Trip> {
    // 行程数据较复杂，暂时只使用本地数据
    // 后续可扩展支持 Notion
    return localTrip;
}

// 导出类型
export type { Member, Story, Photo, Trip };
