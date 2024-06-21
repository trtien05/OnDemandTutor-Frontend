
export interface Question {
        id: number;
        content?: string;
        createdAt?: string;
        modifiedAt?: string;
        questionUrl?: string | null;
        status?: string;
        subjectName?: string;
        account: {
            id: number;
            avatarUrl?: string | null;
            email: string;
            fullName: string;
        };
        title?:string;
        loading: boolean;
}