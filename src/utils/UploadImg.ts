import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../utils/firebase";


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

