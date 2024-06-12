import * as FormStyled from './AuthForm.styled';
import { Col } from 'antd';
import images, { fallbackImg } from './AuthForm.images';
import Container from '../../components/Container';
import { FieldType, OTPFieldType } from './AuthForm.fields';
import Link from '../../components/Link';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { PageEnum } from '../../utils/enums';
import config from '../../config'
import GoogleLogin from '../../components/AuthForm/GoogleLogin';

type RedirectType = {
    description: string;
    title: string;
    url: string;
};

type AuthFormProps = {
    className?: string;
    page: string;
    formTitle: string;
    buttonTitle: string;
    fields: FieldType[];
    OTPFields: OTPFieldType[];
    description?: JSX.Element;
    redirect: RedirectType;
    onFinish?: (values: unknown) => void;
    onResend?: (values: unknown) => void;
    onGoogleSignIn?: (values: unknown) => void;
    onFinishFailed?: (values: unknown) => void;
    reverse?: boolean;
    isSubmitting?: boolean;
};

const AuthForm = ({
    className,
    page,
    formTitle,
    buttonTitle,
    fields,
    OTPFields,
    description,
    redirect,
    onFinish,
    onResend,
    onGoogleSignIn,
    onFinishFailed,
    reverse = false,
    isSubmitting = false,
}: AuthFormProps) => {

    const handleFinish = (values: any) => {
        let otp = '';
        for (let i = 0; i < Object.keys(values).length; i++) {
            otp += values['otp' + i];
        }
        let result = { otp: otp };
        if (onFinish) {
            onFinish(result);
        }
    };

    const formFinishHandler = page === PageEnum.VERIFY_EMAIL ? handleFinish : onFinish;

    return (
        <Container>
            <FormStyled.AuthForm className={className}>
                <FormStyled.FormRow
                    align="middle"
                    style={{
                        flexDirection: reverse ? 'row-reverse' : 'row',
                    }}
                >
                    <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <FormStyled.FormContainer>
                            <FormStyled.FormTitle level={1}>{formTitle}</FormStyled.FormTitle>
                            {description}

                            <FormStyled.FormWrapper
                                onFinish={formFinishHandler}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                requiredMark={false}
                                autoComplete="off"
                            >
                                {page === PageEnum.VERIFY_EMAIL ? (
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                        {OTPFields.map((field) => (
                                            <FormStyled.FormItemOTP
                                                key={field.key}
                                                name={field.name}
                                                validateFirst
                                            >
                                                {field.children}
                                            </FormStyled.FormItemOTP>
                                        ))}
                                    </div>
                                ) : (
                                    fields.map((field) => (
                                        <FormStyled.FormItem
                                            key={field.key}
                                            label={field.label}
                                            name={field.name}
                                            rules={field.rules}
                                            validateFirst
                                        >
                                            {field.children}
                                        </FormStyled.FormItem>
                                    ))
                                )}

                                <FormStyled.FormItem>
                                    <FormStyled.FormButton
                                        block
                                        type="primary"
                                        htmlType="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <Loading3QuartersOutlined spin={true} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : buttonTitle}
                                    </FormStyled.FormButton>

                                    {page === PageEnum.VERIFY_EMAIL && (
                                        <FormStyled.FormButtonResendCode
                                            block
                                            type="primary"
                                            onClick={onResend}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? <Loading3QuartersOutlined spin={true} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : 'Resend OTP Code'}
                                        </FormStyled.FormButtonResendCode>
                                    )}
                                </FormStyled.FormItem>
                            </FormStyled.FormWrapper>



                            {page === PageEnum.LOGIN && (
                                < GoogleLogin onGoogleSignIn={onGoogleSignIn} />
                            )}



                            <FormStyled.FormRedirect>
                                {redirect.description}

                                <Link to={redirect.url} underline scroll zoom>
                                    {redirect.title}
                                </Link>
                            </FormStyled.FormRedirect>

                            {page === PageEnum.LOGIN && (
                                <FormStyled.FormForgotPassword to={config.routes.public.forgotPassword}>
                                    Forgotten your password?
                                </FormStyled.FormForgotPassword>
                            )}
                        </FormStyled.FormContainer>
                    </Col>

                    <Col lg={{ span: 12 }} sm={{ span: 0 }} xs={{ span: 0 }}>
                        <FormStyled.FormCarousel autoplay>
                            {images.map((image) => (
                                <FormStyled.FormImageWrapper key={image.id}>
                                    <FormStyled.FormImageOverlay />

                                    <FormStyled.FormImage
                                        width="100%"
                                        height={652}
                                        src={image.src}
                                        alt="Form Carousel"
                                        preview={false}
                                        fallback={fallbackImg}
                                    />
                                </FormStyled.FormImageWrapper>
                            ))}
                        </FormStyled.FormCarousel>
                    </Col>
                </FormStyled.FormRow>
            </FormStyled.AuthForm>
        </Container>
    );
}



export default AuthForm;
