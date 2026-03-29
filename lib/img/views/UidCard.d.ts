import React from 'react';
export interface UidStats {
    activeDay?: number;
    achievement?: number;
    wayPoint?: number;
    avatar?: number;
    avatar5?: number;
    goldCount?: number;
    commonChest?: number;
    exquisiteChest?: number;
    preciousChest?: number;
    luxuriousChest?: number;
    magicChest?: number;
}
export interface UidExploration {
    name: string;
    pct: number;
}
export interface UidAvatar {
    id: number;
    name: string;
    element: string;
    level: number;
    rarity: number;
    cons: number;
    fetter: number;
    icon: string;
}
export interface UidCardData {
    uid: string;
    game: string;
    nickname: string;
    level: number;
    isSelfCk: boolean;
    stats: UidStats;
    exploration: UidExploration[];
    avatars: UidAvatar[];
}
export default function UidCard({ data }: {
    data: UidCardData;
}): React.JSX.Element;
