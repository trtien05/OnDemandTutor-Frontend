import React, { useRef, useState } from 'react';
import { Form, Button, Upload, message, GetProp, Spin } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getDownloadURL, uploadBytes, ref, getBlob } from "firebase/storage";
import { storage, firestore } from "../utils/firebase";
import { stringify, v4 } from "uuid";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import firebase from 'firebase/compat/app';
import { addDoc, collection } from 'firebase/firestore';
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
  handleChange: (name: string, info: UploadChangeParam<UploadFile<any>>) => void;
}

export const uploadImage = async (tutorId: number, file: File | null, sectionName: string, handleChange: (url: string) => void) => {
  console.log(file)
  if (!file) {
    console.log("No file selected for upload.");
    return;
  }
  //By creating a reference to a file, your app gains access to it.
  const imageRef = ref(storage, `${tutorId}/${sectionName}_${file.name}`);
  const metadata = {
    contentType: file.type
  };
  try {
    const uploadResult = await uploadBytes(imageRef, file, metadata);

    console.log(`${file.name} file uploaded successfully.`);

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


const FileUpload: React.FC<FileUploadProps> = ({ name, fileList, handleChange }) => {

  // call setfile on file input onChange
  // const [file, setFile] = useState<File | null>(null);
  const file = useRef<RcFile | null>(null)
  const [data, setData] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const handleInternalChange: UploadProps['onChange'] = (info: any) => {
    handleChange(name, info);
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
    <Dragger

      name={name}
      fileList={fileList}
      listType="picture"
      showUploadList={true}
      onChange={handleInternalChange}
      defaultFileList={fileList}
      beforeUpload={beforeUpload}
      onRemove={handleRemove}
      iconRender={() => (<Spin />)}
      accept=".jpg,.jpeg,.png,.pdf"
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">Support for a single image (JPG/PNG) or PDF file.</p>
    </Dragger>
  );
};

export default FileUpload;