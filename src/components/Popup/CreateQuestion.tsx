import React, { useState } from 'react';
import { Button, Modal, Input, Select, UploadFile, Typography } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import * as FormStyled from './CreateQuestion.styled';
import { InboxOutlined } from '@ant-design/icons';
import { theme } from '../../themes';

const Question: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText();
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const options = [
        { label: 'Mathematics', value: 'Mathematics' },
        { label: 'Chemistry', value: 'Chemistry' },
        { label: 'Biology', value: 'Biology' },
        { label: 'Literature', value: 'Literature' },
        { label: 'English', value: 'English' },
        { label: 'IELTS', value: 'IELTS' },
        { label: 'TOEFL', value: 'TOEFL' },
        { label: 'TOEIC', value: 'TOEIC' },
        { label: 'Physics', value: 'Physics' },
        { label: 'Geography', value: 'Geography' },
        { label: 'History', value: 'History' },
        { label: 'Coding', value: 'Coding' },
    ];
    const { Title } = Typography;
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create A Question
            </Button>
            <Modal
                // title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Title
                    style={{
                        color: `${theme.colors.primary}`,
                        textTransform: `capitalize`,
                        textAlign: `center`,
                    }}
                >
                    Send your question
                </Title>
                <FormStyled.FormContainer>
                    <FormStyled.FormTitle>Subject</FormStyled.FormTitle>
                    <FormStyled.FormItem>
                        <Select size="large" placeholder="Select subject">
                            {options.map((option, index) => (
                                <Select.Option key={index} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </FormStyled.FormItem>
                    <FormStyled.FormTitle>Enter your question</FormStyled.FormTitle>
                    <FormStyled.FormItem>
                        <FormStyled.CommentInput
                            name="content"
                            placeholder="Type your question here"
                            style={{ height: '200px' }}
                        ></FormStyled.CommentInput>
                    </FormStyled.FormItem>
                    <FormStyled.FormTitle>Upload a File</FormStyled.FormTitle>
                    <FormStyled.FormItem>
                        <Dragger
                            name="questionFile"
                            fileList={fileList}
                            listType="picture"
                            showUploadList={true}
                            onChange={onChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                            beforeUpload={() => false} // Prevent upload by return false
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single image (JPG/PNG) or PDF file.
                            </p>
                        </Dragger>
                    </FormStyled.FormItem>
                </FormStyled.FormContainer>
            </Modal>
        </>
    );
};

export default Question;
