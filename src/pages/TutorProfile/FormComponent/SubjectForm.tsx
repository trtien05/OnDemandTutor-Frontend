import React, { useEffect, useState } from 'react';
import * as FormStyled from '../../BecomeTutor/Form.styled';
import { Button, Checkbox, Col, Form, Modal, Row, Select, notification, Typography } from 'antd';
import { Certificate, Details, Education } from '../TutorProfile.type';
import { FieldType } from '../../BecomeTutor/Form.fields';
import { updateTutorDescription } from '../../../utils/tutorAPI';
import { ConsoleSqlOutlined } from '@ant-design/icons';
const { Title } = Typography;

interface SubjectFormProps {
    tutorDetails: Details;
    tutorId: number;
    isUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    certificateData?: Certificate[];
    educationData: Education[];
}

const SubjectForm: React.FC<SubjectFormProps> = (props) => {
    const tutorDetails = props.tutorDetails;
    const tutorId = props.tutorId;
    const [form] = Form.useForm();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    //--------------------Initial Data--------------------
    useEffect(() => {
        form.setFieldsValue({
            teachingPricePerHour: tutorDetails.teachingPricePerHour,
            backgroundDescription: tutorDetails.backgroundDescription,
            meetingLink: tutorDetails.meetingLink,
            videoIntroductionLink: tutorDetails.videoIntroductionLink,
            subjects: tutorDetails.subjects,
        });
    }, [tutorDetails]);

    const options = [
        { label: "Mathematics", value: "Mathematics" },
        { label: "Chemistry", value: "Chemistry" },
        { label: "Biology", value: "Biology" },
        { label: "Literature", value: "Literature" },
        { label: "English", value: "English" },
        { label: "IELTS", value: "IELTS" },
        { label: "TOEFL", value: "TOEFL" },
        { label: "TOEIC", value: "TOEIC" },
        { label: "Physics", value: "Physics" },
        { label: "Geography", value: "Geography" },
        { label: "History", value: "History" },
        { label: "Coding", value: "Coding" },
    ];

    //--------------------Modal--------------------
    function showModal() {
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    //--------------------Finish Form--------------------

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            await saveTutorDescription(tutorId, values);
            props.isUpdate(true);
            api.success({
                message: "Your subjects have been updated",
            });
        } catch (error: any) {
            api.error({
                message: "Error",
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
            setIsFormOpen(false);
        }
    };

    //--------------------API Save Profile--------------------
    async function saveTutorDescription(tutorId: number, formData: any) {

        // Get JSON body from form data
        const jsonRequestBody = convertTutorDescriptionFormData(formData);
    
        try {
    
          // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
          const responseData = await updateTutorDescription(tutorId, jsonRequestBody);
    
          // Check response status
          if (!api.success) {
            throw new Error(`Error: ${responseData.statusText}`);
          }
    
          // Get response data
          console.log('Tutor description saved successfully:', responseData);
    
          // Return success response
          return responseData;
        } catch (error: any) {
          api.error({
            message: 'Lỗi',
            description: error.response ? error.response.data : error.message,
          });
        }
      }
    
      function convertTutorDescriptionFormData(formData: any) {
        const descriptionData = {
          // convert form data to tutor description json format
          teachingPricePerHour: formData.teachingPricePerHour,
          backgroundDescription: formData.backgroundDescription,
          meetingLink: formData.meetingLink,
          videoIntroductionLink: formData.videoIntroductionLink,
          subjects: formData.subjects,
        };
    
        return descriptionData;
      }

    return (
        <>
            {contextHolder}
            <Button type="default" onClick={showModal} style={{ borderRadius: `6px`, fontWeight: `bold`, width: `150px` }}>
                Edit subjects
            </Button>
            <Modal
                centered
                closable={false}
                width={'700px'}
                open={isFormOpen}
                onCancel={handleCancel}
                onOk={onFinish}
                footer={[<FormStyled.ButtonDiv>
                    <Button key="Cancel" type="default" onClick={handleCancel} style={{ marginRight: '5%', width: '45%' }}>
                        Cancel
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        form='subjectForm'
                        style={{ width: '45%' }}
                    >
                        Save
                    </Button>
                </FormStyled.ButtonDiv>,]}
                styles={
                    {
                        content: {
                            borderRadius: '50px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
                        }
                    }}
            >
                {contextHolder}
                <FormStyled.FormWrapper
                    onFinish={onFinish}
                    form={form}
                    id='subjectForm'
                    labelAlign="left"
                    layout="vertical"
                    requiredMark={false}
                    size="middle"
                    style={{ rowGap: "10px" }}
                >

                    <FormStyled.FormContainer >
                        <FormStyled.FormTitle level={1} style={{ margin: `auto`, marginBottom: `20px` }}>Teaching Subjects</FormStyled.FormTitle>
                        <FormStyled.FormItem
                            name="teachingPricePerHour" hidden />

                        <FormStyled.FormItem
                            name="backgroundDescription" hidden />

                        <FormStyled.FormItem
                            name="meetingLink" hidden />

                        <FormStyled.FormItem
                            name="videoIntroductionLink" hidden />

                        <FormStyled.FormItem
                            name="subjects"
                            $width={"100%"}
                            rules={[{
                                required: true,
                                message: 'Please choose a subject'
                            }]}>
                            <FormStyled.CheckboxGroup>
                                <Row>
                                    {options.map(option => (
                                        <Col lg={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 8 }} key={option.value}>
                                            <Checkbox
                                                value={option.value}>
                                                {option.label}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </FormStyled.CheckboxGroup>
                        </FormStyled.FormItem>
                    </FormStyled.FormContainer>
                </FormStyled.FormWrapper>
            </Modal>
        </>
    )
}

export default SubjectForm;
