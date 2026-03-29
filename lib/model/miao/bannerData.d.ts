export declare function getCharBannerRecords(name: string): {
    version: string;
    phase: number;
    daysSince: number;
}[];
export declare function getAllBannerStats(): {
    name: string;
    upCount: number;
    lastVersion: string;
    daysSince: number;
}[];
export declare function hasCharInPool(name: string): boolean;
