import { Avatar, Button, Col, Flex, Form, Input, Modal, Switch, notification } from "antd";
import { useEffect, useState } from "react";
import * as FormStyled from "../../../../BecomeTutor/Form.styled";
import * as Styled from '../../../../../components/QuestionList/Question.styled';
import { UserOutlined } from "@ant-design/icons";
import { getTutorById, getTutorEducation } from "../../../../../utils/tutorAPI";
import { theme } from "../../../../../themes";
import { Tutor, Education } from "../../Tutor.type";
import ReactPlayer from "react-player";
import { Clickable, FormItem } from "./TutorInfo.styled"
import EducationVerify from "./EducationVerify";
// import iconBachelor from '../../../assets/images/image13.png';
interface TutorInfoProps {
    tutorId: number;
    tutor: Tutor;
}

const TutorInfo: React.FC<TutorInfoProps> = (props) => {
    const { tutorId } = props;
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [tutorInfo, setTutorInfo] = useState(props.tutor); // Tutor info
    const [tutorEducation, setTutorEducation] = useState<Education[]>([]); // Tutor education
    const [certification, setTutorCertification] = useState<any>([]); // Tutor certification
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    // const initialValues = tutorInfo;
    const [switchStates, setSwitchStates] = useState({
        teachingPricePerHour: false,
        meetingLink: false,
        videoIntroductionLink: false,
        backgroundDescription: false,
    });

    const [acceptedDiploma, setAcceptedDiploma] = useState<number[]>([]);


    useEffect(() => {
        const fetchTutor = async () => {
            try {
                const response = await getTutorEducation(tutorId);
                if (response.data) {
                    setTutorEducation(response.data);
                }
            } catch (error) {
                api.error({
                    message: "Error",
                    description: "Failed to fetch tutor info",
                });
            }
        }
        fetchTutor();
    }, [])

    const handleAcceptField = (fieldName: string, checked: boolean) => {
        if (checked) {
            const value = tutorInfo[fieldName as keyof Tutor];
            form.setFieldsValue({ [fieldName]: value });
        } else form.setFieldsValue({ [fieldName]: null });
        setSwitchStates((prevState) => ({ ...prevState, [fieldName]: checked }));
    }

    const handleAcceptedDiploma = (id: number, checked: boolean) => {
        if (checked) {
            setAcceptedDiploma((prevState) => [...prevState, id]);
        } else {
            setAcceptedDiploma((prevState) => prevState.filter((item) => item !== id));
        }
    }

    const toggleSwitch = (fieldName: string) => {
        const currentValue = form.getFieldValue(fieldName);
        handleAcceptField(fieldName, !currentValue);
        console.log(acceptedDiploma)

    };

    function showModal() {
        setIsFormOpen(true);
    };


    const handleOk = async () => {
        // setLoading(true); // Set loading state to true when form is submitted
        console.log(form.getFieldsValue())
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={showModal} style={{ borderRadius: `50px`, fontWeight: `bold` }}>
                Book this tutor
            </Button>
            <Modal
                centered
                closable={false}
                width={'700px'}
                open={isFormOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[<FormStyled.ButtonDiv>
                    <Button key="Cancel" type="default" onClick={handleCancel} style={{ marginRight: '5%', width: '45%' }}>
                        Cancel
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        onClick={handleOk}
                        loading={loading}
                        form='verifyTutorForm'
                        style={{ marginRight: '2%', width: '45%' }}
                    >
                        Send
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
                    {/* <FormStyled.FormTitle style={{ margin: `auto`, marginBottom: `0` }}>Tutor Booking</FormStyled.FormTitle> */}

                    {tutorInfo.avatarUrl ? (
                        <Avatar
                            size={55}
                            src={tutorInfo.avatarUrl}
                            style={{
                                borderRadius: '15px',
                                marginRight: '10px',
                            }}
                        />
                    ) : (
                        <Avatar
                            size={55}
                            icon={<UserOutlined />}
                            style={{
                                borderRadius: '15px',
                            }}

                        />
                    )}

                    <Col sm={24}>
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
                                {/* <Styled.QuestionRowSpan>
                                        Uploaded:{' '}
                                        {new Date(item.createdAt!).toISOString().split('T')[0]}
                                    </Styled.QuestionRowSpan> */}
                                <p>
                                    Phone: {tutorInfo.phoneNumber}
                                </p>
                                <p>
                                    Address: {tutorInfo.address}
                                </p>

                            </Styled.ModalStudentInfo>
                            <FormItem
                                name='teachingPricePerHour'
                                label='Teaching Price Per Hour'
                            >
                                <div onClick={() => toggleSwitch('teachingPricePerHour')}>
                                    <span> {tutorInfo.teachingPricePerHour} VND/hour </span>
                                    <Switch
                                        checkedChildren="Accepted"
                                        unCheckedChildren="Rejected"
                                        checked={switchStates.teachingPricePerHour}
                                        onChange={(checked) => handleAcceptField('teachingPricePerHour', checked)}
                                    /> </div>
                            </FormItem>

                            <FormItem
                                name='meetingLink'
                                label='Meeting Link'
                            >
                                <div onClick={() => toggleSwitch('meetingLink')}>
                                    <span> {tutorInfo.meetingLink} </span>
                                    <Switch
                                        checkedChildren="Accepted"
                                        unCheckedChildren="Rejected"
                                        checked={switchStates.meetingLink}
                                        onChange={(checked) => handleAcceptField('meetingLink', checked)}
                                    /> </div>
                            </FormItem>
                            <FormItem
                                name='videoIntroductionLink'
                                label='Video Introduction Link'
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
                                        checkedChildren="Accepted"
                                        unCheckedChildren="Rejected"
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
                                    <Clickable>
                                        <span> {tutorInfo.backgroundDescription} </span>
                                        <Switch
                                            checkedChildren="Accepted"
                                            unCheckedChildren="Rejected"
                                            // checked={isAccepted}
                                            onChange={(checked) => handleAcceptField('backgroundDescription', checked)}
                                        />
                                    </Clickable>
                                    : <p style={{ color: `${theme.colors.textSecondary}` }}>Empty</p>}
                            </FormStyled.FormItem>

                        </div>
                    </Col>
                    <Col sm={24}>
                        <FormStyled.FormItem
                            name='education'
                            label='Diploma'
                        >
                            {tutorEducation.map((item: Education, index: number) => (
                                <EducationVerify education={item} 
                                    key={index} 
                                    handleFunction={handleAcceptedDiploma} />
                                ))}

                        </FormStyled.FormItem>
                    </Col>
                </FormStyled.FormWrapper>
            </Modal>
        </>
    );
};

export default TutorInfo;
