import styled from 'styled-components';
import { theme } from '../../themes';
import { List, Row, Col } from 'antd';

export const TutorItem = styled(List.Item)`
    &.ant-list-item {
        border-block-end: none;
    }
`;
export const BoxHover = styled.div`
    position: relative;
`;

export const QuestionItem = styled(Row)`
    background-color:#F4D1F3;
    border-radius: 25px;
    border: 1px solid ${theme.colors.primary};
    & .ant-list-item {
        border-block-end: none;
    }
`;



export const QuestionContent = styled.div`
    margin: 24px 0;
`;


export const QuestionRow = styled.div`
    color: #000;
    display: flex;
    align-items: center;
    align-content: center;
    margin: 8px 10px;
`;

export const QuestionRowSpan = styled.span`
    text-transform: capitalize;
    font-size: 16px;
    align-items: center;
    align-content: center;
    margin-right: 2%;
    color: #000;
`;

export const TutorFilteredSection = styled.section`
    margin-top: 20px;
    margin-bottom: 50px;
`;

export const TutorFiltered = styled.div``;


export const StyleCol = styled(Col)`
    align-content: center;
    
`