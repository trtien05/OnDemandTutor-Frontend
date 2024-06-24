import { theme } from '../../themes';
import { Typography } from 'antd';
import styled from 'styled-components';
const { Paragraph, Text } = Typography;

export const SetPasswordDesc = styled(Text)`
    margin-bottom: 24px;
    color: ${theme.colors.textSecondary};
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.85714;
`;
export const ResendCodeDescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-bottom: 10px;
`;

export const ResendCodeDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.73333;
    }
`;

export const ResendCodeText = styled(Paragraph)`
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

export const ResendCodeCountdown = styled(Text)`
    &.ant-typography {
        margin-left: 4px;
        color: ${theme.colors.primary};
    }
`;
