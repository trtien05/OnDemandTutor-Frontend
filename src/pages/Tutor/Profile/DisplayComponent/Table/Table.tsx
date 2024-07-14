import { Table } from 'antd';
import React from 'react'
import { CertColumns, EducationColumns, TableData, } from './Table.type';


const TableComponent: React.FC<TableData> = (tableData) => (
    tableData.dataType === 'education' ?
        <Table
            key="education"
            columns={EducationColumns}
            dataSource={tableData.EducationData}
            showSorterTooltip={{ target: 'sorter-icon' }}
        /> :
        <Table
            key="certificate"
            columns={CertColumns}
            dataSource={tableData.CertificateData}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
);

export default TableComponent;