import { message, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { loginFields } from '../../components/AuthForm/AuthForm.fields';
import config from '../../config';
import { login } from '../../utils/authAPI';
import cookieUtils from '../../utils/cookieUtils';
import { PageEnum } from '../../utils/enums';
import { useDocumentTitle } from '../../hooks';
import * as Styled from './Login.styled';
import Link from '../../components/Link';

const Login = () => {
    useDocumentTitle('Log In | MyTutor');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();
    const { Text } = Typography;
    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);

            const { data } = await login(values);
            if (!data) {
                throw new Error('Network response was not ok');
            } else {
                const { accessToken } = data;
                cookieUtils.setItem(config.cookies.token, accessToken);
                messageApi.success('Logged in successfully');
                setTimeout(() => {
                    navigate(config.routes.public.home);
                }, 2000);
            }
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data.message);
            else messageApi.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const redirect = {
        description: 'Don’t have an account?',
        title: 'Register',
        url: config.routes.public.register,
    };
    const description = (
        <Styled.LoginDesc>
            With
            <Link to={config.routes.public.home} underline scroll>
                <Text>My Tutor</Text>,
            </Link>
            everything is easier. Start now.
        </Styled.LoginDesc>
    );

    return (
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.LOGIN}
                formTitle="Log In"
                buttonTitle="Log In"
                description={description}
                fields={loginFields}
                redirect={redirect}
                onFinish={onFinish}
                isSubmitting={isSubmitting}
                OTPFields={[]}
            />
        </>
    );
};

export default Login;
