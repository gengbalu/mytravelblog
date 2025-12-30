import { Client } from '@notionhq/client';

// 初始化 Notion 客户端
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

// 类型定义
export interface NotionMember {
    id: string;
    name: string;
    avatar: string;
    role: string;
    storiesCount: number;
}

export interface NotionStory {
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
    content?: string;
}

export interface NotionPhoto {
    id: string;
    src: string;
    alt: string;
    location: string;
}

// 辅助函数：安全获取属性值
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPropertyValue(page: any, propertyName: string): unknown {
    const property = page.properties?.[propertyName];
    if (!property) return null;

    switch (property.type) {
        case 'title':
            return property.title[0]?.plain_text || '';
        case 'rich_text':
            return property.rich_text[0]?.plain_text || '';
        case 'number':
            return property.number || 0;
        case 'url':
            return property.url || '';
        case 'date':
            return property.date?.start || '';
        case 'select':
            return property.select?.name || '';
        case 'multi_select':
            return property.multi_select.map((s: { name: string }) => s.name);
        case 'files':
            if (property.files[0]) {
                const file = property.files[0];
                if (file.type === 'external') {
                    return file.external.url;
                } else if (file.type === 'file') {
                    return file.file.url;
                }
            }
            return '';
        default:
            return null;
    }
}

// 获取旅伴列表
export async function getMembers(): Promise<NotionMember[]> {
    const databaseId = process.env.NOTION_MEMBERS_DB;
    if (!databaseId) {
        console.warn('NOTION_MEMBERS_DB not configured, using local data');
        return [];
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [{ property: 'Order', direction: 'ascending' }],
        });

        return response.results.map((page) => ({
            id: page.id,
            name: getPropertyValue(page, 'Name') as string,
            avatar: getPropertyValue(page, 'Avatar') as string,
            role: getPropertyValue(page, 'Role') as string,
            storiesCount: getPropertyValue(page, 'StoriesCount') as number,
        }));
    } catch (error) {
        console.error('Error fetching members from Notion:', error);
        return [];
    }
}

// 获取故事列表
export async function getStories(): Promise<NotionStory[]> {
    const databaseId = process.env.NOTION_STORIES_DB;
    if (!databaseId) {
        console.warn('NOTION_STORIES_DB not configured, using local data');
        return [];
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Published',
                checkbox: { equals: true },
            },
            sorts: [{ property: 'Date', direction: 'descending' }],
        });

        return response.results.map((page) => ({
            id: page.id,
            title: getPropertyValue(page, 'Title') as string,
            excerpt: getPropertyValue(page, 'Excerpt') as string,
            coverImage: getPropertyValue(page, 'Cover') as string,
            author: {
                name: getPropertyValue(page, 'AuthorName') as string,
                avatar: getPropertyValue(page, 'AuthorAvatar') as string,
            },
            location: getPropertyValue(page, 'Location') as string,
            date: getPropertyValue(page, 'Date') as string,
            likes: getPropertyValue(page, 'Likes') as number,
            comments: getPropertyValue(page, 'Comments') as number,
            tags: getPropertyValue(page, 'Tags') as string[],
        }));
    } catch (error) {
        console.error('Error fetching stories from Notion:', error);
        return [];
    }
}

// 获取照片列表
export async function getPhotos(): Promise<NotionPhoto[]> {
    const databaseId = process.env.NOTION_PHOTOS_DB;
    if (!databaseId) {
        console.warn('NOTION_PHOTOS_DB not configured, using local data');
        return [];
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [{ property: 'Order', direction: 'ascending' }],
        });

        return response.results.map((page) => ({
            id: page.id,
            src: getPropertyValue(page, 'Image') as string,
            alt: getPropertyValue(page, 'Alt') as string,
            location: getPropertyValue(page, 'Location') as string,
        }));
    } catch (error) {
        console.error('Error fetching photos from Notion:', error);
        return [];
    }
}

// 检查 Notion 是否配置
export function isNotionConfigured(): boolean {
    return !!(process.env.NOTION_API_KEY && (
        process.env.NOTION_MEMBERS_DB ||
        process.env.NOTION_STORIES_DB ||
        process.env.NOTION_PHOTOS_DB
    ));
}
