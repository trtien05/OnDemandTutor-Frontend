import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { loginFields } from '../../components/AuthForm/AuthForm.fields';
import config from '../../config';
import { login } from '../../utils/authAPI';
import cookieUtils from '../../utils/cookieUtils';
import { PageEnum } from '../../utils/enums';
import { useDocumentTitle } from '../../hooks';

const Login = () => {
    useDocumentTitle('Log In | MyTutor');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);

            const { data } = await login(values);
            const { accessToken } = data;
            cookieUtils.setItem(config.cookies.token, accessToken);
            console.log(accessToken)
            navigate(config.routes.public.home);
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);

            // if (error.response) messageApi.error();
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


    return (
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.LOGIN}
                formTitle="Log In"
                buttonTitle="Log In"
                fields={loginFields}
                redirect={redirect}
                onFinish={onFinish}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default Login;
