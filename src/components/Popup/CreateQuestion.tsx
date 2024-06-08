import React, { useState } from 'react';
import { Button, Modal, Input, Select, UploadFile, Typography, message, Form } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import * as FormStyled from './CreateQuestion.styled';
import { InboxOutlined } from '@ant-design/icons';
import { theme } from '../../themes';
import { uploadCreateQuestionFiles } from '../../utils/uploadCreateQuestionFiles'; // Adjust the import path if needed
const Question: React.FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async() => {
        // setLoading(true); // Set loading state to true when form is submitted
        // form.validateFields()
        //     .then((values) => {
        //         values.questionFile = fileList; // Add the file list to the form values
        //         setModalData(values);
        //         console.log('Clicked OK with values:', values);
        //         setConfirmLoading(true);
        //         setTimeout(() => {
        //             setOpen(false);
        //             setConfirmLoading(false);
        //             setLoading(false); // Set loading state back to false when form submission is complete
        //             form.resetFields(); // Reset the form fields
        //         }, 2000);
        //     })
        //     .catch((info) => {
        //         console.log('Validate Failed:', info);
        //         setLoading(false); // Set loading state back to false when form submission is complete
        //     });
        setLoading(true);
        try {
            const values = await form.validateFields();
            const dateCreated = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
            const uploadedFiles = await Promise.all(fileList.map(async (file, index) => {
                const url = await uploadCreateQuestionFiles(1, file.originFileObj, 'CreateQuestion', dateCreated, index, (url) => url);
                return { ...file, url };
            }));
            values.questionFile = uploadedFiles.map(file => file.url); // Add the file URLs to the form values
            setModalData(values);
            console.log('Clicked OK with values:', values);
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
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
        console.log('Clicked cancel button');
        form.resetFields(); // Reset the form fields
        setOpen(false);
    };
    // const onChange = ({ fileList: newFileList }) => {

    //     setFileList(newFileList);
    // };
    const handleFileSizeCheck = (info) => {
        const isLt5M = info.file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Image must smaller than 5MB!');
            // Remove the file from the list
            const index = info.fileList.indexOf(info.file);
            const newFileList = info.fileList.slice();
            newFileList.splice(index, 1);
            return newFileList;
        } else {
            // If file size is less than 5MB, return the new file list
            return info.fileList;
        }
    };

    const onChange = (info) => {
        const newFileList = handleFileSizeCheck(info);
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
                open={open}
                onCancel={handleCancel}
                width={700}
                styles={
                    { content: { borderRadius: '100px', padding: '50px', boxShadow:'-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
                } }}
                
                closeIcon={null}
                footer={[
                    <FormStyled.ButtonDiv>
                        <Button key="Cancel" type="default" onClick={handleCancel} style={{marginRight:'5%', width:'50%'}}>
                            Cancel
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            form="myForm" //because not the direct descendant of the Form component, so the htmlType="submit" won't work.
                            style={{width:'50%'}}
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
                        <FormStyled.FormItem name="subject" rules={[{ required: true }]}>
                            <Select size="large" placeholder="Select subject">
                                {options.map((option, index) => (
                                    <Select.Option key={index} value={option.value}>
                                        {option.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </FormStyled.FormItem>
                        <FormStyled.FormTitle>Enter your question</FormStyled.FormTitle>
                        <FormStyled.FormItem name="content" rules={[{ required: true }]}>
                            <FormStyled.CommentInput
                                placeholder="Type your question here"
                                style={{ height: '200px' }}
                            ></FormStyled.CommentInput>
                        </FormStyled.FormItem>
                        <FormStyled.FormTitle>Upload a File</FormStyled.FormTitle>
                        <FormStyled.FormItem name="questionFile">
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
                        {/* <FormStyled.ButtonDiv>
                    <Button key="Cancel" type="default" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" htmlType="submit" loading={loading} > 
                    
                      Send
                    </Button>
                    </FormStyled.ButtonDiv> */}
                    </FormStyled.FormContainer>
                </FormStyled.FormWrapper>
            </Modal>
        </>
    );
};

export default Question;
