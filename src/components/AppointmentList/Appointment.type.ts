
import { AppointmentStatus } from "../../utils/enums";


// export interface Appointment {
//     id: number;
//     createdAt: Date | string | null;
//     description: string | null;
//     subjectName: string;
//     status: AppointmentStatus;
//     tutor: Tutor;
//     student: Student;
//     studentId: number;
//     tuition: number;
//     timeslots: TimeSlot[];
//     loading: boolean;
// }

export interface Appointment {
    id: number;
    subjectName: string;
    appointmentStatus: AppointmentStatus;
    tutor: Tutor;
    student: Student;
    tuition: number;
    loading: boolean;
}
export interface Tutor {
    tutorId: number;
    avatarUrl?: string | null;
    fullName: string;
    meetingLink: string;
    
}
export interface Student {
    studentId: number;
    avatarUrl?: string | null;
    fullName: string;
}


export interface TimeSlot{
    timeslotId: number;
    startTime: Date|string;
    endTime: Date|string;
    scheduleDate: string;
    dayOfWeek: number;
    appointment: Appointment;
    loading: boolean;
}