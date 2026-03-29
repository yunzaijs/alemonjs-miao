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
    left: number;
    width: number;
    label: string;
    sort: number;
}
export interface DateEntry {
    month: number;
    dates: Array<{
        day: number;
        weekday: string;
    }>;
}
export interface CalendarData {
    game: string;
    gameName: string;
    rows: CalendarActivity[][];
    abyssRows: CalendarActivity[];
    dateList: DateEntry[];
    nowDate: number;
    nowLeft: number;
    nowTime: string;
    now: string;
}
export declare function fetchCalendar(game: string): Promise<CalendarData | null>;
