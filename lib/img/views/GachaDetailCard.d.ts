import type { GachaAnalysis } from '@src/model/miao/gachaLog.js';
import React from 'react';
export interface GachaDetailCardData {
    uid: string;
    game: string;
    analysis: GachaAnalysis;
}
export default function GachaDetailCard({ data }: {
    data: GachaDetailCardData;
}): React.JSX.Element;
