export interface CalendarActivity {
    id: number;
    title: string;
    type: 'character' | 'weapon' | 'activity' | 'abyss' | 'pass' | 'other';
    banner: string;
    icon: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    remaining: string;
}
export interface CalendarData {
    game: string;
    gameName: string;
    activities: CalendarActivity[];
    now: string;
}
export declare function fetchCalendar(game: string): Promise<CalendarData | null>;
