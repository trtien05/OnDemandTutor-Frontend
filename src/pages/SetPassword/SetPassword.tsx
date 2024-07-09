import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';
import { PageEnum } from '../../utils/enums';
import { SetPasswordDesc } from './SetPassword.styled';
import config from '../../config';
import { message } from 'antd';
import { resetPassword } from '../../utils/authAPI';
import { setPasswordFields } from '../../components/AuthForm/AuthForm.fields';
import { useDocumentTitle } from '../../hooks';

const SetPassword = () => {
    useDocumentTitle('Set New Password | MyTutor');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { email } = location.state || {};

    // Message toast
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            const newValues = {
                email,
                password: values.password,
            }
            setIsSubmitting(true);

            // Fetch API
            const { data } = await resetPassword(newValues);
            messageApi.success(data);

            // Navigate to login page
            setTimeout(() => navigate(config.routes.public.login), 2000);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                messageApi.error('Fail to reset password');
            } else if (error.response) {
                messageApi.error(error.response.data);
            } else {
                messageApi.error(error.message);
            }
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
                OTPFields={[]}
            />
        </>
    );
};

export default SetPassword;
