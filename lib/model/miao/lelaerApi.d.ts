export interface AbyssRankItem {
    name: string;
    use_rate: number;
    own_rate?: number;
    rank_class: string;
}
export interface AbyssRankResult {
    title: string;
    version: string;
    update: string;
    data: AbyssRankItem[];
}
export interface ConsStatItem {
    name: string;
    hold_rate: number;
    cons: number[];
    avg_cons: number;
}
export interface ConsStatResult {
    title: string;
    version: string;
    update: string;
    data: ConsStatItem[];
}
export declare function getAbyssRank(mode?: 'abyss' | 'hard'): Promise<AbyssRankResult | null>;
export declare function getConsStat(): Promise<ConsStatResult | null>;
