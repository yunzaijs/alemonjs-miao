import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
export interface GroupTopData {
    game: string;
    uid: string;
    avatar: ProfileAvatar;
    rank: number;
    type: string;
}
interface Props {
    data: GroupTopData;
}
export default function GroupTopCard({ data }: Props): React.JSX.Element;
export {};
