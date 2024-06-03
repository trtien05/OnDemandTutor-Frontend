import * as FormStyled from './AuthForm.styled';

import { Col, Typography } from 'antd';
import images, { fallbackImg } from './AuthForm.images';

import Container from '../../components/Container';
import { FcGoogle } from 'react-icons/fc';
import { FieldType } from './AuthForm.fields';
import { LOGIN_GOOGLE_URL } from '../../config/constants';
import Link from '../../components/Link';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { PageEnum } from '../../utils/enums';
import config from '../../config'
const { Text } = Typography;

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
    description?: JSX.Element;
    redirect: RedirectType;
    onFinish?: (values: unknown) => void;
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
    description,
    redirect,
    onFinish,
    onFinishFailed,
    reverse = false,
    isSubmitting = false,
}: AuthFormProps) => (
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
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            requiredMark={false}
                            autoComplete="off"
                        >
                            {fields.map((field) => (
                                <FormStyled.FormItem
                                    key={field.key}
                                    label={field.label}
                                    name={field.name}
                                    rules={field.rules}
                                    validateFirst
                                >
                                    {field.children}
                                </FormStyled.FormItem>
                            ))}

                            <FormStyled.FormItem>
                                <FormStyled.FormButton
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <Loading3QuartersOutlined spin={true} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : buttonTitle}
                                </FormStyled.FormButton>
                            </FormStyled.FormItem>
                        </FormStyled.FormWrapper>

                        <FormStyled.FormGoogleButton to={LOGIN_GOOGLE_URL}>
                            <FcGoogle />
                            <Text>Tiếp Tục Với Google</Text>
                        </FormStyled.FormGoogleButton>

                        <FormStyled.FormRedirect>
                            {redirect.description}

                            <Link to={redirect.url} underline scroll zoom>
                                {redirect.title}
                            </Link>
                        </FormStyled.FormRedirect>

                        {page === PageEnum.LOGIN && (
                            <FormStyled.FormForgotPassword to={config.routes.public.forgotPassword}>
                                Quên mật khẩu?
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

export default AuthForm;
