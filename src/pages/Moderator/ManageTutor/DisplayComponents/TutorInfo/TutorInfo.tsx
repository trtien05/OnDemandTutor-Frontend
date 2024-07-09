import { Avatar, Button, Col, Flex, Form, Modal, Select, Skeleton, Switch, notification } from "antd";
import { useEffect, useState } from "react";
import * as FormStyled from "../../../../BecomeTutor/Form.styled";
import * as Styled from '../../../../../components/QuestionList/Question.styled';
import { UserOutlined } from "@ant-design/icons";
import { getFullSchedule, getTutorCertification, getTutorEducation } from "../../../../../utils/tutorAPI";
import { theme } from "../../../../../themes";
import { Tutor, Education, Certificate, Schedule } from "../../Tutor.type";
import ReactPlayer from "react-player";
import { Clickable, FormItem } from "./TutorInfo.styled"
import EducationVerify from "./EducationVerify";
import CertificateVerify from "./CertificateVerify";
import TimeslotVerify from "./TimeslotVerify";
import { approveTutor, sendEmail } from "../../../../../utils/moderatorAPI";
import { approveForm, approveMessages, tutorApprovalMessages, tutorRejectionMessages } from "../../emailMessages";
// import iconBachelor from '../../../assets/images/image13.png';
interface TutorInfoProps {
    tutorId: number;
    tutor: Tutor;
    onReload?: () => void;
}7

