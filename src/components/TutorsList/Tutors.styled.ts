import styled from 'styled-components';
import { theme } from '../../themes';
import { List, Row } from 'antd';
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
    margin: 30px 0;
    color: ${theme.colors.primary};
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
export const BestTutorEducation = styled.div`
    display: flex;
    margin: 10px 0;
`;
export const BestTutorEducationBachelorImage = styled.img`
    width: 22px;
    height: 16px;
`;
export const BestTutorEducationBachelor = styled.span`
    margin: 0 5px;
    line-height: 1.5;
    margin: 0 3px;
`;
export const BestTutorStudent = styled.div`
    display: flex;
    margin: 10px 0;
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
        padding: 30px;
        margin: 0;
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
export const BookingThisTutor = styled.div`
    margin: 0 auto;
`;
export const BookingTutorButton = styled.button`
    cursor: pointer;
    width: 197px;
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
        width: 250px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 10px;
    }
`;
export const ViewScheduleTutorButton = styled.button`
    cursor: pointer;
    width: 197px;
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
        width: 250px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 10px;
    }
`;
export const TurtorVideo = styled.div<{ translate?: number }>`
    display: flex;
    justify-content: center;
    align-items: center; /* Chú ý là "align-items", không phải "align-item" */
    background: #fff;
    height: 200px;
    border-radius: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    transition: transform 0.3s ease;
    transform: translateY(${(props) => props.translate}px); /* Sử dụng template literals và props */
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
