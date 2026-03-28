import type { ProfileAvatar } from './enka';
export interface RankConfig {
    status: number;
    number: number;
}
export declare function getRankConfig(guildId: string): Promise<RankConfig>;
export declare function setRankConfig(guildId: string, cfg: Partial<RankConfig>): Promise<void>;
export interface RankValue {
    mark: number;
    crit: number;
}
export declare function calcRankValues(avatar: ProfileAvatar): RankValue;
export interface RankEntry {
    uid: string;
    score: number;
    rank: number;
}
export declare function submitRank(guildId: string, uid: string, avatar: ProfileAvatar): Promise<void>;
export declare function submitAllRanks(guildId: string, uid: string, avatars: ProfileAvatar[]): Promise<void>;
export declare function getRankList(guildId: string, type: string, charId: number, limit: number): Promise<RankEntry[]>;
export declare function getGroupTop(guildId: string, type: string, charId: number): Promise<RankEntry | null>;
export declare function getUserRank(guildId: string, type: string, charId: number, uid: string): Promise<RankEntry | null>;
export declare function resetRank(guildId: string, charId: number | null): Promise<number>;
