import React from 'react';
export interface HardChallengeAvatar {
    avatar_id: number;
    name: string;
    level: number;
    rarity: number;
    rank: number;
}
export interface HardChallengeBestAvatar {
    avatar_id: number;
    dps: number;
}
export interface HardChallengeMonster {
    level: number;
    icon: string;
    desc: string[];
}
export interface HardChallengeEntry {
    name: string;
    monster: HardChallengeMonster;
    second: number;
    avatars: HardChallengeAvatar[];
    best_avatars: HardChallengeBestAvatar[];
}
export interface HardChallengeBest {
    difficulty: number;
    second: number;
    has_data: boolean;
}
export interface HardChallengeSchedule {
    start_time: string;
    end_time: string;
}
export interface HardChallengeData {
    uid: string;
    has_data: boolean;
    best: HardChallengeBest;
    challs: HardChallengeEntry[];
    schedule: HardChallengeSchedule;
}
export default function HardChallengeCard({ data }: {
    data: HardChallengeData;
}): React.JSX.Element;
