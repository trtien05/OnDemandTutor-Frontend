import { Button, Select } from 'antd';
import styled from 'styled-components';
export const StyledSelect = styled(Select)`
    width: 100%;
    margin: 0 10px;
    border-radius: 15px;
    border: 1.5px solid #d9d9d9;
    .ant-select-selector {
        border-radius: 15px !important;
    }
`;
export const ButtonStyled = styled(Button)`
    border-radius: 15px;
    ${({ theme }) => theme.breakpoints.down('lg')} {
        width: 100%;
    }
`;
