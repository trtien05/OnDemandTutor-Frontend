import { Table, TableProps } from 'antd';
import React from 'react'
import { CertColumns, EducationColumns, TableData, } from './Table.type';
import { Certificate, Education } from '../../TutorProfile.type';

const onChangeEducation: TableProps<Education>['onChange'] = (sorter, extra) => {
    console.log('params', sorter, extra);
};

const onChangeCert: TableProps<Certificate>['onChange'] = (sorter, extra) => {
    console.log('params', sorter, extra);
};

const TableComponent: React.FC<TableData> = (tableData) => (
    tableData.dataType === 'education' ?
        <Table
            columns={EducationColumns}
            dataSource={tableData.EducationData}
            onChange={onChangeEducation}
            showSorterTooltip={{ target: 'sorter-icon' }}
        /> :
        <Table
            columns={CertColumns}
            dataSource={tableData.CertificateData}
            onChange={onChangeCert}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
);

export default TableComponent;