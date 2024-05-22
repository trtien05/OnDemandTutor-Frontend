import * as Styled from './ForgotPassword.styled';

import { Typography, message } from 'antd';
import { useEffect, useState } from 'react';

import { MAX_COUNTDOWN_TIME } from '../../config/constants';
import { PageEnum } from '../../utils/enums';
import config from '../../config';
// import { forgotPassword } from '@/utils/authAPI';
import { forgotPasswordFields } from '../../components/AuthForm/AuthForm.fields';
import { useDocumentTitle } from '../../hooks';

const { Text } = Typography;

const ForgotPassword = () => {
    useDocumentTitle('Quên Mật Khẩu | HouseMate');

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
            // const { data } = await forgotPassword(values);
            // messageApi.success(data);
        } catch (err: any) {
            if (err.response) messageApi.error(err.response.data);
            else messageApi.error(err.message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const redirect = {
        description: 'Trở về đăng nhập?',
        title: 'Đăng nhập ngay',
        url: config.routes.public.login,
    };

    const description = (
        <Styled.ForgotPasswordDescWrapper>
            <Styled.ForgotPasswordDesc>
                Nhập email của bạn để nhận hướng dẫn cài lại mật khẩu.
            </Styled.ForgotPasswordDesc>

            <Styled.ForgotPasswordText>
                {seconds !== 0 && (
                    <Text>
                        Không nhận được email? Gửi lại sau
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
                formTitle="Quên mật khẩu?"
                buttonTitle="Cài Lại Mật Khẩu"
                fields={forgotPasswordFields}
                description={description}
                redirect={redirect}
                isSubmitting={seconds !== 0}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
        </>
    );
};

export default ForgotPassword;