const TutorInfo: React.FC<TutorInfoProps> = (props) => {
    const { tutorId } = props;
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [schedule, setSchedule] = useState<Schedule[]>([]); // Tutor schedule
    const [isScheduleAccepted, setIsScheduleAccepted] = useState(false); // Tutor schedule
    const [isFormOpen, setIsFormOpen] = useState(false);
    const tutorInfo = props.tutor; // Tutor info
    const [tutorEducation, setTutorEducation] = useState<Education[]>([]); // Tutor education
    const [tutorCertification, setTutorCertification] = useState<Certificate[]>([]); // Tutor certification
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [switchStates, setSwitchStates] = useState({
        videoIntroductionLink: false,
        backgroundDescription: false,
    });
    const [switchSubject, setSwitchSubject] = useState({});
    const [agreement, setAgreement] = useState(false);
    const [acceptedDiploma, setAcceptedDiploma] = useState<number[]>([]);
    const [acceptedCertificate, setAcceptedCertificate] = useState<number[]>([]);
    const [acceptedSubject, setAcceptedSubject] = useState<string[]>([]);
    const [isRejected, setIsRejected] = useState(false); // Tutor is rejected

    //---------------------- Fetch tutor info ----------------------
    useEffect(() => {
        const fetchTutor = async () => {
            try {
                setLoading(true);
                setSwitchSubject(() => (
                    tutorInfo.subjects.map((item) => ({ [item]: false }))
                ));
                const education = await getTutorEducation(tutorId, '');
                if (education.data) {
                    setTutorEducation(education.data);
                }
                const certificate = await getTutorCertification(tutorId, '');
                if (certificate.data) {
                    setTutorCertification(certificate.data);
                }
                const schedule = await getFullSchedule(tutorId);
                if (schedule.data) {
                    setSchedule(() => schedule.data.schedules.map((item: any) => ({
                        dayOfWeek: item.dayOfWeek,
                        dayOfMonth: item.dayOfMonth,
                        timeslots: [...item.timeslots.map((timeslot: any) => ({
                            id: timeslot.id,
                            startTime: timeslot.startTime,
                            endTime: timeslot.endTime
                        }))
                        ]
                    })));
                }
            } catch (error) {
                api.error({
                    message: "Error",
                    description: "Failed to fetch tutor info",
                });
            } finally {
                setLoading(false);
            }
        }
        fetchTutor();
    }, [])

    //---------------------- Handle accept field ----------------------

    const handleAcceptField = (fieldName: string, checked: boolean) => {
        if (checked) {
            const value = tutorInfo[fieldName as keyof Tutor];
            form.setFieldsValue({ [fieldName]: value });
        } else form.setFieldsValue({ [fieldName]: null });
        setSwitchStates((prevState) => ({ ...prevState, [fieldName]: checked }));
    }

    const toggleSwitch = (fieldName: string) => {
        const currentValue = form.getFieldValue(fieldName);
        handleAcceptField(fieldName, !currentValue);
    };

    const handleAcceptedDiploma = (id: number, checked: boolean) => {
        if (checked) {
            setAcceptedDiploma((prevState) => [...prevState, id]);
        } else {
            setAcceptedDiploma((prevState) => prevState.filter((item) => item !== id));
        }
    }

    const handleAcceptedCertificate = (id: number, checked: boolean) => {
        if (checked) {
            setAcceptedCertificate((prevState) => [...prevState, id]);
        } else {
            setAcceptedCertificate((prevState) => prevState.filter((item) => item !== id));
        }
    }

    const addSubject = (subject: string, checked: boolean) => {
        if (checked) {
            setAcceptedSubject((prevState) => [...prevState, subject]);
        } else {
            setAcceptedSubject((prevState) => prevState.filter((item) => item !== subject));
        }
        setSwitchSubject((prevState) => ({ ...prevState, [subject]: checked }));
    };

    const toggleSubject = (subject: string) => {
        addSubject(subject, !switchSubject[subject as keyof typeof switchSubject]);
    };

    const toggleSchedule = () => {
        setIsScheduleAccepted(!isScheduleAccepted);
    };

    //---------------------- Handle submit form ----------------------

    function showModal() {
        setIsFormOpen(true);
    };

    const approveValidation = () => {
        if (acceptedDiploma.length === 0) {
            api.error({
                message: "Error",
                description: "A tutor must have at least one approved diploma",
            });
            return false;
        }
        if (acceptedSubject.length === 0) {
            api.error({
                message: "Error",
                description: "A tutor must have at least one approved subject",
            });
            return false;
        }

        //set mail message
        const rejectDocument = (acceptedDiploma.length < tutorEducation.length) || (acceptedCertificate.length < tutorCertification.length);
        const rejectSubject = acceptedSubject.length < tutorInfo.subjects.length;
        const missingDescription = tutorInfo.backgroundDescription === null || tutorInfo.videoIntroductionLink === null;
        const rejectDescription = missingDescription === false && !(form.getFieldValue('backgroundDescription') && form.getFieldValue('videoIntroductionLink'));
        const rejectFields = (rejectDocument && rejectSubject)
            || (rejectDescription && rejectSubject) || (rejectDescription && rejectDocument);
        const missingSchedule = () => {
            let sum = 0;
            schedule.map((item) => {
                sum += item.timeslots.length;
            })
            return sum === 0;
        }
        let mailMessage = `${approveForm.INTRO} <br/> <br/>`;
        if (rejectFields)
            if (missingSchedule()) mailMessage += `${approveMessages.REJECTED_FIELDS}<br/> <br/> ${approveMessages.MISSING_SCHEDULE_ADDITIONAL} <br/> <br/> `;
            else mailMessage += `${approveMessages.REJECTED_FIELDS}<br/> <br/>`;
        else if (rejectSubject)
            if (missingSchedule()) mailMessage += `${approveMessages.REJECTED_SUBJECT}<br/> <br/> ${approveMessages.MISSING_SCHEDULE_ADDITIONAL} <br/> <br/> `;
            else mailMessage += `${approveMessages.REJECTED_SUBJECT}<br/> <br/>`;
        else if (rejectDocument)
            if (missingSchedule()) mailMessage += `${approveMessages.REJECTED_DOCUMENT}<br/> <br/> ${approveMessages.MISSING_SCHEDULE_ADDITIONAL} <br/> <br/> `;
            else mailMessage += `${approveMessages.REJECTED_DOCUMENT}<br/> <br/>`;
        else if (missingDescription)
            if (missingSchedule()) mailMessage += `${approveMessages.MISSING_DESCIPRITON}<br/> <br/> ${approveMessages.MISSING_SCHEDULE_ADDITIONAL} <br/> <br/> `;
            else mailMessage += `${approveMessages.MISSING_DESCIPRITON}<br/> <br/>`;
        else if (rejectDescription)
            if (missingSchedule()) mailMessage += `${approveMessages.REJECTED_DESCRIPTION}<br/> <br/> ${approveMessages.MISSING_SCHEDULE_ADDITIONAL} <br/> <br/> `;
            else mailMessage += `${approveMessages.REJECTED_DESCRIPTION}<br/> <br/> `;
        else if (missingSchedule()) mailMessage += `${approveMessages.MISSING_SCHEDULE}<br/> <br/>`;
        else form.setFieldValue('mailMessage', tutorApprovalMessages.fullyApproved);

        mailMessage += `${approveForm.ENDING}`;

        form.setFieldValue('mailMessage', mailMessage);
        handleOk('approved');
    }

    const rejectValidation = () => {
        if (!isRejected) {
            setLoading(true);
            setIsRejected(true);
            form.resetFields(['mailMessage']);
            // form.validateFields(['mailMessage'], { validateOnly: true });
            setTimeout(() => {
                setLoading(false);
            }, 200);
            return false;
        } else {
            if (form.getFieldValue('mailMessage')) {
                handleOk('rejected');
            }
        }
    }


    const handleOk = async (status: string) => {
        setLoading(true); // Set loading state to true when form is submitted
        const submitData = {
            approvedSubjects: acceptedSubject,
            approvedEducations: acceptedDiploma,
            approvedCertificates: acceptedCertificate,
            backgroundDescription: form.getFieldValue('backgroundDescription') ? form.getFieldValue('backgroundDescription') : "",
            videoIntroductionLink: form.getFieldValue('videoIntroductionLink') ? form.getFieldValue('videoIntroductionLink') : "",
        }

        const mailData = {
            email: tutorInfo.email,
            moderatorMessage: form.getFieldValue('mailMessage'),
            approved: true
        }

        try {
            approveTutor(tutorId, status, submitData);
            if (status === 'approved') {
                api.success({
                    message: "Success",
                    description: "Tutor has been approved",
                });
            } else {
                mailData.approved = false;
                api.success({
                    message: "Success",
                    description: "Tutor has been rejected",
                });
            }
        } catch (error) {
            api.error({
                message: "Error",
                description: "Failed to submit tutor approval",
            });
        } finally {
            props.onReload && props.onReload();
            setTimeout(() => {
                setLoading(false);
                setIsFormOpen(false);
            }, 1000);
            sendEmail('', mailData);
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Button type="default" onClick={showModal} style={{ borderRadius: `5px`, fontWeight: `bold` }}>
                Show Info
            </Button>
            <Modal
                centered
                closable={false}
                width={'700px'}
                open={isFormOpen}
                onCancel={handleCancel}
                footer={[<FormStyled.ButtonDiv>
                    <Button key="Cancel"
                        type="default"
                        onClick={handleCancel}
                        style={{ marginRight: '3%', width: '20%' }}>
                        Cancel
                    </Button>
                    <Button
                        key="submit"
                        type="default"
                        htmlType={isRejected ? "submit" : "button"}
                        onClick={rejectValidation}
                        disabled={!agreement}
                        loading={loading}
                        form='verifyTutorForm'
                        style={{
                            marginRight: '3%',
                            width: '35%',
                            fontWeight: `bold`,
                            color: `${theme.colors.error}`
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        key="submit"
                        type="default"
                        htmlType="submit"
                        onClick={approveValidation}
                        disabled={agreement ? isRejected : true}
                        loading={loading}
                        form='verifyTutorForm'
                        style={{
                            marginRight: '2%',
                            width: '35%',
                            fontWeight: `bold`,
                            color: `${theme.colors.success}`
                        }}
                    >
                        Approve
                    </Button>
                </FormStyled.ButtonDiv>,]}
                styles={
                    {
                        content: {
                            borderRadius: '50px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
                        }
                    }}
            >
                <FormStyled.FormWrapper
                    id='verifyTutorForm'
                    labelAlign='left'
                    layout="vertical"
                    requiredMark={false}
                    form={form}
                    size="middle"
                    style={{ rowGap: `0px` }}
                >
                    <Skeleton loading={loading}>
                        {/* <FormStyled.FormTitle style={{ margin: `auto`, marginBottom: `0` }}>Tutor Booking</FormStyled.FormTitle> */}

                        {tutorInfo.avatarUrl ? (
                            <Avatar
                                size={100}
                                src={tutorInfo.avatarUrl}
                                style={{
                                    borderRadius: '15px',
                                    marginRight: '10px',
                                }}
                            />
                        ) : (
                            <Avatar
                                size={100}
                                icon={<UserOutlined />}
                                style={{
                                    borderRadius: '15px',
                                    marginRight: '10px',
                                }}

                            />
                        )}

                        <Col sm={12}>
                            <div>
                                <Styled.ModalStudentInfo
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {tutorInfo.fullName}
                                    <span style={{ color: `${theme.colors.textSecondary}`, fontWeight: `normal` }}>, {tutorInfo.gender}</span>
                                </Styled.ModalStudentInfo>
                                <Styled.ModalStudentInfo
                                    style={{
                                        display: 'block',
                                    }}>
                                    <p>
                                        Date of birth: {new Date(tutorInfo.dateOfBirth).toLocaleDateString()}
                                    </p>
                                    <p>
                                        Email: {tutorInfo.email}
                                    </p>
                                    <p>
                                        Phone: {tutorInfo.phoneNumber}
                                    </p>
                                    <p>
                                        Address: {tutorInfo.address}
                                    </p>

                                </Styled.ModalStudentInfo>

                            </div>
                        </Col>
                    </Skeleton>
                    <Skeleton loading={loading}>
                        <Col sm={24}>
                            <div style={{ display: `flex`, flexWrap: `wrap` }}>
                                <FormItem
                                    name='teachingPricePerHour'
                                    label='Teaching Price Per Hour'
                                    style={{ width: `300px` }}
                                >
                                    <div onClick={() => toggleSwitch('teachingPricePerHour')}>
                                        <span> {tutorInfo.teachingPricePerHour.toLocaleString()} VND/hour </span>
                                    </div>
                                </FormItem>

                                <FormItem
                                    name='meetingLink'
                                    label='Meeting Link'
                                    style={{ width: `50%` }}
                                >
                                    <div>
                                        <span> {tutorInfo.meetingLink} </span>
                                    </div>
                                </FormItem>
                            </div>
                            <FormItem
                                name='videoIntroductionLink'
                                label='Video Introduction'
                            >
                                {tutorInfo.videoIntroductionLink ?
                                    <Clickable>
                                        <Flex onClick={() => toggleSwitch('videoIntroductionLink')}>

                                            <div
                                                style={{
                                                    width: "70%",
                                                    height: "100%",
                                                    marginBottom: `20px`,
                                                    marginTop: `10px`
                                                }}>
                                                <div style={{
                                                    position: 'relative',
                                                    paddingTop: '56.25%',
                                                    width: '100%'
                                                }}>
                                                    <ReactPlayer
                                                        className="react-player"
                                                        url={tutorInfo.videoIntroductionLink}
                                                        controls={true}
                                                        width="100%"
                                                        height="100%"
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <Switch
                                                checkedChildren="Admit"
                                                unCheckedChildren="Deny"
                                                style={{ margin: `auto` }}
                                                checked={switchStates.videoIntroductionLink}
                                                onChange={(checked) => handleAcceptField('videoIntroductionLink', checked)}
                                            />
                                        </Flex>
                                    </Clickable>
                                    : <p style={{ color: `${theme.colors.textSecondary}` }}>Empty</p>}
                            </FormItem>
                            <FormStyled.FormItem
                                name='backgroundDescription'
                                label='Background Description'
                            >
                                {tutorInfo.backgroundDescription ?
                                    <Clickable onClick={() => toggleSwitch('backgroundDescription')}>
                                        <p style={{ marginBottom: `10px` }}> {tutorInfo.backgroundDescription} </p>
                                        <Switch
                                            checkedChildren="Admit"
                                            unCheckedChildren="Deny"
                                            checked={switchStates.backgroundDescription}
                                            onChange={(checked) => handleAcceptField('backgroundDescription', checked)}
                                        />
                                    </Clickable>
                                    : <p style={{ color: `${theme.colors.textSecondary}` }}>Empty</p>}
                            </FormStyled.FormItem>

                            <FormStyled.FormItem
                                name='subjects'
                                label='Subjects'>
                                <div style={{ display: `flex`, flexWrap: `wrap` }}>
                                    {tutorInfo.subjects.map((item: string, index: number) => (
                                        <Clickable key={index}
                                            onClick={() => toggleSubject(item)}

                                            style={{ textAlign: `center` }}
                                        >
                                            <p style={{ marginBottom: `5px` }}>{item}</p>
                                            <Switch
                                                checkedChildren="Admit"
                                                unCheckedChildren="Deny"
                                                checked={switchSubject[item as keyof typeof switchSubject]}
                                                onChange={(checked) => handleAcceptField(item, checked)}
                                            />
                                        </Clickable>
                                    ))}
                                </div>
                            </FormStyled.FormItem>
                        </Col>
                    </Skeleton>

                    <Skeleton loading={loading}>
                        <Col sm={24}>
                            <FormStyled.FormItem
                                name='educations'
                                label='Diploma'
                            >
                                {tutorEducation.map((item: Education, index: number) => (
                                    <EducationVerify education={item}
                                        key={index}
                                        handleFunction={handleAcceptedDiploma} />
                                ))}

                            </FormStyled.FormItem>
                            <FormStyled.FormItem
                                name='certificate'
                                label='Certificate'
                            >
                                {tutorCertification.length !== 0 ? tutorCertification.map((item: Certificate, index: number) => (
                                    <CertificateVerify certificate={item}
                                        key={index}
                                        handleFunction={handleAcceptedCertificate} />
                                )) : <p style={{ color: `${theme.colors.textSecondary}` }}>Empty</p>}

                            </FormStyled.FormItem>
                            <FormStyled.FormItem
                                name='availability'
                                label='Availability'
                            >
                                {schedule ? (<TimeslotVerify schedule={schedule}
                                    toggleSwitch={toggleSchedule}
                                    switchStates={isScheduleAccepted}
                                    handleChange={setIsScheduleAccepted} />)
                                    : <p style={{ color: `${theme.colors.textSecondary}` }}>Empty</p>}
                            </FormStyled.FormItem>

                        </Col>
                        <div style={{
                            textAlign: `center`,
                            margin: `20px`,
                            fontWeight: `bold`
                        }}>
                            <FormStyled.FormCheckbox
                                name='agreement'
                                style={{ margin: `0px`, color: `${theme.colors.black}` }}
                                checked={agreement}
                                defaultChecked={agreement}
                                onChange={(e) => setAgreement(e.target.checked)}
                            >I have carefully checked all the tutor details
                                before submitting my decision</FormStyled.FormCheckbox>

                        </div>

                        {agreement && isRejected && (
                            <><FormStyled.FormItem
                                name='mailMessage'
                                label='Reject reason:'
                                valuePropName="value"
                                rules={[{ required: true, message: 'Please select a reason for your rejection' }]}
                                style={{ marginTop: `-10px` }}
                                validateFirst
                            >
                                <Select
                                    placeholder="Select a reason"
                                    style={{ width: '100%' }}>
                                    {tutorRejectionMessages.map((item, index) => (
                                        <Select.Option key={index} value={item.message}>{item.key}</Select.Option>))}
                                </Select>
                            </FormStyled.FormItem>
                                <Button
                                    type='link'
                                    style={{ color: `${theme.colors.primary}`, textDecoration: 'underline', marginTop: `-5px` }}
                                    onClick={() => { setIsRejected(false); setAgreement(false) }}>
                                    I don't want to reject this application</Button>
                            </>)

                        }
                    </Skeleton>


                </FormStyled.FormWrapper>
            </Modal>
        </>
    );
};

export default TutorInfo;
