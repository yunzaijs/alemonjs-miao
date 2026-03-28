import type { ArtifactData, ProfileAvatar } from './enka';
export type ArtisGrade = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS' | 'ACE' | 'MAX';
export interface ArtisGradeInfo {
    grade: ArtisGrade;
    color: string;
}
export declare function getGrade(mark: number): ArtisGradeInfo;
export interface CharWeights {
    暴击率: number;
    暴击伤害: number;
    攻击力: number;
    生命值: number;
    防御力: number;
    元素精通: number;
    元素充能效率: number;
}
export interface ArtifactScore {
    mark: number;
    grade: ArtisGradeInfo;
    subScores: {
        name: string;
        score: number;
    }[];
}
export declare function scoreArtifact(art: ArtifactData, charName: string): ArtifactScore;
export interface CharacterArtisScore {
    totalMark: number;
    avgMark: number;
    grade: ArtisGradeInfo;
    artifacts: (ArtifactScore & {
        pos: number;
        name: string;
    })[];
}
export declare function scoreCharacterArtifacts(avatar: ProfileAvatar): CharacterArtisScore;
