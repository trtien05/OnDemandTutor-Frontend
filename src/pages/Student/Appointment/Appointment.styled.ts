import styled from 'styled-components';
import { theme } from '../../../themes';
import { Button, Input, List, Row, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

export const FilterSection = styled.section`
    border-radius: 0px 0px 100px 100px;
    background: #ffff;
    padding: 20px;
    display: flex;
    justify-content: center; /* Center the content horizontally */
`;
export const FilterWrapper = styled.div``;
export const TutorItem = styled(List.Item)`
    &.ant-list-item {
        border-block-end: none;
    }
`;
export const BoxHover = styled.div`
    position: relative;
`;

export const BestTutorItem = styled(Row)`
    cursor: pointer;
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
    margin-top: 30px;
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
    justify-content: space-between;
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



export const TutorFilteredSection = styled.section`
    margin-top: 20px;
    margin-bottom: 50px;
`;
export const TotalTutorAvaiable = styled(Title)`
    &.ant-typography {
        text-align: left;
        color: ${theme.colors.primary};
        font-size: 25px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
    }
`;
export const TutorFiltered = styled.div``;
export const SearchWrapper = styled.div`
    display: flex;
    justify-content: center; /* Center the content horizontally */
    align-items: center; /* Center the content vertically */
    width: 100%;`;

export const RowWrapper = styled(Row)`
    margin:0;
    padding-top: 3%;
`;

export const InputStyled = styled(Input)`
    width:100%;
    border-radius: 15px;
    border-width: 2px !important;
`;

export const ButtonStyled = styled(Button)`
    border-radius: 15px;
    width:100%;
`;

export const StyledSelect = styled(Select)`
    width: 100%;
    border-radius: 15px;
    border: 1.5px solid #d9d9d9;
    .ant-select-selector {
        border-radius: 15px !important;
    }
`;
export const TitleWrapper = styled.div`
    margin:0;
`;
