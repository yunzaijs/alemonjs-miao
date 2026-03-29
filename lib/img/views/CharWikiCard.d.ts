import React from 'react';
export interface CharWikiData {
    name: string;
    abbr: string;
    element: string;
    rarity: number;
    weaponType: string;
    faceImg?: string;
    mode: 'wiki' | 'talent' | 'cons';
}
export default function CharWikiCard({ data }: {
    data: CharWikiData;
}): React.JSX.Element;
