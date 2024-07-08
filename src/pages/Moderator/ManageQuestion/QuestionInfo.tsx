import { notification, Skeleton } from 'antd';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Form } from 'antd';
import { theme } from '../../../themes';
import * as FormStyled from '../../../pages/BecomeTutor/Form.styled';
import { Question } from '../../../components/QuestionList/Question.type';

interface QuestionInfoProps {
    question: Question;
    onReload: () => void;
}

const QuestionInfo:React.FC<QuestionInfoProps> = (props) => {
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
                        //onClick={rejectValidation}
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
                        //onClick={approveValidation}
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
                        <p>{props.question.content}</p>
                    </Skeleton>


                </FormStyled.FormWrapper>
            </Modal>
        </>
    );
}

export default QuestionInfo