// 行程计划数据配置文件
// 编辑此文件即可管理首页显示的行程

export interface Activity {
    time: string;
    title: string;
    description: string;
    type: 'transport' | 'hotel' | 'food' | 'activity' | 'photo';
}

export interface TripDay {
    day: number;
    date: string;
    title: string;
    location: string;
    activities: Activity[];
}

export interface Trip {
    title: string;
    days: TripDay[];
}

// 当前展示的行程
export const currentTrip: Trip = {
    title: '即将到来：日本冬季之旅',
    days: [
        {
            day: 1,
            date: '12月20日',
            title: '抵达东京',
            location: '东京',
            activities: [
                { time: '14:00', title: '抵达成田机场', description: '乘坐 NEX 快线前往市区', type: 'transport' },
                { time: '17:00', title: '入住酒店', description: '新宿华盛顿酒店，放下行李稍作休息', type: 'hotel' },
                { time: '19:00', title: '新宿歌舞伎町晚餐', description: '品尝正宗日式拉面', type: 'food' },
            ],
        },
        {
            day: 2,
            date: '12月21日',
            title: '东京市区探索',
            location: '东京',
            activities: [
                { time: '09:00', title: '浅草寺', description: '参观东京最古老的寺庙，体验日本传统文化', type: 'activity' },
                { time: '12:00', title: '仲见世商业街', description: '品尝各种日本小吃和甜品', type: 'food' },
                { time: '15:00', title: '东京晴空塔', description: '登上 350 米观景台，俯瞰东京全景', type: 'photo' },
            ],
        },
    ],
};

// 获取当前行程
export function getCurrentTrip(): Trip {
    return currentTrip;
}

// 获取行程天数
export function getTripDays(): TripDay[] {
    return currentTrip.days;
}
