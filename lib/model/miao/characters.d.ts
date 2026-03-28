export interface CharacterMeta {
    name: string;
    abbr: string;
    element: string;
    rarity: number;
    weaponType: string;
}
export declare const GS_CHARACTERS: Record<number, CharacterMeta>;
export declare const FIGHT_PROP_MAP: Record<string, {
    name: string;
    key: string;
    isPercent?: boolean;
}>;
export declare function getCharacterMeta(id: number): CharacterMeta;
export declare function matchCharacterByName(name: string, candidates: {
    id: number;
    name: string;
}[]): {
    id: number;
    name: string;
} | null;
