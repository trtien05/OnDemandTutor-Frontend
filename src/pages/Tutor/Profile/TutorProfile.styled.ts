import styled, { css } from 'styled-components';
import { theme } from '../../../themes';
import { Flex } from 'antd';

export const ProfileContainer = styled.section`
    padding: 10px 0 60px;
`;

export const ProfileWrapper = styled.section`
    padding: 30px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
    transition: ${theme.transition.primary};

    

    & .ant-row {
        width: 100%;
    }

    & h2.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.4;
    }
`;

export const ProfileContent = styled(Flex)`
    & h1.ant-typography {
        margin-top: 12px;
        margin-bottom: 6px;
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
    }

    & > span.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }

    & .ant-space {
        justify-content: space-between;
        width: 100%;
    }
`;

export const ProfileInfoItem = styled(Flex)`
    margin-top: 30px;
    width: 100%;

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.primary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.4;
    }
`;

export const ProfileInfoText = css`
    color: ${theme.colors.textPrimary};
    font-size: 1.6rem;
    font-weight: 400;
`;

export const ProfileInfoBox = styled(Flex)`
    padding: 12px 20px;
    border-radius: 6px;
    border: 1px solid ${theme.colors.secondary};

    & span.ant-typography {
        ${ProfileInfoText}
        flex-shrink: 0;
    }

    & > .ant-flex span.ant-typography {
        margin-right: 4px;
        width: 150px;
        ${({ theme }) => theme.breakpoints.down('sm')} {
            width: 100px;
        }
    }

    & div.ant-typography {
        margin-bottom: 0;

        & span.ant-typography:first-child {
            margin-right: 4px;
            color: ${theme.colors.primary};
        }
    }
`;