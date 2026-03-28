import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
export interface ProfileDetailData {
    game: string;
    uid: string;
    avatar: ProfileAvatar;
}
interface Props {
    data: ProfileDetailData;
}
export default function ProfileDetailCard({ data }: Props): React.JSX.Element;
export {};
