import { UploadFile } from "antd";

export interface Question {
    content?: string;
    questionFile?: (UploadFile & { url?: string })[];
    subject?: string;
    customerName?:string;
    createDate?:Date;
    modifiedDate?:Date;
    status?:string;
    loading: boolean;
}