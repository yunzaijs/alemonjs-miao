import React from 'react';
export interface WeaponWikiData {
    name: string;
    rarity: number;
    weaponType: string;
}
export default function WeaponWikiCard({ data }: {
    data: WeaponWikiData;
}): React.JSX.Element;
