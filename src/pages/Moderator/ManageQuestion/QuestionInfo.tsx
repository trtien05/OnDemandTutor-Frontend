import { Avatar, Col, notification, Select, Skeleton } from 'antd';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Form } from 'antd';
import { theme } from '../../../themes';
import { ButtonDiv, FormCheckbox, FormItem, FormWrapper } from '../../../pages/BecomeTutor/Form.styled';
import * as Styled from '../../../components/QuestionList/Question.styled';
import { Question } from '../../../components/QuestionList/Question.type';
import { UserOutlined } from '@ant-design/icons';
import iconBachelor from '../../../assets/images/image13.png';
import FileViewer from '../../../components/FileViewer/FileViewer';
import { approveQuestion, sendEmail } from '../../../utils/moderatorAPI';
import { questionApprovalMessages, questionRejectionMessages } from './emailMessage';

interface QuestionInfoProps {
    question: Question;
    onReload: () => void;
}

const QuestionInfo: React.FC<QuestionInfoProps> = (props) => {
    const item = props.question;
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agreement, setAgreement] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    function showModal() {
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    const rejectValidation = () => {
        if (!isRejected) {
            setLoading(true);
            setIsRejected(true);
            form.resetFields(['mailMessage']);
            setTimeout(() => {
                setLoading(false);
            }, 200);
            return false;
        } else {
            if (form.getFieldValue('mailMessage')) {
                console.log('rejected',form.getFieldValue('mailMessage'));
                handleOk('rejected');
            }
        }
    }

    const onApprove = () => {
        form.resetFields(['mailMessage']);
        form.setFieldValue('mailMessage', questionApprovalMessages);
        console.log('approved',form.getFieldValue('mailMessage'));
        handleOk('unsolved');
    }

    const handleOk = async (status: string) => {
        setLoading(true); // Set loading state to true when form is submitted

        const mailData = {
            email: item.account.email,
            moderatorMessage: form.getFieldValue('mailMessage'),
            approved: true
        }

        try {
            approveQuestion(item.id, status);
            if (status === 'unsolved') {
                api.success({
                    message: "Success",
                    description: "Question has been approved",
                });
            } else {
                mailData.approved = false;
                api.success({
                    message: "Success",
                    description: "Question has been rejected",
                });
            }
        } catch (error) {
            api.error({
                message: "Error",
                description: "Failed to submit question approval",
            });
        } finally {
            props.onReload && props.onReload();
            setTimeout(() => {
                setLoading(false);
                setIsFormOpen(false);
            }, 1000);
            sendEmail('question', mailData);
        }
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
                footer={[<ButtonDiv>
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
                        form='verifyQuestionForm'
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
                        onClick={onApprove}
                        disabled={agreement ? isRejected : true}
                        loading={loading}
                        form='verifyQuestionForm'
                        style={{
                            marginRight: '2%',
                            width: '35%',
                            fontWeight: `bold`,
                            color: `${theme.colors.success}`
                        }}
                    >
                        Approve
                    </Button>
                </ButtonDiv>,]}
                styles={
                    {
                        content: {
                            borderRadius: '50px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
                        }
                    }}
            >

                <Skeleton loading={loading}>
                    {/* <FormStyled.FormTitle style={{ margin: `auto`, marginBottom: `0` }}>Tutor Booking</FormStyled.FormTitle> */}
                    <Col sm={24}>
                        <Styled.ModalStudentInfo>
                            <Col sm={3}>
                                {item.account.avatarUrl ? (
                                    <Avatar
                                        size={55}
                                        src={item.account.avatarUrl}
                                        style={{
                                            borderRadius: '15px',
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

                            </Col>
                            <Col sm={21}>
                                <div>
                                    <Styled.ModalStudentInfo
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {item.account.fullName}
                                    </Styled.ModalStudentInfo>
                                    <Styled.ModalStudentInfo
                                        style={{
                                            display: 'inline',
                                        }}
                                    >
                                        <Styled.BachelorImage src={iconBachelor} alt="bachelor" />
                                        <Styled.QuestionRowSpan>
                                            {item.subjectName}
                                        </Styled.QuestionRowSpan>
                                        <Styled.QuestionRowSpan>
                                            Modified:{' '}
                                            {new Date(item.modifiedAt!).toISOString().split('T')[0]}
                                        </Styled.QuestionRowSpan>
                                        <Styled.QuestionRowSpan>
                                            <Styled.Button>{item.status}</Styled.Button>
                                        </Styled.QuestionRowSpan>
                                    </Styled.ModalStudentInfo>
                                </div>
                            </Col>
                        </Styled.ModalStudentInfo>
                    </Col>
                    <FormWrapper
                        id='verifyQuestionForm'
                        labelAlign='left'
                        layout="vertical"
                        requiredMark={false}
                        form={form}
                        size="middle"
                        style={{ rowGap: `0px` }}>
                            <Col sm={24}>
                        <Styled.QuestionRow>
                            <Styled.Name level={2}>{item.title}</Styled.Name>
                        </Styled.QuestionRow>
                        <Styled.Description>{item.content}</Styled.Description>
                        <Styled.QuestionRow style={{ justifyContent: `center` }}>
                            {item.questionUrl && (
                                <Styled.QuestionRowSpan>
                                    <FileViewer alt={item.title}
                                        fileUrl={item.questionUrl}
                                        width='500px'
                                        borderRadius='25px'
                                    />
                                </Styled.QuestionRowSpan>
                            )}
                        </Styled.QuestionRow>
                        <div style={{
                            textAlign: `center`,
                            margin: `20px`,
                            fontWeight: `bold`
                        }}>
                            <FormCheckbox
                                name='agreement'
                                style={{ margin: `0px`, color: `${theme.colors.black}` }}
                                checked={agreement}
                                defaultChecked={agreement}
                                onChange={(e) => setAgreement(e.target.checked)}
                            >I have carefully read all related information in this question</FormCheckbox>

                        </div>

                        {agreement && isRejected && (
                            <><FormItem
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
                                    {questionRejectionMessages.map((item, index) => (
                                        <Select.Option key={index} value={item.message}>{item.key}</Select.Option>))}
                                </Select>
                            </FormItem>
                                <Button
                                    type='link'
                                    style={{ color: `${theme.colors.primary}`, textDecoration: 'underline', marginTop: `-5px` }}
                                    onClick={() => { setIsRejected(false); setAgreement(false) }}>
                                    I don't want to reject this question</Button>
                            </>)

                        }
                        </Col>
                    </FormWrapper>
                </Skeleton>
            </Modal>
        </>
    );
}

export default QuestionInfo