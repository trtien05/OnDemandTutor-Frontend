
export enum Degree {
    ASSOCIATE = 'Associate',
    BACHELOR = 'Bachelor',
    MASTER = 'Master',
    DOCTORAL = 'Doctoral',
}

export enum Subject {
    MATH = 'Math',
    CHEMISTRY = 'Chemistry',
    BIOLOGY = 'Biology',
    PHYSICS = 'Physics',
    GEOGRAPHY = 'Geography',

    LITERATURE = 'Literature',
    ENGLISH = 'English',

    IELTS = 'IELTS',
    TOEIC = 'TOEIC',
    TOEFL = 'TOEFL',

    CODING = 'Coding',

    HISTORY = 'History',

    OTHER = 'Other',
}


export enum AccountStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'UNVERIFIED',
    PROCESSING = 'PROCESSING',
    BANNED = 'BANNED',
}

export const Role: { [key: string]: string } = {
    STUDENT: 'STUDENT',
    TUTOR: 'TUTOR',
    MODERATOR: 'MODERATOR',
    ADMIN: 'ADMIN',
};

