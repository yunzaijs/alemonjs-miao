import type { ProfileData } from '@src/model/miao/enka.js';
import React from 'react';
interface Props {
    data: ProfileData & {
        game: string;
        servName?: string;
    };
}
export default function ProfileListCard({ data }: Props): React.JSX.Element;
export {};
