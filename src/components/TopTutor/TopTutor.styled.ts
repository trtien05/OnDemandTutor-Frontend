import styled from 'styled-components';
import { Table } from 'antd';

export const TableStyled = styled(Table)`
    padding: 34px 0;
    width: 100%;

    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
        white-space: nowrap;
    }

    @media (max-width: 768px) {
        .ant-table-thead > tr > th,
        .ant-table-tbody > tr > td {
            padding: 8px;
            font-size: 12px;
        }
    }

    @media (max-width: 576px) {
        .ant-table-thead > tr > th,
        .ant-table-tbody > tr > td {
            padding: 4px;
            font-size: 10px;
        }
    }
`;
