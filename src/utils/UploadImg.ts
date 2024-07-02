import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../utils/firebase";
import { UploadFile } from "antd";

export const validateFileType = (
  { type, name }: UploadFile,
  allowedTypes?: string
) => {
  if (!allowedTypes) {
    return true;
  }
  if (type) {
    return allowedTypes.includes(type);
  }
};

export const validateFileSize = (file: UploadFile, size: number) => {
  if (file.size) {
    return file.size <= size*1024*1024;
  }
}

export const uploadImage = async (tutorId: number, file: File | null, sectionName: string, index: number, handleChange: (url: string) => void) => {
  console.log(file)
  if (!file) {
    console.log("No file selected for upload.");
    return;
  }

  //By creating a reference to a file, your app gains access to it.
  const imageRef = ref(storage, `${tutorId}/${sectionName}_${index}`);
  try {

    const uploadResult = await uploadBytes(imageRef, file)

    // Get the download URL
    const url = await getDownloadURL(uploadResult.ref);
    console.log(`File available at: ${url}`);
    if (url) {
      handleChange(url);
    }
  } catch (error) {
    console.log(`Upload failed: ${error}`);
  }

}
export const uploadAvatar = async (userId: number, file: File | null, sectionName: string) => {
  console.log(file)
  if (!file) {
    console.log("No file selected for upload.");
    return;
  }

  //By creating a reference to a file, your app gains access to it.
  const imageRef = ref(storage, `${userId}/${sectionName}`);
  try {

    const uploadResult = await uploadBytes(imageRef, file)

    // Get the download URL
    const url = await getDownloadURL(uploadResult.ref);
    console.log(`File available at: ${url}`);
    return url;
  } catch (error) {
    console.log(`Upload failed: ${error}`);
  }

}

