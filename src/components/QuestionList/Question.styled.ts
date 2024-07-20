import styled from 'styled-components';
import { theme } from '../../themes';
import {  Row, Image, List } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

export const BoxHover = styled.div`
    position: relative;
    margin-bottom: 30px;
`;

export const QuestionItem = styled(Row)`
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
`;

export const Name = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 140.625%; /* 33.75px */
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
export const Description = styled(Paragraph)`
   &.ant-typography{
        font-family: 'Roboto';
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
    ${({ theme }) => theme.breakpoints.down('xs')} {
        width: 100%;
        padding: 10px;
    }
`;
export const Button = styled.button`
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
    position: absolute;
    top: 24px;
    right: 10px;
    ${({ theme }) => theme.breakpoints.down('sm')} {
        position: unset;
        width: auto;
        padding: 10px;
    }
`;
export const TutorFilteredSection = styled.section`
    margin-top: 20px;
    margin-bottom: 80px;
`;
export const TutorItem = styled(List.Item)`
    &.ant-list-item {
        border-block-end: none;
    }
`;
export const ModalStudentInfo = styled.div`
    display: flex;
`;
