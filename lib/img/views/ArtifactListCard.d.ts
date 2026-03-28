import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
export interface ArtifactListData {
    game: string;
    uid: string;
    avatars: ProfileAvatar[];
}
interface Props {
    data: ArtifactListData;
}
export default function ArtifactListCard({ data }: Props): React.JSX.Element;
export {};
