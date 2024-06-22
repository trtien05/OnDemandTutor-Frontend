export interface Schedule {
    id?: number;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    isSelected?: boolean;
}

export interface ScheduleEvent {
    Subject: string;
    Description: string;
    Id: number;
    StartTime: Date;
    EndTime: Date;
}

export interface Timeslot {
    id: number;
    startTime: string;
    endTime: string;
    occupied: boolean;
}

export interface ScheduleDay {
    dayOfWeek: string;
    dayOfMonth: number;
    timeslots: Timeslot[];
}