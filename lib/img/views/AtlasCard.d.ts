import type { SrCharacterData } from '@src/model/miao/srData.js';
import React from 'react';
export interface AtlasCardData {
    name: string;
    game: 'gs' | 'sr';
    gameLabel: string;
    element?: string;
    rarity?: number;
    weaponType?: string;
    faceImg?: string;
    srData?: SrCharacterData;
    elementIcon?: string;
    pathIcon?: string;
    starIcon?: string;
}
export default function AtlasCard({ data }: {
    data: AtlasCardData;
}): React.JSX.Element;
