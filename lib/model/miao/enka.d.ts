export interface ArtifactSubstat {
    key: string;
    name: string;
    value: string;
}
export interface ArtifactData {
    pos: number;
    name: string;
    setName: string;
    icon: string;
    rarity: number;
    level: number;
    mainKey: string;
    mainName: string;
    mainValue: string;
    subStats: ArtifactSubstat[];
}
export interface TalentData {
    a: number;
    e: number;
    q: number;
}
export interface StatEntry {
    name: string;
    key: string;
    value: string;
    base?: string;
    plus?: string;
}
export interface ProfileAvatar {
    id: number;
    name: string;
    abbr: string;
    element: string;
    rarity: number;
    level: number;
    cons: number;
    fetter: number;
    icon: string;
    sideIcon: string;
    weapon?: {
        name: string;
        icon: string;
        level: number;
        rarity: number;
        affix: number;
    };
    talent?: TalentData;
    stats?: StatEntry[];
    artifacts?: ArtifactData[];
}
export interface ProfileData {
    uid: string;
    nickname: string;
    level: number;
    signature: string;
    avatars: ProfileAvatar[];
    updateTime: string;
}
export declare function fetchEnkaGS(uid: string): Promise<ProfileData | null>;
export declare function fetchMihomoSR(uid: string): Promise<ProfileData | null>;
export declare function fetchProfile(uid: string, game: string): Promise<ProfileData | null>;
