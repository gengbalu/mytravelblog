// 旅伴数据配置文件
// 编辑此文件即可管理首页显示的旅伴列表
// 添加或删除成员后，页面会自动更新

export interface Member {
    id: string;
    name: string;
    avatar: string;  // 头像URL，可以使用在线图片或本地图片路径
    role: string;    // 角色描述
    storiesCount: number;  // 发布的故事数量
}

// 旅伴列表 - 在这里添加或删除成员
export const members: Member[] = [
    {
        id: '1',
        name: '小明',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
        role: '摄影师',
        storiesCount: 5,
    },
    {
        id: '2',
        name: '小红',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        role: '美食家',
        storiesCount: 8,
    },
    {
        id: '3',
        name: '大华',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80',
        role: '探险家',
        storiesCount: 3,
    },
    {
        id: '4',
        name: '小美',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        role: '文字记录',
        storiesCount: 6,
    },
    {
        id: '5',
        name: '阿杰',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        role: '行程规划',
        storiesCount: 4,
    },
];

// 获取所有旅伴
export function getAllMembers(): Member[] {
    return members;
}

// 根据ID获取旅伴
export function getMemberById(id: string): Member | undefined {
    return members.find(member => member.id === id);
}

// 获取旅伴总数
export function getMembersCount(): number {
    return members.length;
}
