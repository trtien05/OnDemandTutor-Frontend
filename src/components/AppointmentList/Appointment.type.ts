import { AppointmentStatus } from "../../utils/enums";

export interface Appointment {
    id: number;
    createdAt: Date | string | null;
    description: string | null;
    status: AppointmentStatus;
    tutorId: number;
    studentId: number;
    timeslotIds: number[];
    loading: boolean;
}