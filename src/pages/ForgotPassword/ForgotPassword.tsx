import * as Styled from './ForgotPassword.styled';
import { Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { MAX_COUNTDOWN_TIME } from '../../config/constants';
import { PageEnum } from '../../utils/enums';
import config from '../../config';
import { forgotPassword } from '../../utils/authAPI';
import { forgotPasswordFields } from '../../components/AuthForm/AuthForm.fields';
import { useDocumentTitle } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ForgotPassword = () => {
    useDocumentTitle('Forgot Password | MyTutor');
    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(0);

    // Handle countdown
    useEffect(() => {
        const timerId = setInterval(() => {
            if (seconds <= 0) return;

            setSeconds((prevSeconds) => {
                const updatedSeconds = prevSeconds - 1;
                localStorage.setItem(config.localStorage.seconds, updatedSeconds.toString());
                return updatedSeconds;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [seconds]);

    // Check if seconds already in localStorage
    useEffect(() => {
        const storedSeconds = localStorage.getItem(config.localStorage.seconds);
        if (storedSeconds) setSeconds(parseInt(storedSeconds));
    }, []);

    // Message toast
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setSeconds(MAX_COUNTDOWN_TIME);
            localStorage.setItem(config.localStorage.seconds, MAX_COUNTDOWN_TIME.toString());
            // Fetch API
            const { data } = await forgotPassword(values);

            if (!data) {
                throw new Error('Network response was not ok');
            } else {
                messageApi.success(`Verify your email: ${data.email}`);
                setTimeout(() => {
                    navigate(config.routes.public.verifyCode, { state: { email: values.email, status: data.status } });
                }, 2000);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                messageApi.error('Account not found');
            } else if (error.response) {
                messageApi.error(error.response.data);
            } else {
                messageApi.error(error.message);
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const redirect = {
        description: 'Return to login?',
        title: 'Log In',
        url: config.routes.public.login,
    };

    const description = (
        <Styled.ForgotPasswordDescWrapper>
            <Styled.ForgotPasswordText>
                {seconds !== 0 && (
                    <Text>
                        Not receiving emails? Resend after
                        <Styled.ForgotPasswordCountdown>{seconds}</Styled.ForgotPasswordCountdown>s
                    </Text>
                )}
            </Styled.ForgotPasswordText>
        </Styled.ForgotPasswordDescWrapper>
    );

    return (
        <>
            {contextHolder}
            <Styled.AuthFormStyled
                page={PageEnum.FORGOT_PASSWORD}
                formTitle="Forgot Password?"
                buttonTitle="Reset Password"
                fields={forgotPasswordFields}
                description={description}
                redirect={redirect}
                isSubmitting={seconds !== 0}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                OTPFields={[]}
            />
        </>
    );
};

export default ForgotPassword;
