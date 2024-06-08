import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../utils/firebase";

export const uploadCreateQuestionFiles = async (userId: number, file: File | null, sectionName: string, dateCreated: string, index: number, handleChange: (url: string) => void) => {
    console.log(file);
    if (!file) {
        console.log("No file selected for upload.");
        return;
    }

    const imageRef = ref(storage, `${userId}/${sectionName}_${dateCreated}/${file.name}`);
    try {
        const uploadResult = await uploadBytes(imageRef, file);

        const url = await getDownloadURL(uploadResult.ref);
        console.log(`File available at: ${url}`);
        if (url) {
            handleChange(url);
        }
    } catch (error) {
        console.log(`Upload failed: ${error}`);
    }
};
