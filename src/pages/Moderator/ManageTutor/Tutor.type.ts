import { Question } from './../../../components/QuestionList/Question.type';

export type Education = {
    id:number;
    majorName: string;
    specialization: string;
    degreeType: 'BACHELOR' | 'MASTER' | 'DOCTORAL' | 'ASSOCIATE';
    startYear: number;
    endYear: number;
    diplomaUrl: string;
    universityName: string;
    // verifyStatus: boolean;
}

export type Certificate = {
    id:number;
    certificateName: string;
    description: string;
    issuedBy: string;
    issuedYear: number;
    certificateUrl: string;
    subject: string;
    // verifyStatus: boolean;
}

export type Tutor = {
    id: number;
    dateOfBirth: string;
    gender: 'male' | 'female';
    address: string;
    avatarUrl: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    teachingPricePerHour: number;
    backgroundDescription: string | null;
    meetingLink: string;
    videoIntroductionLink: string | null;
    subjects: string[];
    educations: Education[];
}

export type Timeslot = {
    id: number;
    startTime: string;
    endTime: string;
}

export type Schedule = {
    dayOfWeek: string;
    dayOfMonth?: number;
    timeslots: Timeslot[];
}
