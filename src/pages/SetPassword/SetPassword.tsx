import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';
import { PageEnum } from '../../utils/enums';
import { SetPasswordDesc } from './SetPassword.styled';
import config from '../../config';
import { message } from 'antd';
// import { resetPassword } from '../../utils/authAPI';
import { setPasswordFields } from '../../components/AuthForm/AuthForm.fields';
import { useDocumentTitle } from '../../hooks';

const SetPassword = () => {
    useDocumentTitle('Thiết Lập Mật Khẩu | HouseMate');

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get token from URL
    let location = useLocation();
    const UrlParams = new URLSearchParams(location.search);
    const token = UrlParams.get('token');

    // Check token not exist in URL
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) navigate(config.routes.public.home);
    }, [token]);

    // Message toast
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);

            if (token == null) return;

            // Fetch API
            const requestData = { token, password: values.password };
            // const { data } = await resetPassword(requestData);
            // messageApi.success(data);

            // Navigate to login page
            setTimeout(() => navigate(config.routes.public.login), 3000);
        } catch (err: any) {
            if (err.response) messageApi.error(err.response.data);
            else messageApi.error(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    const redirect = {
        description: 'Back to login?',
        title: 'Login Now',
        url: config.routes.public.login,
    };

    const description = (
        <SetPasswordDesc>
            Must be 8 or more characters include a number, an uppercase letter, and a lowercase
            letter.
        </SetPasswordDesc>
    );

    return (
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.SET_PASSWORD}
                formTitle="Set new password"
                buttonTitle="Reset password"
                fields={setPasswordFields}
                description={description}
                redirect={redirect}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default SetPassword;
