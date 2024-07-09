export interface Education {
    degreeType?: string;
    majorName?: string;
    specialization?: string;
}

export interface Tutor {
    id?: number;
    fullName?: string;
    averageRating?: number;
    avatarUrl?: string;
    teachingPricePerHour?: number;
    educations: Education[];
    subjects: string[];
    backgroundDescription?: string;
    videoIntroductionLink?: string;
    loading: boolean;
}
