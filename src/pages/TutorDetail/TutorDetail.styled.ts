import styled from 'styled-components';
import { theme } from '../../themes';
import Title from 'antd/es/typography/Title';
import { Avatar, Rate, Tabs } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { FaRegHeart, FaStar } from 'react-icons/fa';
export const TutorDetailBackground = styled.div`
    background: #fff;
    padding: 80px 0;
`;
export const IconStyleHeart = styled(FaRegHeart)`
    width: 20px;
    height: 20px;
    color: #b94ab7;
    margintop: 10px;
    ${({ theme }) => theme.breakpoints.down('xl')} {
        width: 25px;
        height: 25px;
    }
    ${({ theme }) => theme.breakpoints.down('lg')} {
        width: 18px;
        height: 18px;
    }
`;
export const StyledTabs = styled(Tabs)`
    display: flex;
    justify-content: center;

    .ant-tabs-nav-list {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    .ant-tabs-tab {
        font-size: 18px;
        display: flex;
        justify-content: center;
        text-align: center;
        transition: background 0.3s;
        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 15px;
        }
    }

    .ant-tabs-tab-active {
        display: flex;
        margin-bottom: -1px;
    }

    .ant-tabs-ink-bar {
        background: #a64ebf !important;
    }
`;
export const BestTutorStudentImage = styled.img`
    margin-right: 5px;
    width: 17px;
    height: 17px;
`;
export const BestTutorDescription = styled(Paragraph)``;

export const BestTutorStudent = styled.div`
    display: flex;
    margin: 10px 0;
`;
export const TutorInfoCard = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

export const TutorImage = styled.img`
    width: 210px;
    border-radius: 25px;
    object-fit: cover;
    margin-right: 20px;
`;

export const TutorVideoCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 50px;
    gap: 10px;
    background: #fff;
    box-shadow: -3px 7px 71px 10px rgba(185, 74, 183, 0.28);
`;
export const BestTutorEducationBachelor = styled.span`
    margin: 0 5px;
    line-height: 1.5;
    margin: 0 3px;
`;
export const TutorVideo = styled.div`
    height: 259.012px;
`;
export const IconStyleStart = styled(FaStar)`
    width: 31px;
    height: 31px;
    color: #ffcc4d;
    marginright: 5px;
    ${({ theme }) => theme.breakpoints.down('xl')} {
        width: 25px;
        height: 25px;
    }
    ${({ theme }) => theme.breakpoints.down('lg')} {
        width: 18px;
        height: 18px;
    }
`;
export const BookingRatingAndPrice = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 30px;
        font-weight: 700;
        line-height: 1.25;
        margin: 0;
        ${({ theme }) => theme.breakpoints.down('xl')} {
            font-size: 20px;
        }
        ${({ theme }) => theme.breakpoints.down('lg')} {
            font-size: 18px;
        }
        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 14px;
        }
    }
`;

export const SendMessageButton = styled.button`
    cursor: pointer;
    height: 41px;
    color: ${theme.colors.primary};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    border: 3px solid ${theme.colors.primary};
    border-radius: 50px;
    background-color: #fff;
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        width: 100%;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 10px;
    }
`;
export const BookingInformation = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
`;
export const TutorDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

export const BestTutorName = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 140.625%; /* 33.75px */
        text-transform: uppercase;
    }
`;
export const BestTutorEducationBachelorImage = styled.img`
    width: 22px;
    height: 16px;
    margin-right: 5px;
`;
export const BestTutorEducation = styled.div`
    display: flex;
    margin: 10px 0;
`;

export const BookingTutorButton = styled.button`
    cursor: pointer;
    height: 41px;
    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    border-radius: 50px;
    background-color: ${theme.colors.primary};
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        width: 100%;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 10px;
    }
`;
export const ReviewCard = styled.div`
    border-radius: 8px;
    background-color: #ffffff;
    position: relative;
`;

export const ReviewHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

export const StudentName = styled.div`
    font-weight: bold;
    margin-left: 16px;
    color: #9c27b0;
`;

export const ReviewContent = styled.div`
    color: #000;
`;

export const DateRated = styled.div`
    color: #888;
    margin-left: 16px;
`;

export const Rating = styled(Rate)`
    margin-left: 16px;
`;

export const AvatarStyled = styled(Avatar)`
    margin-right: 16px;
`;
export const ResumeSection = styled.div``;

export const Section = styled.div`
    margin-bottom: 30px;
    display: flex;
    position: relative;
`;

export const SectionHeader = styled.div`
    background-color: #9c27b0;
    color: white;
    text-align: center;
    padding: 10px;
    width: 150px;
    border-radius: 25px 80px 80px 25px;
    font-weight: bold;
    position: relative;
    z-index: 2;
    border-radius: 50px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        width: 100px;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 80px;
        font-size: 12px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 80px;
    }
`;

export const SectionContent = styled.div`
    position: relative;
    background-color: #fff;
    padding: 10px;
    border-radius: 0 20px 20px 20px;
    box-shadow: -3px 7px 71px 10px rgb(222 142 220 / 30%);

    ${({ theme }) => theme.breakpoints.down('md')} {
        padding: 30px;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding: 10px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        padding: 5px;
    }
`;

export const Item = styled.div`
    display: flex;
    padding-left: 80px;
    padding-top: 5px;
    padding-bottom: 5px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        padding-left: 50px;
    }
`;

export const Year = styled.span`
    display: inline-block;
    width: 100px;
    color: #9c27b0;
    ${({ theme }) => theme.breakpoints.down('xs')} {
        font-size: 12px;
    }
`;

export const Description = styled.div`
    color: #9c27b0;
    ${({ theme }) => theme.breakpoints.down('xs')} {
        font-size: 12px;
    }
`;
export const TitleDetail = styled(Title)`
    &.ant-typography {
        color: #9c27b0;
        font-style: normal;
        line-height: 140.625%;
        text-transform: uppercase;
    }
`;
export const SectionInfor = styled.div`
    margin-bottom: 50px;
`;
export const TitleWrapper = styled.div`
    margin-bottom: 30px;
`;
export const ButtonWrapper = styled.div`
    text-align: center;
    padding-top: 50px;
`;
export const SeeMoreButton = styled.button`
    cursor: pointer;
    width: 180px;
    height: 40px;
    color: ${theme.colors.primary};
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    border: 3px solid ${theme.colors.primary};

    border-radius: 50px;
    background-color: #fff;
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 150px;
    }
`;
