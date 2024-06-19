export interface Details {
    teachingPricePerHour: number;
    backgroundDescription: string;
    meetingLink: string;
    videoIntroductionLink: string;
    subjects?: string[];
}

export interface Education {
    id: number;
    majorName: string;
    specialization: string;
    universityName: string;
    degreeType: string;
    startYear: number;
    endYear: number;
    verified: boolean;
}