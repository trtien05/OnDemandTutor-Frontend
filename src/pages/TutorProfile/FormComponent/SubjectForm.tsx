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
    const [needDocument, setNeedDocument] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [addDoc, setAddDoc] = useState<boolean>(false);

    //--------------------Mapping Data--------------------
    const education: {
        id: number;
        title: string;
    }[] = (
            props.educationData.map((item: Education) => {
                return {
                    id: item.id,
                    title: `${item.degreeType} of ${item.majorName}`,
                }
            })
        );

    const certificate: {
        id: number;
        title: string;
    }[] = (
            props.certificateData !== undefined && props.certificateData !== null ?
                (props.certificateData.map((item: Certificate) => {
                    return {
                        id: item.id,
                        title: `${item.certificateName} issued by ${item.issuedBy}`,
                    }
                })) : []
        );

    const subjectDoc = ['education', 'certification'];

    interface VisibilityState {
        [subject: string]: {
            [doc: string]: boolean;
        };
    }

    type FormState = {
        [key: string]: {
            [doc: string]: FieldType[];
        };
    };

    const handleDayVisibility = (subject: string, doc: string, checked: boolean) => {
        setVisibilityForDay(subject, doc, checked);
    };

    const handleAddTimeslot = (subject: string, doc: string) => {
        setTimeslotForm(prevState => {
            const newIndex = (prevState[subject][doc].length);
            return {
                ...prevState,
                [subject]: {
                    ...prevState[subject],
                    [doc]: [...prevState[subject][doc], timeslotSelection(subject, doc, newIndex)],
                }
            };
        });
    };

    const handleRemoveTimeslot = (subject: string, doc: string, formIndex: number) => {
        setTimeslotForm(prevState => ({
            ...prevState,
            [subject]: {
                ...prevState[subject],
                [doc]: prevState[subject][doc].filter((_, index) => index !== formIndex),
            }
        }));
    };

    const initialFormState = (subjects: string[]): FormState => {
        const initialState: FormState = {};
        subjects.forEach((subject) => {
            initialState[subject] = subjectDoc.reduce((acc, doc) => {
                acc[doc] = [timeslotSelection(subject, doc, 0)];
                return acc;
            }, {} as { [key: string]: FieldType[] });
        });
        return initialState;
    };

    const initialVisibilityState = (subjects: string[]): VisibilityState => {
        const initialState: VisibilityState = {};
        subjects.forEach((subject) => {
            initialState[subject] = subjectDoc.reduce((acc, doc) => {
                acc[doc] = true;
                return acc;
            }, {} as { [doc: string]: boolean });
        });
        return initialState;
    };

    const [timeslotForm, setTimeslotForm] = useState<FormState>({});
    const [visibility, setVisibility] = useState<VisibilityState>(initialVisibilityState([]));

    const setVisibilityForDay = (subject: string, doc: string, value: boolean) => {
        setVisibility(prevState => ({
            ...prevState,
            [subject]: {
                ...prevState[subject],
                [doc]: value,
            }
        }));
    };

    const timeslotSelection = (subject: string, doc: string, index: number): FieldType => ({
        key: `${subject}_${doc}_${index}`,
        label: '',
        name: `${subject}_${doc}_${index}`,
        rules: [
            {
                required: true,
                message: 'Please select at least one diploma or certificate for your subject.',
            },
        ],
        children: (
            doc === 'education' ?
                (<Select size="large" placeholder="Select Subject">
                    {Object.values(education).map((subject) => (
                        <Select.Option key={subject.id} value={subject.id}>
                            {subject.title}
                        </Select.Option>
                    ))}
                </Select>) : <Select size="large" placeholder="Select Certificate">
                    {Object.values(certificate).map((subject) => (
                        <Select.Option key={subject.id} value={subject.id}>
                            {subject.title}
                        </Select.Option>
                    ))}
                </Select>
        )
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
    const isNewSubject = (values: any) => {
        const differences: string[] = values.subjects.filter((val: string) => !(tutorDetails.subjects.includes(val)));
        const containsAll = differences.length !== 0;
        return { containsAll, differences };
    };

    // const onSendSubject = async (values: any) => {
    //     const newSubject = isNewSubject(values);
    //     if (newSubject.containsAll) {
    //         if (!addDoc) {
    //             setLoading(true);
    //             await setNeedDocument(newSubject.differences);
    //             await setTimeslotForm(initialFormState(values.subjects)); // Set initial form state
    //             await setVisibility(initialVisibilityState(values.subjects)); // Set initial visibility state
    //             setAddDoc(true);
    //             setLoading(false)
    //         }
    //     } else {
    //         onFinish(values);
    //     }
    // };

    const mapSubjects = (values: string[]) => (
        values.map((subject: string, index: number) => (
            <div key={index} style={{ width: `100%` }}>
                <Title level={3} style={{ textAlign: `center` }}>{subject}</Title>
                {subjectDoc.map((doc) => (
                    <FormStyled.TimeslotStyle key={`${doc}`} style={{ width: `100%`, marginBottom: `20px` }}>
                        <Form.Item
                            name={`${subject}_${doc}`}
                            valuePropName="checked"
                            initialValue={visibility[subject][doc]}
                            style={{ margin: '0', width: '100%' }}
                        >
                            <FormStyled.FormCheckbox
                                style={{ margin: '0', width: '100%' }}
                                checked={visibility[subject][doc]}
                                defaultChecked={visibility[subject][doc]}
                                onChange={(e) => handleDayVisibility(subject, doc, e.target.checked)}
                            >
                                {doc.charAt(0).toUpperCase() + doc.slice(1)}
                            </FormStyled.FormCheckbox>
                        </Form.Item>

                        {visibility[subject][doc] && (timeslotForm[subject][doc].map((field: FieldType, formIndex: number) => (
                            <div style={{ width: '100%' }} key={`${subject}_${doc}_${formIndex}`}>
                                <FormStyled.FormContainer style={{ columnGap: '3%' }} key={`${subject}_${formIndex}`}>
                                    <FormStyled.FormItem
                                        key={field.key}
                                        label={field.label}
                                        name={field.name}
                                        rules={field.rules}
                                        $width={field.$width ? field.$width : '90%'}
                                        initialValue={field.initialValue}
                                        validateFirst
                                    >
                                        {field.children}
                                    </FormStyled.FormItem>
                                    {formIndex > 0 && (
                                        <FormStyled.DeleteButton type='link' onClick={() => handleRemoveTimeslot(subject, doc, formIndex)}>
                                            X
                                        </FormStyled.DeleteButton>
                                    )}
                                </FormStyled.FormContainer>
                            </div>
                        )))}
                        {visibility[subject][doc] && (
                            <Button type="dashed" onClick={() => handleAddTimeslot(subject, doc)}>
                                Add another document
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
            console.log(values)
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
    // async function saveTutorDescription(tutorId: number, formData: any) {
    //     const jsonRequestBody = await convertSubjectData(formData);

    //     try {
    //         // const responseData = await updateTutorDescription(tutorId, jsonRequestBody);
    //         console.log(jsonRequestBody)
    //         // if (!api.success) {
    //         //     throw new Error(`Error: ${responseData.statusText}`);
    //         // }

    //         // console.log('Tutor description saved successfully:', responseData);
    //         // return responseData;
    //     } catch (error: any) {
    //         api.error({
    //             message: 'Error',
    //             description: error.response ? error.response.data : error.message,
    //         });
    //     }
    // }

    // function convertSubjectData(formData: any) {
    //     const jsonResult: { subjectName: string; diploma: number[]; certificate: number[]; }[] = [];

    //     // needDocument.forEach((subject: string, index) => {
    //     //     // Check for timeslots for the current day
    //     //     let arr: { [key: string]: number[] } = {};
    //     //     arr['education'] = [];
    //     //     arr['certification'] = [];
    //     //     subjectDoc.forEach((doc) => {
    //     //         if (formData[`${subject}_${doc}`]) {
    //     //             arr[doc] = [];
    //     //             for (let i = 0; formData[`${subject}_${doc}_${i}`]; i++) {
    //     //                 arr[doc].push(formData[`${subject}_${doc}_${i}`]);
    //     //             }
    //     //         }
    //     //     })

    //     //     jsonResult.push({
    //     //         subjectName: subject,
    //     //         diploma: arr['education'],
    //     //         certificate: arr['certification']
    //     //     });
    //     // });
    //     console.log(form.getFieldsValue())
    //     return jsonResult;
    // }

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
                        {/* {addDoc && mapSubjects(needDocument)} */}
                    </FormStyled.FormContainer>
                </FormStyled.FormWrapper>
            </Modal>
        </>
    )
}

export default SubjectForm;
