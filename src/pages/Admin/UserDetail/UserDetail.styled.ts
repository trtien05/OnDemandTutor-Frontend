import { Flex, Input } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '../../../themes';

const { Password } = Input;

export const CustomerWrapper = styled.div`
    padding: 30px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
    transition: ${theme.transition.primary};

    &:hover {
        box-shadow: 0px 4px 4px 0px ${theme.colors.disabledPlaceholder};
    }

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

export const CustomerContent = styled(Flex)`
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

    & .ant-avatar {
        border: 1px solid ${theme.colors.borderSchedule};
    }

    & .ant-upload-wrapper {
        text-align: center;

        & .ant-upload.ant-upload-select {
            width: 137px;
            height: 137px;
        }
    }
`;

export const CustomerInfoItem = styled(Flex)`
    margin-top: 30px;
    width: 100%;

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.primary};
        font-size: 2.0rem;
        font-weight: 600;
        line-height: 1.4;
    }
`;

export const CustomerInfoText = css`
    color: ${theme.colors.textPrimary};
    font-size: 1.6rem;
    font-weight: 400;
`;

export const CustomerInfoBox = styled(Flex)`
    padding: 12px 20px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.secondary};

    & span.ant-typography {
        ${CustomerInfoText}
        flex-shrink: 0;
    }

    & > .ant-flex span.ant-typography {
        margin-right: 4px;
        width: 150px;
    }

    & div.ant-typography {
        margin-bottom: 0;

        & span.ant-typography:first-child {
            margin-right: 4px;
            color: ${theme.colors.primary};
        }
    }
`;

export const CustomerIdentityCard = styled(Password)`
    &.ant-input-password {
        background-color: ${theme.colors.shadowButton};
        border-color: ${theme.colors.borderInput};
    }

    & input.ant-input {
        color: ${theme.colors.textQuaternary};
        background-color: transparent;
    }
`;

export const CustomerList = styled.div`
    height: 515px;
    overflow-y: scroll;
`;

export const CustomerItem = styled.article`
    padding: 12px;
    width: 100%;
    border-radius: 10px;
    background: ${theme.colors.white};
    box-shadow: 0px 24px 55px 0px ${theme.colors.shadowCartHover};

    & .ant-image {
        flex-shrink: 0;
    }

    & .ant-image-img {
        display: block;
        border-radius: 6px;
        object-fit: cover;
    }

    & .ant-image-mask {
        border-radius: 6px;
    }
`;

export const CustomerItemHeading = styled(Flex)`
    flex: 1;

    & h3.ant-typography {
        margin: 0;
        color: ${theme.colors.primary};
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.625;

        display: -webkit-box;
        -webkit-line-clamp: var(--line-clamp, 1);
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    & span.ant-typography {
        flex-shrink: 0;
        color: ${theme.colors.textSecondary};
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.73333;
    }
`;

export const CustomerItemContent = styled(Flex)`
    & div.ant-typography {
        margin: 0;

        & span.ant-typography {
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 1.73333;
        }

        & span.ant-typography:first-child {
            color: ${theme.colors.textPrimary};
        }

        & span.ant-typography:last-child {
            color: ${theme.colors.textSecondary};
        }
    }
`;