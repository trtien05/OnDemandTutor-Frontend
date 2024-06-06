export interface Question {
    content?: string;
    questionFile: [];
    subject?: string;
    uploadDate?:Date;
    updateDate?:Date;
    status:string;
    loading: boolean;
}