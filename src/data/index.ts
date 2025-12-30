// 数据配置统一导出
// 所有页面数据都从这里导入

export { members, getAllMembers, getMemberById, getMembersCount } from './members';
export type { Member } from './members';

export { stories, getAllStories, getStoryById } from './stories';
export type { Story } from './stories';

export { photos, getAllPhotos } from './photos';
export type { Photo } from './photos';

export { currentTrip, getCurrentTrip, getTripDays } from './trips';
export type { Trip, TripDay, Activity } from './trips';
