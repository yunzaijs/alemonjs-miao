/** 支持的游戏类型 */
export type MihoyoGame = 'gs' | 'sr' | 'zzz';

/** 区服类型 */
export type MihoyoRegionType = 'cn' | 'os';

/** 区服信息 */
export interface MihoyoRegionProfile {
  region: string;
  regionType: MihoyoRegionType;
  game: MihoyoGame;
}
