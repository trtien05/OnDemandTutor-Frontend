import styled from 'styled-components';

export const Dropdown = styled.div`
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: #fff;
    border-radius: 3px;
    min-width: 300px;
`;

export const Body = styled.div`
    > ul {
        box-shadow: none !important;
    }
`;

export const Head = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
`;

export const ItemIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: #f9f9f9;
    color: #3f87f5;
    border-radius: 50%;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
`;

export const ItemContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ItemTitle = styled.div`
    font-size: 16px;
`;

export const ItemTime = styled.div`
    font-size: 13px;
    color: #3c3c3c;
`;
