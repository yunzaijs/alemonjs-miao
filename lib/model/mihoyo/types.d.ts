export type MihoyoGame = 'gs' | 'sr' | 'zzz';
export type MihoyoRegionType = 'cn' | 'os';
export interface MihoyoRegionProfile {
    region: string;
    regionType: MihoyoRegionType;
    game: MihoyoGame;
}
