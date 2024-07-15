import { Table, TableColumnsType } from 'antd';
import React from 'react'
import { CertColumns, EducationColumns, TableData, } from './Table.type';
import { Certificate, Education } from '../../TutorProfile.type';


const TableComponent: React.FC<TableData> = (tableData) => {
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 5,
    });

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const EducationCol: TableColumnsType<Education> = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'index',
            render: (_: unknown, __: unknown, index: number) => index + 1 + pagination.pageSize * (pagination.current - 1),
        },
        ...EducationColumns
    ]

    const CertificateCol: TableColumnsType<Certificate> = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'index',
            render: (_: unknown, __: unknown, index: number) => index + 1 + pagination.pageSize * (pagination.current - 1),
        },
        ...CertColumns
    ];
    return (
        <>
            {tableData.dataType === 'education' ?
            <Table
                key="education"
                columns={EducationCol}
                dataSource={tableData.EducationData}
                pagination={{
                    pageSize: pagination.pageSize,
                    current: pagination.current,
                    total: tableData.EducationData?.length,
                    onChange: (page, pageSize) => {
                        handleTableChange({ current: page, pageSize });
                    }
                }}
                showSorterTooltip={{ target: 'sorter-icon' }}
            /> :
            <Table
                key="certificate"
                columns={CertificateCol}
                dataSource={tableData.CertificateData}
                pagination={{
                    pageSize: pagination.pageSize,
                    current: pagination.current,
                    total: tableData.CertificateData?.length,
                    onChange: (page, pageSize) => {
                        handleTableChange({ current: page, pageSize });
                    }
                }}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />}
        </>
    )
};

export default TableComponent;