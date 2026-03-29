import React from 'react';
export interface AvatarWeapon {
    id: number;
    name: string;
    type: number;
    rarity: number;
    level: number;
    affix_level: number;
    icon: string;
}
export interface AvatarInfo {
    id: number;
    name: string;
    element: string;
    fetter: number;
    level: number;
    rarity: number;
    actived_constellation_num: number;
    weapon: AvatarWeapon;
    icon: string;
    image: string;
    side_icon?: string;
}
export interface AvatarCardData {
    uid: string;
    game: string;
    title: string;
    relation?: string;
    avatar?: AvatarInfo;
    avatars?: AvatarInfo[];
}
export default function AvatarCard({ data }: {
    data: AvatarCardData;
}): React.JSX.Element;
