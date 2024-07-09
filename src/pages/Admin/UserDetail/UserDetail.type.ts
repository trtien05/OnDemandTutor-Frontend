
import { AccountStatus, Gender, Degree } from '../../../utils/enums';

export interface Education {
    majorName: string;
    specialization: string;
    degreeType: Degree;
}

export interface Tutor {
    id: number;
    dateOfBirth: string;
    gender: Gender;
    address: string | null;
    avatarUrl?: string | null;
    email: string;
    fullName: string;
    phoneNumber: string;
    averageRating: number;
    teachingPricePerHour: number;
    backgroundDescription: string | null;
    meetingLink: string | null;
    videoIntroductionLink: string | null;
    subjects: string[];
    educations: Education[];
    status: typeof AccountStatus;
    createdAt?: string;
    description?: string | null;
}

export interface Student  {
    id: number;
    address: string | null;
    avatarUrl: string;
    createdAt: string;
    dateOfBirth: string;
    description: string | null;
    email: string;
    fullName: string;
    gender: Gender;
    phoneNumber: string;
    status: typeof AccountStatus;
}


export interface Subjects{
    id: number;
    subjectName: string;

}
export interface LearnStatistic {
    accountId: number;
    totalLessons: number;
    totalLearntTutor: number;
    totalTaughtStudent: number;
    totalSubjects: Subjects[];
    thisMonthLessons: number;
    thisMonthTutor: number;
    thisMonthStudent: number;
    thisMonthSubjects: Subjects[];
}