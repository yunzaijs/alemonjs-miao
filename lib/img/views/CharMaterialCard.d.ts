import React from 'react';
export interface CharMaterialData {
    name: string;
    abbr: string;
    element: string;
    rarity: number;
    weaponType: string;
    faceImg?: string;
}
export default function CharMaterialCard({ data }: {
    data: CharMaterialData;
}): React.JSX.Element;
