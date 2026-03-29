import type { GachaAnalysis } from '@src/model/miao/gachaLog.js';
import React from 'react';
export interface GachaStatCardData {
    uid: string;
    game: string;
    analyses: GachaAnalysis[];
    totalCount: number;
    totalFive: number;
    totalFour: number;
}
export default function GachaStatCard({ data }: {
    data: GachaStatCardData;
}): React.JSX.Element;
