import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';
import { registerFields } from '../../components/AuthForm/AuthForm.fields';
import config from '../../config';
import { register } from '../../utils/authAPI';
import { PageEnum } from '../../utils/enums';
import { useDocumentTitle } from '../../hooks';

const Register = () => {
    useDocumentTitle('Register | MyTutor');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);

            const { data } = await register(values);
            if (!data) {
                throw new Error('Network response was not ok');
            } else {
                messageApi.success(`Verify your email: ${data.email}`);
                setTimeout(() => {
                    navigate(config.routes.public.verifyCode, { state: { email: values.email } });
                }, 2000);
            }
        } catch (error: any) {
            if (error.response) {
                messageApi.error(error.response.data);
            } else {
                messageApi.error(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const redirect = {
        description: 'Already have an account?',
        title: 'Log in',
        url: config.routes.public.login,
    };

    return (
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.REGISTER}
                formTitle="Register"
                buttonTitle="Register"
                fields={registerFields}
                redirect={redirect}
                onFinish={onFinish}
                reverse
                isSubmitting={isSubmitting}
                OTPFields={[]}
            />
        </>
    );
};

export default Register;
