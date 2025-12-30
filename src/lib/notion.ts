// Notion API 集成 - 使用原生 fetch 以兼容 Edge Runtime
// 此实现不依赖 @notionhq/client，适用于 Cloudflare Workers/Pages

const NOTION_API_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

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

// Notion API 请求辅助函数
async function notionFetch(endpoint: string, body?: object) {
    const apiKey = process.env.NOTION_API_KEY;
    if (!apiKey) {
        throw new Error('NOTION_API_KEY not configured');
    }

    const response = await fetch(`${NOTION_API_URL}${endpoint}`, {
        method: body ? 'POST' : 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Notion-Version': NOTION_VERSION,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Notion API error: ${response.status}`);
    }

    return response.json();
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
        const response = await notionFetch(`/databases/${databaseId}/query`, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.results.map((page: any) => ({
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
        const response = await notionFetch(`/databases/${databaseId}/query`, {
            filter: {
                property: 'Published',
                checkbox: { equals: true },
            },
            sorts: [{ property: 'Date', direction: 'descending' }],
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.results.map((page: any) => ({
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
        const response = await notionFetch(`/databases/${databaseId}/query`, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.results.map((page: any) => ({
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
