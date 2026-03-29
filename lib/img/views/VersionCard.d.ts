import React from 'react';
export interface VersionCardData {
    name: string;
    version: string;
    author: string;
    description: string;
}
export default function VersionCard({ data }: {
    data: VersionCardData;
}): React.JSX.Element;
