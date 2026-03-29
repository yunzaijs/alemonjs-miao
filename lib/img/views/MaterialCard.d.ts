import React from 'react';
export interface MaterialCardData {
    game: string;
    weekday: number;
    dayLabel: string;
}
export default function MaterialCard({ data }: {
    data: MaterialCardData;
}): React.JSX.Element;
