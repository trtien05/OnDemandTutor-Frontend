import styled from 'styled-components';
import { theme } from '../../themes';
import { List, Row, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

export const FilterSection = styled.section`
    border-radius: 0px 0px 100px 100px;
    background: #ffff;
    padding: 20px;
`;
export const FilterWrapper = styled.div``;
export const TutorItem = styled(List.Item)`
    &.ant-list-item {
        border-block-end: none;
    }
`;
export const BoxHover = styled.div`
    position: relative;
    margin-bottom: 30px;
`;

export const QuestionItem = styled(Row)`
    // cursor: pointer;
    background-color: #fff;
    border-radius: 50px;
    & .ant-list-item {
        border-block-end: none;
    }
`;

export const QuestionImage = styled(Image)`
    width: 100%;
    border-radius: 25px;
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
`;

export const QuestionContent = styled.div`
    margin: 24px 0;
    // color: ${theme.colors.primary};
`;

export const Name = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 140.625%; /* 33.75px */
        // text-transform: capitalize;
        margin: 0;
    }
`;
export const QuestionRow = styled.div`
    display: flex;
    align-items: center;
    margin: 8px 0;
`;
export const BachelorImage = styled.img`
    width: 22px;
    height: 16px;
`;
export const QuestionRowSpan = styled.span`
    text-transform: capitalize;
    line-height: 1;
    margin-right: 3%;
`;
export const BestTutorStudent = styled.div`
    display: flex;
    margin: 10px 0;
`;
export const BestTutorStudentImage = styled.img`
    width: 17px;
    height: 17px;
`;
export const Description = styled(Paragraph)`
   &.ant-typography{
        // color: ${theme.colors.primary};
        font-family: 'Roboto';
`;
export const BestTutorBooking = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 30px 0 30px;
    gap: 5px;

    ${({ theme }) => theme.breakpoints.down('md')} {
        padding: 30px;
    }
`;
export const BookingInformation = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const BookingRatingAndPrice = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 30px;
        font-weight: 700;
        line-height: 1.25;
        margin: 0;
        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 25px;
        }
    }
`;
export const BookingThisTutor = styled.div`
    margin: 0 auto;
`;
export const BookingTutorButton = styled.button`
    cursor: pointer;
    width: 120px;
    height: 30px;
    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    border-radius: 50px;
    background-color: ${theme.colors.primary};
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        // width: 150px;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        // width: 250px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 10px;
    }
`;
export const Button = styled.button`
    // cursor: pointer;
    width: 100px;
    height: 30px;
    color: ${theme.colors.primary};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    border: 3px solid ${theme.colors.primary};
    border-radius: 50px;
    background-color: #fff;
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        // width: 150px;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        // width: 250px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 10px;
    }
`;

export const TutorFilteredSection = styled.section`
    margin-top: 20px;
    margin-bottom: 80px;
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

export const ModalStudentInfo = styled.div`
    // font-size: 16px;
    // font-weight: bold;
    // font-style: italic;
    display: flex;
`;
