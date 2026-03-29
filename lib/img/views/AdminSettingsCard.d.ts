import React from 'react';
export interface AdminSettingsData {
    type: string;
}
export default function AdminSettingsCard({ data }: {
    data: AdminSettingsData;
}): React.JSX.Element;
