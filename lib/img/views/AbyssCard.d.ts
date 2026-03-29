import React from 'react';
interface AbyssAvatar {
    id: number;
    icon: string;
    rarity: number;
    level: number;
    value: number;
}
interface AbyssBattleAvatar {
    id: number;
    icon: string;
    rarity: number;
    level: number;
}
interface AbyssBattle {
    index: number;
    timestamp: string;
    avatars: AbyssBattleAvatar[];
}
interface AbyssLevel {
    index: number;
    star: number;
    max_star: number;
    battles: AbyssBattle[];
}
interface AbyssFloor {
    index: number;
    icon: string;
    is_unlock: boolean;
    settle_time: string;
    star: number;
    max_star: number;
    levels: AbyssLevel[];
}
export interface AbyssData {
    uid: string;
    game: string;
    schedule_id: number;
    start_time: string;
    end_time: string;
    total_battle_times: number;
    total_win_times: number;
    max_floor: string;
    total_star: number;
    is_unlock: boolean;
    reveal_rank: AbyssAvatar[];
    damage_rank: AbyssAvatar[];
    take_damage_rank: AbyssAvatar[];
    defeat_rank: AbyssAvatar[];
    energy_skill_rank: AbyssAvatar[];
    normal_skill_rank: AbyssAvatar[];
    floors: AbyssFloor[];
    period: string;
}
export default function AbyssCard({ data }: {
    data: AbyssData;
}): React.JSX.Element;
export {};
