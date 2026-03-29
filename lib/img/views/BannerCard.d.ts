import React from 'react';
export interface BannerRecord {
    version: string;
    phase: number;
    name: string;
    element: string;
    rarity: number;
    faceImg?: string;
}
export interface BannerSingleData {
    mode: 'single';
    charName: string;
    element: string;
    rarity: number;
    faceImg?: string;
    records: {
        version: string;
        phase: number;
        daysSince: number;
    }[];
}
export interface BannerAllData {
    mode: 'all';
    list: {
        name: string;
        element: string;
        rarity: number;
        faceImg?: string;
        upCount: number;
        lastVersion: string;
        daysSince: number;
    }[];
}
export type BannerCardData = BannerSingleData | BannerAllData;
export default function BannerCard({ data }: {
    data: BannerCardData;
}): React.JSX.Element;
