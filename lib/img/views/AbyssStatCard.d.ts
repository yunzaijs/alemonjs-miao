import React from 'react';
export interface AbyssStatItem {
    name: string;
    element: string;
    rarity: number;
    faceImg?: string;
    holdRate: number;
    avgCons: number;
    cons: number[];
}
export interface AbyssStatCardData {
    title: string;
    version: string;
    update: string;
    list: AbyssStatItem[];
}
export default function AbyssStatCard({ data }: {
    data: AbyssStatCardData;
}): React.JSX.Element;
