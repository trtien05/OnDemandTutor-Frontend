
export type Education = {
    id:number;
    majorName: string;
    specialization: string;
    degreeType: 'BACHELOR' | 'MASTER' | 'DOCTORAL' | 'ASSOCIATE';
    startYear: number;
    endYear: number;
    diplomaUrl: string;
    universityName: string;
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
