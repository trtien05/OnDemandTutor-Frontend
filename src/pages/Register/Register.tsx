import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';
import { registerFields } from '../../components/AuthForm/AuthForm.fields';
import config from '../../config';
// import { register } from '../../utils/authAPI';
import cookieUtils from '../../utils/cookieUtils';
import { PageEnum } from '../../utils/enums';
import { useDocumentTitle } from '../../hooks';

const Register = () => {
    useDocumentTitle('Đăng Ký | HouseMate');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);

            // const { data } = await register(values);

            // cookieUtils.setItem(config.cookies.token, data);
            navigate(config.routes.public.home);
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);
            else messageApi.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const redirect = {
        description: 'Đã có tài khoản?',
        title: 'Đăng nhập ngay',
        url: config.routes.public.login,
    };

    return (
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.REGISTER}
                formTitle="Đăng ký"
                buttonTitle="Đăng Ký"
                fields={registerFields}
                redirect={redirect}
                onFinish={onFinish}
                reverse
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default Register;
