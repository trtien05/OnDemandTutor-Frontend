import AuthForm from '../../components/AuthForm';
import { Typography } from 'antd';
import styled from 'styled-components';
import { theme } from '../../themes';

const { Paragraph, Text } = Typography;

export const AuthFormStyled = styled(AuthForm)`
    & h1.ant-typography {
        text-align: left;
    }

    & .ant-form-item:last-child {
        margin-top: 0;
    }
`;

export const ForgotPasswordDescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-bottom: 24px;
`;

export const ForgotPasswordDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.73333;
    }
`;

export const ForgotPasswordText = styled(Paragraph)`
    display: flex;
    align-items: center;
    column-gap: 4px;

    &.ant-typography,
    & .ant-typography,
    & .ant-statistic-content {
        margin-bottom: 0;
        color: ${theme.colors.textSecondary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 2;
    }

    & .ant-typography {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const ForgotPasswordCountdown = styled(Text)`
    &.ant-typography {
        margin-left: 4px;
        color: ${theme.colors.primary};
    }
`;
