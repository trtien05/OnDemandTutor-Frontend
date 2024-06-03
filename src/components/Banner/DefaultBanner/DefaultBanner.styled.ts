import { Col, Image, Row, Space, Typography } from 'antd';

import styled from 'styled-components';
import { theme } from '../../../themes';
const { Title } = Typography;

export const DefaultBannerSection = styled.section`
    padding: 30px 0;
    border-radius: 0px 0px 150px 0px;
    background-color: #fff;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding-top: 30px;
    }
`;

export const DefaultBannerWrapper = styled.div`
    display: inline-block;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        border-radius: 15px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            181deg,
            rgba(66, 9, 201, 0) 7.14%,
            rgba(54, 21, 131, 0.56) 99.46%
        );
        z-index: 1; /* make sure it is behind the content */
        ${({ theme }) => theme.breakpoints.down('lg')} {
            width: 90%;
        }
    }
`;

export const DefaultBannerContent = styled.div`
    position: absolute;
    left: 150px;
    z-index: 2;
    bottom: 50px;
    ${({ theme }) => theme.breakpoints.down('lg')} {
        left: 50px;
    }
    ${({ theme }) => theme.breakpoints.down('md')} {
        left: 10px;
        bottom: 20px;
    }
`;
export const DefaultBannerHeading = styled(Title)`
    margin-bottom: 0;
    & span.ant-typography {
        font-family: 'SVN-Poppins', sans-serif;
        font-size: 48px;
        font-weight: 800;
        line-height: 1.38462;
        color: #fff;

        ${({ theme }) => theme.breakpoints.down('lg')} {
            font-size: 24px;
        }
        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 18px;
        }
        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 12;
        }
    }
`;
export const DefaultBannerDescription = styled.p`
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 447;
    color: #fff;
    line-height: 140.625%;
    max-width: 648px;
    ${({ theme }) => theme.breakpoints.down('lg')} {
        font-size: 18px;
        max-width: 450px;
    }
    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: 10px;
        max-width: 450px;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        font-size: 0;
    }
`;
export const DefaultBannerImage = styled(Image)`
    &.ant-image-img {
        border-radius: 15px;
        object-fit: cover;
        z-index: 0;
        ${({ theme }) => theme.breakpoints.down('lg')} {
            width: 90%;
        }
    }
`;
export const CustomCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DefaultBannerRow = styled(Row)`
    position: relative;
`;

export const DefaultBannerBackgroundImage = styled.div`
    position: absolute;
    height: 498px;
    border-radius: 15px;
    width: 916px;
    background-color: #171717;
    opacity: 0.7;
    ${({ theme }) => theme.breakpoints.down('md')} {
        width: 90%;
    }
`;
