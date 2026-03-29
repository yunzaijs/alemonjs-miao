export interface SrBaseAttr {
    name: string;
    key: string;
    num: number | string;
}
export interface SrSkillData {
    id: string;
    name: string;
    type_text: string;
    simple_desc: string;
    max_level: number;
    icon: string;
}
export interface SrEidolon {
    id: string;
    name: string;
    effect: string;
    icon: string;
}
export interface SrMaterial {
    id: string;
    name: string;
    num: number;
    rarity: number;
    icon: string;
}
export interface SrCharacterData {
    id: string;
    name: string;
    rarity: number;
    element: string;
    path: string;
    desc: string;
    sp: number;
    cncv: string;
    jpcv: string;
    portrait: string;
    baseAttr: SrBaseAttr[];
    skills: SrSkillData[];
    eidolons: SrEidolon[];
    materials: SrMaterial[];
}
export declare function loadSrCharacter(name: string): SrCharacterData | null;
export declare function srElementIcon(element: string): string;
export declare function srPathIcon(pathName: string): string;
export declare function srStarIcon(): string;
