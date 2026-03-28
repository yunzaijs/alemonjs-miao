import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
export interface TrainingStatData {
    game: string;
    uid: string;
    nickname: string;
    avatars: ProfileAvatar[];
}
interface Props {
    data: TrainingStatData;
}
export default function TrainingStatCard({ data }: Props): React.JSX.Element;
export {};
