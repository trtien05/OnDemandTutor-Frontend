import React, { useState } from 'react';
import { Form, Button, Upload, message } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import * as FormStyled from '../pages/BecomeTutor/Form.styled';

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

const FileUpload: React.FC = () => {
    const [fileList, setFileList] = useState<any[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleChange = (info: any) => {
        const newFileList = [...info.fileList].slice(-1); // Only keep the latest file
        setFileList(newFileList);

        if (info.file.status === 'done' || info.file.status === 'removed') {
            const file = newFileList[0]?.originFileObj;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => setPreviewUrl(e.target?.result as string);
                if (file.type === 'application/pdf') {
                    setPreviewUrl('pdf');
                } else {
                    reader.readAsDataURL(file);
                    setPreviewUrl('png');
                }
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const beforeUpload = (file: File) => {
        const isJpgOrPngOrPdf = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
        if (!isJpgOrPngOrPdf) {
            message.error('You can only upload JPG/PNG/PDF files!');
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const handleRemove = () => {
        setPreviewUrl(null);
    };

    return (
            <Dragger
                    name="educationVerification"
                    fileList={fileList}
                    listType="picture"
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    onRemove={handleRemove}
                    accept=".jpg,.jpeg,.png,.pdf"
                    customRequest={({ onSuccess }) => setTimeout(() => { if (onSuccess) { onSuccess("ok") } }, 0)}
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