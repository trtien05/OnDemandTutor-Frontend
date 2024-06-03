import { Button, Col, Collapse, Image, List, Row, Typography } from 'antd';

// import ServiceList from '@/components/ServiceList';
import styled from 'styled-components';
import { theme } from '../../themes';
import Icon from '@ant-design/icons/lib/components/Icon';
import { RightCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const BestServiceSection = styled.section`
    padding-top: 42px;
`;

export const BestTutorSection = styled.section`
    padding-top: 42px;
`;
export const FeedbackSection = styled.section`
    padding-bottom: 150px;
    position: relative;
`;
export const FeedbackWrapper = styled.div`
    padding: 52px 63px 52px 63px;
    width: 635px;
    height: 410px;
    z-index: 2;
    border-radius: 50px;
    background-color: #f4d1f3;
    ${({ theme }) => theme.breakpoints.down('lg')} {
        width: 100%;
    }
`;
export const StudentInfor = styled.div`
    margin-left: 20px;
`;
export const BestServiceTitle = styled(Title)`
    text-align: center;
    &.ant-typography {
        color: #fff;
        margin-bottom: 16px;
        font-size: 4rem;
        font-weight: 700;
        line-height: 1.25;
    }
`;
export const BookingRatingAndPrice = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 30px;
        font-weight: 700;
        line-height: 1.25;
        margin: 0;
    }
`;

export const StudentName = styled(Paragraph)`
    &.ant-typography {
        font-size: 24px;
        margin: 0;
        font-style: normal;
        font-weight: 400;
        ${({ theme }) => theme.breakpoints.down('xs')} {
            display: none;
        }
    }
`;

export const BestServiceDesc = styled(Paragraph)`
    &.ant-typography {
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.625;
    }
`;

export const SchoolName = styled(Paragraph)`
    &.ant-typography {
        font-size: 18px;
        margin: 0;
        font-style: normal;
        font-weight: 400;
        line-height: 1.625;
        ${({ theme }) => theme.breakpoints.down('xs')} {
            display: none;
        }
    }
`;

export const BestServiceItem = styled.div`
    background-color: #fff;
    height: 330px;
    display: flex;
    justify-content: center;
    align-item: center;
    padding: 30px;
    flex-direction: column;
    border-radius: 25px;
    text-align: center;
`;
export const BestTutorItem = styled(Row)`
    cursor: pointer;
    background-color: #fff;
    border-radius: 50px;
    &.ant-list-item {
        border-block-end: none;
    }
`;
export const TutorItem = styled(List.Item)`
    &.ant-list-item {
        border-block-end: none;
    }
`;
export const BestServiceButton = styled.button`
    cursor: pointer;
    height: 47.962px;
    color: #fff;
    font-size: 12px;

    border-radius: 50px;
    background-color: ${theme.colors.primary};
`;
export const BestServiceImage = styled.img`
    width: 210px;
`;
export const BestServiceImageDiv = styled.div`
    height: 190px;
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
`;

export const SeeMoreButton = styled.button`
    cursor: pointer;
    width: 414px;
    height: 68px;
    color: ${theme.colors.primary};
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    border-radius: 50px;
    background-color: #fff;
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 300px;
    }
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 200px;
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
`;

export const BestTutorContent = styled.div`
    padding: 30px 0 0 30px;
    color: ${theme.colors.primary};
    ${({ theme }) => theme.breakpoints.down('lg')} {
        display: none;
    }
`;
export const BestTutorEducation = styled.div`
    display: flex;
    max-width: 250px;

    justify-content: space-between;
    margin: 10px 0;
`;
export const BestTutorStudent = styled.div`
    display: flex;
    margin: 10px 0;
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
`;
export const BestTutorStudentImage = styled.img`
    width: 17px;
    height: 17px;
`;
export const BestTutorEducationBachelor = styled.span`
    margin: 0 5px;
    line-height: 1.5;
`;
export const BestServiceImageMath = styled.img`
    width: 190px;
`;
export const BestServiceImageProgram = styled.img`
    width: 200px;
`;
export const BestTutorBooking = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 30px 0 30px;
    gap: 5px;
    ${({ theme }) => theme.breakpoints.down('lg')} {
        padding: 30px 30px 0 0;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding: 30px;
    }
`;
export const BookingThisTutor = styled.div`
    margin: 0 auto;
`;
export const BestTutorDescription = styled(Paragraph)`
   &.ant-typography{
        color: ${theme.colors.primary};
        font-family: 'Roboto';
        `;
export const CollapseIconStyle = styled.div`
    backgroundcolor: #fff;
    width: 40px;
    height: 40px;
    color: #fff;
    borderradius: 50%;
    display: flex;
    justifycontent: center;
    alignitems: center;
`;

export const QuestionTitle = styled(Title)`
    &.ant-typography {
        color: #fff;
        text-transform: uppercase;
        margin-bottom: 0;

        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 20px;
        }
        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 10px;
        }
        ${({ theme }) => theme.breakpoints.down('xs')} {
            display: none;
        }
    }
`;

export const QuestionSection = styled.section`
    padding: 150px 0;
`;
export const BookingInformation = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const AnswerWrapper = styled.div`
    border-radius: 50px;
    background-color: #fff;
    padding: 80px;
`;
export const QuestionWrapper = styled.div`
    width: 100%;
    padding: 106px 40px;
    height: 410px;
    border-radius: 0px 10px 10px 0px;
    background-color: #f4d1f3;
    ${({ theme }) => theme.breakpoints.down('lg')} {
        padding: 20px;
    }
`;

export const QuestionFeedbackWrapper = styled.div`
    position: relative;
    z-index: -1;
    width: 100%;
    padding: 200px 50px 200px 220px;
    height: 526px;
    border-radius: 150px 10px 10px 150px;
    background-color: #fff;
    ${({ theme }) => theme.breakpoints.down('lg')} {
        padding: 100px 50px 100px 120px;
    }
    ${({ theme }) => theme.breakpoints.down('md')} {
        padding: 50px;
    }
`;
export const QuestionTitleRight = styled(Title)`
    &.ant-typography {
        margin-bottom: 0;
        font-size: 48px;
        color: ${theme.colors.primary};
        font-weight: 800;
        line-height: 1.25;
        ${({ theme }) => theme.breakpoints.down('lg')} {
            font-size: 30px;
        }
        ${({ theme }) => theme.breakpoints.down('md')} {
            padding: 18px;
        }
    }
`;
export const FeedbackImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

export const FeedbackTitle = styled(Title)`
    &.ant-typography {
        margin-bottom: 24px;
        color: ${theme.colors.textPrimary};
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.25;
    }
`;
export const CollapseStyle = styled(Collapse)`
    color: #fff;
    background-color: ${theme.colors.primary};
    .ant-collapse-expand-icon {
        display: none;
    }
`;

export const FeedbackContent = styled.div`
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
`;

export const FeedbackStudentContent = styled(Paragraph)`
    &.ant-typography {
        font-style: italic;
        font-size: 18px;
        font-weight: 400;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 12px;
        }
        ${({ theme }) => theme.breakpoints.down('xs')} {
            font-size: 10px;
        }
    }
`;

export const AnswerContent = styled(Paragraph)`
    &.ant-typography {
        color: #fff;
    }
`;
