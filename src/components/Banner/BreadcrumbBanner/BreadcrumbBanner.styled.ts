import { Image, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '../../../themes';

const { Title } = Typography;

export const BreadcrumbBannerSection = styled.section`
    padding: 10px 0 46px;
`;

export const BreadcrumbBannerInner = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${({ theme }) => theme.breakpoints.down('xl')} {
        justify-content: center;
        margin-top: 10px;

        & .ant-breadcrumb ol {
            justify-content: center;
        }
    }

    .ant-breadcrumb li,
    .ant-breadcrumb-link a {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ant-breadcrumb li:last-child .ant-breadcrumb-link {
        color: ${theme.colors.primary};
    }

    .ant-breadcrumb-link {
        color: ${theme.colors.textSecondary};
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 1;

        ${({ theme }) => theme.breakpoints.down('xl')} {
            font-size: 2rem;
        }
    }

    .ant-breadcrumb a:hover {
        color: ${theme.colors.secondary};
        background-color: transparent;
    }

    .ant-breadcrumb-link {
        max-width: 300px;
        line-height: 1.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const BreadcrumbBannerTitle = styled(Title)`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    & .ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 5.4rem;
        font-weight: 700;
        font-weight: 900;
        line-height: 1.3;

        ${({ theme }) => theme.breakpoints.down('xl')} {
            text-align: center;
        }

        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 5rem;
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 4.6rem;
        }
    }
`;

export const BreadcrumbBannerBrand = styled.div`
    display: flex;
    align-items: center;

    ${({ theme }) => theme.breakpoints.down('xl')} {
        justify-content: center;
    }

    & .ant-typography:nth-child(1) {
        position: relative;
        color: ${theme.colors.primary};

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: -32px;
            left: -68px;
            z-index: -1;
            width: 310px;
            height: 135px;
            transform: rotate(-6deg);
            border-radius: 100%;
            background-color: ${theme.colors.primary};
            filter: blur(200px);

            ${({ theme }) => theme.breakpoints.down('xs')} {
                left: 0;
                width: 200px;
            }
        }
    }

    & .ant-typography:nth-child(2) {
        position: relative;
        color: ${theme.colors.secondary};

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: -6px;
            left: 40px;
            z-index: -1;
            width: 200px;
            height: 80px;
            transform: rotate(-4deg);
            border-radius: 100%;
            background-color: ${theme.colors.secondary};
            opacity: 0.3;
            filter: blur(50px);

            ${({ theme }) => theme.breakpoints.down('md')} {
                left: -100px;
            }

            ${({ theme }) => theme.breakpoints.down('sm')} {
                left: -150px;
            }

            ${({ theme }) => theme.breakpoints.down('xs')} {
                left: -200px;
            }
        }
    }
`;

export const BreadcrumbBannerImage = styled(Image)<{ $isImage: boolean }>`
    &.ant-image-img {
        display: block;
        width: 653px;
        height: 355px;
        object-fit: cover;
        border-radius: 0px 225px;

        ${(props) =>
            props.$isImage &&
            css`
                border-radius: 0px;
            `}

        ${({ theme }) => theme.breakpoints.down('xl')} {
            display: none;
        }
    }
`;
