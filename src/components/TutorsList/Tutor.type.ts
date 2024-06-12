export interface Education {
    degreeType?: string;
    majorName?: string;
    specialization?: string;
}

export interface Tutor {
    fullName?: string;
    averageRating?: number;
    teachingPricePerHour?: number;
    educations: Education[];
    backgroundDescription?: string;
    videoIntroductionLink?: string;
    loading: boolean;
}
