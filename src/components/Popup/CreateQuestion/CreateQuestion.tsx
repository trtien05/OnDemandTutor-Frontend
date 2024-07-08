import React, { useState } from 'react';
import { Button, Modal, Input, Select, UploadFile, Typography, message, Form } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import * as FormStyled from './CreateQuestion.styled';
import { InboxOutlined } from '@ant-design/icons';
import { theme } from '../../../themes';
import { uploadCreateQuestionFiles } from '../../../utils/uploadCreateQuestionFiles'; // Adjust the import path if needed
import { createQuestion } from '../../../utils/questionAPI';
import { useAuth } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
const { Title } = Typography;

interface CreateQuestionProps {
    messageApi: any;
}
const CreateQuestion: React.FC<CreateQuestionProps> = ({ messageApi }) => {
    const [form] = Form.useForm();
    const { user, role } = useAuth();
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    // const [modalData, setModalData] = useState(null);
    
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    // const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
        
        if (role === 'STUDENT') {
            setOpen(true);
        } else if (role === 'TUTOR') {
            messageApi.error('Tutor Cannot Create Question')
        }
        else {
            navigate(config.routes.public.login);
        }
    };
    async function saveQuestion(studentId: number, formData: any) {
        const jsonBody = convertQuestionData(formData);

        try {
            // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
            const responseData = await createQuestion(studentId, jsonBody);

            // Check response status

            // Get response data
            console.log('Question saved successfully:', responseData);
            // Return success response
            messageApi.success('Question saved successfully'); // Display success message
            return responseData;
        } catch (error: any) {
            console.log(error);
        }
    }

    function convertQuestionData(formData: any) {
        const questionData = {
            content: formData[`content`],
            questionUrl: '' || formData[`questionFile`][0],
            subjectName: formData[`subject`],
            title: formData[`title`]
        };
        return questionData;
    }

    const handleOk = async () => {
        setLoading(true);
        try {
            const values = await form.validateFields();
            const dateCreated = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
            const uploadedFiles = await Promise.all(
                fileList.map(async (file: UploadFile) => {
                    if (file.originFileObj) {
                        const url = await uploadCreateQuestionFiles(
                            user?.id || 0,
                            file.originFileObj,
                            'CreateQuestion',
                            dateCreated,
                            // index,
                        );
                        // console.log(`Uploaded file ${index} URL:`, url);
                        return { ...file, url };
                    }
                }),
            );
            values.questionFile = uploadedFiles.map((file: any) => file.url).filter(Boolean); // Add the file URLs to the form values
            // setModalData(values);
            // console.log('Clicked OK with values:', values);
            // setConfirmLoading(true);
            await saveQuestion(user?.id || 0, values);
            setTimeout(() => {
                setOpen(false);
                // setConfirmLoading(false);
                setLoading(false);
                form.resetFields();
                setFileList([]);
            }, 1000);
        } catch (info) {
            console.log('Validate Failed:', info);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // console.log('Clicked cancel button');
        form.resetFields(); // Reset the form fields
        setOpen(false);
    };


    const handleFileSizeCheck = (file: any) => {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('File must be smaller than 5MB!');
        }
        return isLt5M;
    };

    const onChange = (info: any) => {
        let newFileList = info.fileList;

        // Limit the file list to one file
        if (newFileList.length > 1) {
            newFileList = [newFileList[newFileList.length - 1]];
        }

        // Check the file size
        newFileList = newFileList.filter((file: any) => handleFileSizeCheck(file));

        setFileList(newFileList);
        form.setFieldsValue({ questionFile: newFileList }); // Update the form value
        // console.log('File List:', newFileList);
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
    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                style={{ width: '100%', borderRadius: '50px' }}
            >
                Create A Question
            </Button>

            <Modal
                open={open}
                onCancel={handleCancel}
                width={700}
                styles={{
                    content: {
                        borderRadius: '50px',
                        padding: '50px',
                        boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)',
                    },
                }}
                closeIcon={null}
                footer={[
                    <FormStyled.ButtonDiv>
                        <Button
                            key="Cancel"
                            type="default"
                            onClick={handleCancel}
                            style={{ marginRight: '5%', width: '50%' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            form="myForm" //because not the direct descendant of the Form component, so the htmlType="submit" won't work.
                            style={{ width: '50%' }}
                        >
                            Send
                        </Button>
                    </FormStyled.ButtonDiv>,
                ]}
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
                <FormStyled.FormWrapper
                    id="myForm" //Adding the id to give the form a unique identifier, link the send button to the form
                    form={form}
                    labelAlign="left"
                    layout="vertical"
                    requiredMark={false}
                    size="middle"
                    onFinish={handleOk}
                >
                    <FormStyled.FormContainer>
                        <FormStyled.FormTitle>Subject</FormStyled.FormTitle>
                        <FormStyled.FormItem name="subject" rules={[{ required: true, message: 'Please select a subject' }]}>
                            <Select size="large" placeholder="Select subject">
                                {options.map((option, index) => (
                                    <Select.Option key={index} value={option.value}>
                                        {option.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </FormStyled.FormItem>
                        <FormStyled.FormTitle>Title</FormStyled.FormTitle>
                        <FormStyled.FormItem name="title" rules={[{ required: true, message: 'Please enter information for the title field' }]}>
                            <Input
                                count={{
                                    show: true,
                                    max: 80,
                                }}
                                type="text"
                                placeholder="Enter your title here"
                            ></Input>
                        </FormStyled.FormItem>
                        <FormStyled.FormTitle>Enter your question</FormStyled.FormTitle>
                        <FormStyled.FormItem name="content" rules={[{ required: true, message: 'Please enter your question' }]}>
                            <FormStyled.CommentInput
                                count={{
                                    show: true,
                                    max: 1000,
                                }}
                                placeholder="Type your question here"
                                style={{ height: '200px' }}
                            ></FormStyled.CommentInput>
                        </FormStyled.FormItem>
                        <FormStyled.FormTitle>Upload a File</FormStyled.FormTitle>
                        <FormStyled.FormItem
                            name="questionFile"
                            valuePropName="fileList"
                        // getValueFromEvent={(e) => {
                        //     console.log('Get value from event:', e); // Log the event to debug
                        //     return Array.isArray(e) ? e : e && e.fileList;
                        // }}
                        >
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
                </FormStyled.FormWrapper>
            </Modal>
        </>
    );
};

export default CreateQuestion;