import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../utils/firebase";
export const uploadCreateQuestionFiles = async (userId: number, file: File, sectionName: string, dateCreated: string) => {
    if (!file) {
        console.log("No file selected for upload.");
        return;
    }

    const imageRef = ref(storage, `${userId}/${sectionName}_${dateCreated}/${file.name}`);
    try {
        const uploadResult = await uploadBytes(imageRef, file);

        const url = await getDownloadURL(uploadResult.ref);
        return url;
    } catch (error) {
        console.log(`Upload failed: ${error}`);
        return null;
    }
};
