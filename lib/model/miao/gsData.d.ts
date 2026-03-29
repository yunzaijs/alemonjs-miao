export interface GsTalent {
    key: string;
    name: string;
    desc: string[];
    tableNames: string[];
}
export interface GsPassive {
    name: string;
    desc: string[];
}
export interface GsConstellation {
    index: number;
    name: string;
    desc: string[];
}
export interface GsMaterials {
    gem: string;
    boss: string;
    specialty: string;
    normal: string;
    talent: string;
    weekly: string;
}
export interface GsBaseAttr {
    hp: number;
    atk: number;
    def: number;
}
export interface GsGrowAttr {
    key: string;
    value: number;
}
export interface GsCharacterData {
    id: number;
    name: string;
    title: string;
    star: number;
    elem: string;
    weapon: string;
    desc: string;
    birthday: string;
    astro: string;
    allegiance: string;
    cncv: string;
    jpcv: string;
    baseAttr: GsBaseAttr;
    growAttr: GsGrowAttr;
    materials: GsMaterials;
    talents: GsTalent[];
    passives: GsPassive[];
    constellations: GsConstellation[];
}
export declare function loadGsCharacter(name: string): GsCharacterData | null;
export declare function growAttrName(key: string): string;
