import { Avatar, Button, Col, Form, Modal, Skeleton, notification } from "antd";
import { useEffect, useState } from "react";
import * as FormStyled from "../../BecomeTutor/Form.styled";
import * as Styled from '../../../components/QuestionList/Question.styled';
import { UserOutlined } from "@ant-design/icons";
import { getTutorCertification, getTutorEducation } from "../../../utils/tutorAPI";
import { theme } from "../../../themes";
import { Tutor, Education, Certificate } from "../ManageTutor/Tutor.type";
import EducationVerify from "../ManageTutor/DisplayComponents/TutorInfo/EducationVerify";
import CertificateVerify from "../ManageTutor/DisplayComponents/TutorInfo/CertificateVerify";
import { approveDocument, sendEmail } from "../../../utils/moderatorAPI";
import { approveMessages, rejectMessages } from "./emailMessages";
// import iconBachelor from '../../../assets/images/image13.png';
interface TutorInfoProps {
    tutorId: number;
    tutor: Tutor;
    onReload?: () => void;
}7

const TutorDocument: React.FC<TutorInfoProps> = (props) => {
    const { tutorId } = props;
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const tutorInfo = props.tutor; // Tutor info
    const [tutorEducation, setTutorEducation] = useState<Education[]>([]); // Tutor education
    const [tutorCertification, setTutorCertification] = useState<Certificate[]>([]); // Tutor certification
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [agreement, setAgreement] = useState(false);
    const [acceptedDiploma, setAcceptedDiploma] = useState<number[]>([]);
    const [acceptedCertificate, setAcceptedCertificate] = useState<number[]>([]);

    //---------------------- Fetch tutor info ----------------------
    useEffect(() => {
        const fetchTutor = async () => {
            try {
                setLoading(true);

                const education = await getTutorEducation(tutorId, 'false');
                if (education.data) {
                    setTutorEducation(education.data);
                }
                const certificate = await getTutorCertification(tutorId, 'false');
                if (certificate.data) {
                    setTutorCertification(certificate.data);
                }

            } catch (error) {
                api.error({
                    message: "Error",
                    description: "Failed to fetch tutor documents",
                });
            } finally {
                setLoading(false);
            }
        }
        fetchTutor();
    }, [])

    //---------------------- Handle accept field ----------------------

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

    //---------------------- Handle submit form ----------------------

    function showModal() {
        setIsFormOpen(true);
    };

    const approveValidation = () => {
        let type: string;
        if (acceptedDiploma.length === 0 && acceptedCertificate.length === 0) {
            form.setFieldValue('mailMessage', rejectMessages);
            type = 'rejected';
        } else {
            if (acceptedDiploma.length !== tutorEducation.length || acceptedCertificate.length !== tutorCertification.length) {
                form.setFieldValue('mailMessage', approveMessages.partiallyApproved);
            } else {
                form.setFieldValue('mailMessage', approveMessages.fullyApproved);
            }
            type = 'approved';
        }
        handleOk(type);
    }



    const handleOk = async (status: string) => {
        setLoading(true); // Set loading state to true when form is submitted
        const submitData = {
            approvedEducations: acceptedDiploma,
            approvedCertificates: acceptedCertificate,
        }

        const mailData = {
            email: tutorInfo.email,
            moderatorMessage: form.getFieldValue('mailMessage'),
            approved: true
        }

        try {
            await approveDocument(tutorId, submitData);
            if (status === 'rejected') {
                mailData.approved = false;
            }
            api.success({
                message: "Success",
                description: "Document approval has been sent",
            });
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
            sendEmail('document', mailData);
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
                        style={{ marginRight: '3%', width: '35%' }}>
                        Cancel
                    </Button>
                    {/* <Button
                        key="submit"
                        type="default"
                        htmlType="submit"
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
                    </Button> */}
                    <Button
                        key="submit"
                        type="default"
                        htmlType="submit"
                        onClick={approveValidation}
                        disabled={!agreement}
                        loading={loading}
                        form='verifyTutorForm'
                        style={{
                            marginRight: '2%',
                            width: '65%',
                            fontWeight: `bold`,
                            color: `${theme.colors.primary}`
                        }}
                    >
                        Submit
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
                    style={{ rowGap: `10px` }}
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

                                </Styled.ModalStudentInfo>

                            </div>
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
                            >I have carefully checked the tutor documents
                                before submitting my decision</FormStyled.FormCheckbox>

                        </div>


                    </Skeleton>

                </FormStyled.FormWrapper>
            </Modal>
        </>
    );
};

export default TutorDocument;
