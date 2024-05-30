import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from './VerifyCode.styled';

import AuthForm from '../../components/AuthForm';
import { PageEnum } from '../../utils/enums';
import config from '../../config';
import { Typography, message } from 'antd';
import { postOTP, resendOTP } from '../../utils/authAPI';
import { verifyCodeFields } from '../../components/AuthForm/AuthForm.fields';
import { useDocumentTitle } from '../../hooks';
import { MAX_COUNTDOWN_TIME } from '../../config/constants';
const { Text } = Typography;


const VerifyCode = () => {
    useDocumentTitle('Verify Email | MyTutor');

    const [messageApi, contextHolder] = message.useMessage();

    const location = useLocation();
    const navigate = useNavigate();

    const { email } = location.state || {};
    const [seconds, setSeconds] = useState(0);

    // Check email before verify
    useEffect(() => {
        if (!email) {
            message.error('Email is required to verify OTP');
            navigate(config.routes.public.login);
        }
    }, [email, navigate]);

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


    const onResend = async () => {
        const newValues = {
            email,
        }
        try {
            setSeconds(MAX_COUNTDOWN_TIME);
            localStorage.setItem(config.localStorage.seconds, MAX_COUNTDOWN_TIME.toString());

            //Fetch API
            const { data } = await resendOTP(newValues.email);
            if (!data) {
                throw new Error('Network response was not ok');
            } else {
                messageApi.success(`OTP send to '${data}'`);
            }

        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                messageApi.error('Please ENTER your OTP');
            } else if (error.response) {
                messageApi.error(error.response.data);
            } else {
                messageApi.error(error.message);
            }
        }
    }
    const onFinish = async (values: any) => {
        const newValues = {
            email,
            otp: values.otp
        }
        try {
            const { data } = await postOTP(newValues.email, newValues.otp);
            if (!data) {
                throw new Error('Network response was not ok');
            } else {
                messageApi.success(data);
                setTimeout(() => {
                    navigate(config.routes.public.login);
                }, 2000);
            }
        } catch (error: any) {
            if (error.response) {
                messageApi.error(error.response.data);
            } else {
                messageApi.error(error.message);
            }
        }
    }


    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };
    const description = (
        <Styled.ResendCodeDescWrapper>
            <Styled.ResendCodeText>
                {seconds !== 0 && (
                    <Text>
                        Enter the OTP received to verify email. Resend after
                        <Styled.ResendCodeCountdown>{seconds}</Styled.ResendCodeCountdown>s
                    </Text>
                )}
            </Styled.ResendCodeText>
        </Styled.ResendCodeDescWrapper>
    );

    const redirect = {
        description: 'Back to login?',
        title: 'Login Now',
        url: config.routes.public.login,
    };

    return (
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.VERIFY_EMAIL}
                formTitle="Enter OTP Code"
                buttonTitle="Verify OTP"
                OTPFields={verifyCodeFields}
                redirect={redirect}
                reverse
                description={description}
                onFinish={onFinish}
                onResend={onResend}
                onFinishFailed={onFinishFailed}
                isSubmitting={seconds !== 0}
                fields={[]}
            />
        </>
    );
};

export default VerifyCode;
