import type { RankEntry } from '@src/model/miao/profileRank.js';
import React from 'react';
export interface RankListData {
    game: string;
    charName: string;
    charElement?: string;
    type: string;
    entries: RankEntry[];
}
interface Props {
    data: RankListData;
}
export default function RankListCard({ data }: Props): React.JSX.Element;
export {};
