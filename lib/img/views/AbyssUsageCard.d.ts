import React from 'react';
export interface AbyssUsageItem {
    name: string;
    element: string;
    rarity: number;
    faceImg?: string;
    useRate: number;
    rankClass: string;
}
export interface AbyssUsageCardData {
    title: string;
    version: string;
    update: string;
    list: AbyssUsageItem[];
}
export default function AbyssUsageCard({ data }: {
    data: AbyssUsageCardData;
}): React.JSX.Element;
