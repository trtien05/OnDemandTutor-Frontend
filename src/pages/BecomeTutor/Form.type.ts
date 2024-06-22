export type AboutType = {
    dayOfBirth: Date,
    gender: true,
    address: string,
    avatarUrl: string,
    fullName: string,
    phoneNumber: string
}
export type EducationType = {
    id: string,
    majorName: string,
    specialization: string,
    universityName: string,
    degreeType: string,
    startYear: number,
    endYear: number,
    diplomaUrl: string,
    verified?: boolean
}
export type CertificationType = {
    id: number,
    certificateName: string,
    description: string,
    issuedBy: string,
    issuedYear: number,
    certificateUrl: string,
    verified: boolean
}
export type AvailabilityType = {
    teachingPricePerHour: number,
    backgroundDescription: string,
    meetingLink: string,
    videoIntroductionLink: string,
    subjects: [string]
}
