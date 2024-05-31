import React, { useRef, useState } from 'react';
import { Form, Button, Upload, message, GetProp, Spin } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getDownloadURL, uploadBytes, ref, getBlob, uploadBytesResumable, UploadTaskSnapshot } from "firebase/storage";
import { storage, firestore } from "../utils/firebase";
// import { stringify, v4 } from "uuid";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import firebase from 'firebase/compat/app';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
// set initial state for the object 

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const { Dragger } = Upload;

const Thumbnail = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  img {
    max-width: 100px;
    max-height: 100px;
  }
  .pdf-thumbnail {
    font-size: 48px;
  }
`;
interface FileUploadProps {
  name: string;
  fileList: UploadFile[];
  // fileList: [];
  handleChange: (name: string, info: UploadChangeParam<UploadFile<any>>) => void;
  // handleChange: ( info: UploadChangeParam<UploadFile<any>>) => void;
 
}



export const uploadImage = async (tutorId: number, file: File | null, sectionName: string, index: number, handleChange: (url: string) => void) => {
  console.log(file)
  if (!file) {
    console.log("No file selected for upload.");
    return;
  }

  // định dạng convert file - get url dynamic
  const blob = new Blob([file], { type: file.type });
  const blobBuffer = await blob.arrayBuffer();
  const blobEncoded = btoa(blobBuffer.toString());

  var downloadURL;
  //By creating a reference to a file, your app gains access to it.
  const imageRef = ref(storage, `${tutorId}/${sectionName}_${index}`);
  const metadata = {
    contentType: file.type
  };
  try {
    // upload firebase v9
    const uploadResult = await uploadBytes(imageRef, blobBuffer, metadata)
    //   const collectionRef = collection(firestore,`${sectionName}`);
    //   setDoc(doc(collectionRef), blobBuffer)
    // .then(() => {
    //   console.log('String data saved successfully!');
    // })
    // .catch((error) => {
    //   console.error('Error saving string data:', error);
    // });
    //   const uploadTask = await
    //   imageRef.put
    //     storage.ref().put(blob).then(function(snapshot) {
    //       console.log(`${file.name} file uploaded successfully.`);

    // })



    // uploadResult.on(
    //   'state_changed', // Use 'state_changed' for TypeScript compatibility
    //   (snapshot: UploadTaskSnapshot) => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log(`Upload progress: ${progress}%`);
    //   },
    //   (error) => {
    //     console.error('Error uploading file:', error);
    //   },
    //   async () => {
    //      downloadURL = await getDownloadURL(uploadResult.snapshot.ref);
    //     console.log(`Download URL: ${downloadURL}`);
    //   }
    // );

    // Get the download URL
    const url = await getDownloadURL(uploadResult.ref);
    console.log(`File available at: ${url}`);
    if (downloadURL) {
      handleChange(downloadURL); // handleChange đang bị dùng ở cả handle file và url
    }
  } catch (error) {
    console.log(`Upload failed: ${error}`);
  }

}

type DefaultFile = {
  uid: number,
  name: string,
  status: string,
  url: string
}

// drag để upload ảnh
const FileUpload: React.FC<FileUploadProps> = ({ name, fileList, handleChange }) => {
  const [defaultFiles, setDefaultFiles] = useState<UploadFile[]>([])
  // const [defaultFiles, setDefaultFiles] = useState<[]>([])
  // call setfile on file input onChange
  // const [file, setFile] = useState<File | null>(null);
  const file = useRef<RcFile | null>(null)
  const [data, setData] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // handleChange(name, info);
  const handleInternalChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile<any>>) => {
    handleChange(name,info);
  };

  const handleDefaultFileList = () => {
    setDefaultFiles((prevState) =>
      fileList.map((file, index): UploadFile => ({
        uid: `${index}`,
        name: file.name,
        status: 'done',
        //url: URL.createObjectURL(new Blob([file.originFileObj],{type: file.type})), // Handle potential undefined originFileObj
      }))
    );
  };

  const beforeUpload = (file: FileType) => {
    // You can remove this validation if you want
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      console.log('Image must be smaller than 5MB!');
    }
    // } else {
    //   setFileList([file])
    // }
    console.log(file);
    return false;
  };

  const handleRemove = () => {
    setPreviewUrl(null);
  };

  return (
    <Upload
    name={name}
    fileList={fileList}
    onChange={handleInternalChange}
    showUploadList={true}
    defaultFileList={defaultFiles}
    beforeUpload={beforeUpload}
    onRemove={handleRemove}
    accept=".jpg,.jpeg,.png,.pdf"
    >
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload> 
    // <Dragger

    //   name={name}
    //   fileList={fileList}
    //   listType="picture"
    //   showUploadList={true}
    //   onChange={handleInternalChange}
    //   defaultFileList={defaultFiles}
    //   beforeUpload={beforeUpload}
    //   onRemove={handleRemove}
    //   iconRender={() => (<Spin />)}
    //   accept=".jpg,.jpeg,.png,.pdf"
    // >
    //   <p className="ant-upload-drag-icon">
    //     <InboxOutlined />
    //   </p>
    //   <p className="ant-upload-text">Click or drag file to this area to upload</p>
    //   <p className="ant-upload-hint">Support for a single image (JPG/PNG) or PDF file.</p>
    // </Dragger>
  );
};



export default FileUpload;