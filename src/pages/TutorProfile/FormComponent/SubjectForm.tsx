import React, { useEffect, useState } from 'react';
import * as FormStyled from '../../BecomeTutor/Form.styled'
import ReactPlayer from 'react-player';
import { Button, Checkbox, Col, Form, Input, Modal, Row, Select, Steps, notification } from 'antd';
import { Certificate, Details, Education } from '../TutorProfile.type';
import { updateTutorDescription } from '../../../utils/tutorAPI';
import MultipleSteps from '../../BecomeTutor/MultipleSteps';
import EducationForm from './EducationForm';
import CertificationForm from './CertificationForm';
import { FieldType } from '../../BecomeTutor/Form.fields';


interface SubjectFormProps {
    tutorDetails: Details;
    tutorId: number;
    isUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    certificateData: Certificate[];
    educationData: Education[];
}



const SubjectForm: React.FC<SubjectFormProps> = (props) => {
    const [tutorDetails, setTutorDetails] = useState<any>(props.tutorDetails);
    const tutorId = props.tutorId;
    const [form] = Form.useForm();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [needDocument, setNeedDocument] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    //--------------------Mapping Data--------------------
    const [education, setEducation] = useState<{
        id: number;
        title: string;
    }[]>(
        props.educationData.map((item: Education) => {
            return {
                id: item.id,
                title: `${item.degreeType} of ${item.majorName}`,
            }
        })
    );

    const [certificate, setCertificate] = useState<{
        id: number;
        title: string;
    }[]>(
        props.certificateData.map((item: Certificate) => {
            return {
                id: item.id,
                title: `${item.certificateName} issued by ${item.issuedBy}`,
            }
        })
    );
    const subjectDoc = ['education', 'certification'];

    interface VisibilityState {
        [key: string]: boolean;
    }
    type FormState = {
        [key in keyof VisibilityState]: FieldType[];
    };

    const handleDayVisibility = (doc: string, checked: boolean) => {
        setVisibilityForDay(doc, checked);
    }

    const handleAddTimeslot = (doc: string) => {
        setTimeslotForm(prevState => {
            const newIndex = (prevState[doc].length);
            return {
                ...prevState,
                [doc]: [...prevState[doc], timeslotSelection(doc, newIndex, null)],
            };
        });
    }


    const handleRemoveTimeslot = (doc: string, formIndex: number) => {
        setTimeslotForm(prevState => ({
            ...prevState,
            [doc]: prevState[doc].filter((_, index) => index !== formIndex),
        }));
    }

    const [visibility, setVisibility] = useState<VisibilityState>({
        'education': true,
        'certification': true
    })
    const setVisibilityForDay = (doc: string, value: boolean) => {
        setVisibility(prevState => ({ ...prevState, [doc]: value }));
    };
    const timeslotSelection = (doc: string,
        index: number,
        initialValue: string | null): FieldType => ({
            key: `${doc}_${index}`,
            label: '',
            name: `${doc}_timeslot_${index}`,
            rules: [
                {
                    required: true,
                    message: 'Please select at least one diploma or certificate for your subject.',
                },
            ],
            children: (
                <Select size="large" placeholder="Select Subject">
                    {Object.values(education).map((subject) => (
                        <Select.Option key={subject.id} value={subject.id}>
                            {subject.title}
                        </Select.Option>
                    ))}
                </Select>
            )
        })

    const initialFormState = (): FormState => {
        return subjectDoc.reduce((acc, doc) => {
            acc[doc as keyof VisibilityState] = [timeslotSelection(doc, 0, null)];
            return acc;
        }, {} as FormState);
    };
    const [timeslotForm, setTimeslotForm] = useState<FormState>(initialFormState())
    const handleInputChange = (
        doc: string,
        index: number,
        value: string | null
    ) => {
        setTimeslotForm((prevState) => {
            const updatedFields = prevState[doc].map(
                (field, i) =>
                    i === index ? { ...field, initialValue: value } : field
            );
            return { ...prevState, [doc]: updatedFields };
        });
    };


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
    const isNewSubject = (values: any) => {
        const differences: string[] = values.subjects.filter((val: string) => !(tutorDetails.subjects.includes(val)));
        console.log(differences)
        console.log(tutorDetails.subjects)
        const containsAll = differences.length !== 0;
        console.log(containsAll)
        return { containsAll, differences };
    }

    const onSendSubject = async (values: any) => {
        const newSubject = isNewSubject(values);
        if (newSubject.containsAll) {
            await setNeedDocument(newSubject.differences);
            
        } 
        // else {
        //     onFinish(values);
        // }
    }

    const mapSubjects = (values: string[]) => (
        values.map((subject: string, index: number) => (
            <div key={index} style={{width:`100%`}}>
                <FormStyled.FormTitle level={3}>{subject}</FormStyled.FormTitle>
                {subjectDoc.map((doc) => (
                    <FormStyled.TimeslotStyle key={`${subject}_${doc}`} style={{width:`100%`}}>
                        <Form.Item
                            name={`${subject}_${doc}`}
                            valuePropName="checked"
                            initialValue={visibility[doc]}
                            style={{ margin: '0', width: '100%' }}
                        >
                            <FormStyled.FormCheckbox
                                style={{ margin: '0', width: '100%' }}
                                checked={visibility[doc]}
                                defaultChecked={visibility[doc]}
                                onChange={(e) => handleDayVisibility(doc, e.target.checked)}
                            >
                                {doc.charAt(0).toUpperCase() + doc.slice(1)}
                            </FormStyled.FormCheckbox>
                        </Form.Item>

                        {visibility[doc] && timeslotForm[doc].map((field: FieldType, formIndex: number) => (
                            <div style={{ width: '100%' }} key={`${doc}_${formIndex}`}>
                                <FormStyled.FormContainer style={{ columnGap: '3%' }} key={formIndex}>
                                    <FormStyled.FormItem
                                        key={field.key}
                                        label={field.label}
                                        name={field.name}
                                        rules={field.rules}
                                        $width={field.$width ? field.$width : '100%'}
                                        initialValue={field.initialValue}
                                        validateFirst
                                    >
                                        {field.children}
                                    </FormStyled.FormItem>
                                    {formIndex > 0 && (
                                        <FormStyled.DeleteButton type='link' onClick={() => handleRemoveTimeslot(doc, formIndex)}>
                                            X
                                        </FormStyled.DeleteButton>
                                    )}
                                </FormStyled.FormContainer>
                            </div>
                        ))}
                        {visibility[doc] && (
                            <Button type="dashed" onClick={() => handleAddTimeslot(doc)}>
                                Add another timeslot
                            </Button>
                        )}
                    </FormStyled.TimeslotStyle>
                ))}
            </div>
        ))
    );

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            //if (!isNewSubject(values)) {
            await saveTutorDescription(tutorId, values);
            props.isUpdate(true);
            api.success({
                message: "Your subjects has been updated",
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
    }

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
                message: 'Error',
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
                onOk={onSendSubject}
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
                    onFinish={onSendSubject}
                    form={form}
                    id='subjectForm'
                    labelAlign="left"
                    layout="vertical"
                    requiredMark={false}
                    size="middle"
                    style={{ rowGap: "10px" }}
                >
                    
                    <FormStyled.FormContainer >
                    <FormStyled.FormTitle level={1} style={{ margin: `auto` }}>Teaching Subjects</FormStyled.FormTitle>
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
                        hidden={needDocument.length !== 0}
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
                {needDocument.length !== 0 && mapSubjects(needDocument)}
                </FormStyled.FormContainer>
                </FormStyled.FormWrapper>
            </Modal>
        </>
    )
}

export default SubjectForm;