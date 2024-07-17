import styled from 'styled-components';
import { theme } from '../../themes';
import { Avatar, List, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { FaStar } from 'react-icons/fa';

export const FilterSection = styled.section`
    border-radius: 0px 0px 100px 100px;
    background: #ffff;
    padding: 20px;
`;
export const FilterWrapper = styled.div``;
export const TutorItem = styled(List.Item)`
    &.ant-list-item {
        display: block;
        border-block-end: none;
    }
`;
export const BoxHover = styled.div`
    position: relative;
`;

export const BestTutorItem = styled(Row)`
    background-color: #fff;
    border-radius: 50px;
    & .ant-list-item {
        border-block-end: none;
    }
`;

export const BestTutorImage = styled.img`
    width: 210px;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
        rgba(0, 0, 0, 0.09) 0px -3px 5px;
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
`;

export const BestTutorContent = styled.div`
    margin: 20px 0;
    min-width: max-content;
    color: ${theme.colors.primary};
    ${({ theme }) => theme.breakpoints.down('md')} {
        margin-left: 5px;
    }
`;

export const BestTutorName = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 140.625%; /* 33.75px */
        text-transform: uppercase;
        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 18px;
        }
    }
`;
export const BestTutorEducation = styled.div`
    display: flex;
    margin: 10px 0;
    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: 12px;
    }
`;
export const BestTutorEducationBachelorImage = styled.img`
    width: 22px;
    height: 16px;
`;
export const BestTutorEducationBachelor = styled.span`
    margin: 0 2px 0 5px;
    line-height: 1.5;
`;

export const BestTutorStudentImage = styled.img`
    width: 17px;
    height: 17px;
`;
export const BestTutorDescription = styled(Paragraph)`
   &.ant-typography{
        color: ${theme.colors.primary};
        font-family: 'Roboto';
`;
export const BestTutorBooking = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px 10px 0 0;
    gap: 10px;

    ${({ theme }) => theme.breakpoints.down('md')} {
        padding: 0;
        margin-right: 5px;
    }
    ${({ theme }) => theme.breakpoints.down('md')} {
        margin: 30px;
    }
`;
export const BookingInformation = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
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
        height: 23px;
    }
`;

export const BookingRatingAndPrice = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 30px;
        font-weight: 700;
        line-height: 1.25;
        margin: 0 5px;
        ${({ theme }) => theme.breakpoints.down('xl')} {
            font-size: 20px;
        }
        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 18px;
        }
    }
`;
export const BookingThisTutor = styled.div`
    margin: 0 auto;
`;

export const AvatarTutor = styled(Avatar)`
    cursor: pointer;
    width: 210px;
    height: 210px;
    border-radius: 50px;
    left: -5px;
    bottom: 2px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        width: 100%;
        height: 100%;
    }
`;
export const BookingTutorButton = styled.button`
    cursor: pointer;
    width: 200px;
    height: 41px;
    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    border-radius: 50px;
    background-color: ${theme.colors.primary};
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        width: 150px;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 230px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 0 20px;
    }
`;
export const ViewScheduleTutorButton = styled.button`
    cursor: pointer;
    width: 200px;
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
        width: 150px;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 230px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 0 20px;
    }
`;
export const TurtorVideo = styled.div<{ translate?: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    height: 200px;
    border-radius: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    transition: transform 0.3s ease;
    transform: translateY(${(props) => props.translate}px);
`;

export const TutorFilteredSection = styled.section`
    margin-top: 20px;
    margin-bottom: 40px;
`;
export const TotalTutorAvaiable = styled(Title)`
    &.ant-typography {
        text-align: center;
        color: #fff;
        font-size: 48px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
    }
`;
export const TutorFiltered = styled.div``;
