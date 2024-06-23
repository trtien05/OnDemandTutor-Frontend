export interface Details {
    teachingPricePerHour: number;
    backgroundDescription: string;
    meetingLink: string;
    videoIntroductionLink: string;
    subjects: string[];
}

export interface Education {
    id: number;
    majorName: string;
    specialization: string;
    universityName: string;
    degreeType: string;
    academicYear: string;
    verified: string;
}

export interface Certificate {
    id: number;
    certificateName: string;
    subject: string;
    description: string;
    issuedBy: string;
    issuedYear: number;
    verified: string;
}