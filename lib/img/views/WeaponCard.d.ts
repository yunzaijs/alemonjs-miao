import React from 'react';
interface WeaponInfo {
    id: number;
    name: string;
    type: number;
    rarity: number;
    level: number;
    promote_level: number;
    affix_level: number;
    icon: string;
}
interface AvatarWithWeapon {
    id: number;
    name: string;
    rarity: number;
    icon: string;
    weapon: WeaponInfo;
}
export interface WeaponCardData {
    uid: string;
    avatars: AvatarWithWeapon[];
    filterText: string;
}
export default function WeaponCard({ data }: {
    data: WeaponCardData;
}): React.JSX.Element;
export {};
