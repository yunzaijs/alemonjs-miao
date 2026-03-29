export interface GachaItem {
    id: string;
    name: string;
    itemType: string;
    rankType: number;
    gachaType: number;
    time: string;
}
export declare const GS_GACHA_TYPES: Record<number, string>;
export declare const SR_GACHA_TYPES: Record<number, string>;
export declare function extractAuthKey(text: string): string | null;
export declare function saveAuthKey(uid: string, authkey: string): Promise<void>;
export declare function getAuthKey(uid: string): Promise<string | null>;
export declare function fetchAllGachaLogs(authkey: string, gachaType: number, game: string): Promise<GachaItem[]>;
export declare function saveGachaLogs(uid: string, game: string, gachaType: number, items: GachaItem[]): Promise<void>;
export declare function loadGachaLogs(uid: string, game: string, gachaType: number): Promise<GachaItem[]>;
export interface GachaAnalysis {
    gachaType: number;
    gachaTypeName: string;
    totalCount: number;
    fiveStarCount: number;
    fourStarCount: number;
    threeStarCount: number;
    pityCount: number;
    fiveStarAvg: number;
    fiveStarList: {
        name: string;
        count: number;
        time: string;
        faceImg?: string;
        rarity: number;
    }[];
}
export declare function analyzeGacha(items: GachaItem[], gachaType: number, game: string): GachaAnalysis;
export declare function analyzeAllGacha(uid: string, game: string): Promise<{
    analyses: GachaAnalysis[];
    totalCount: number;
    totalFive: number;
    totalFour: number;
}>;
