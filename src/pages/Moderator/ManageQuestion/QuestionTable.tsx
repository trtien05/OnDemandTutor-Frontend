import { Table } from 'antd';
import React from 'react';
import { Question } from '../../../components/QuestionList/Question.type';
import QuestionInfo from './QuestionInfo';

interface TutorTableProps {
    questions: Question[];
    onReload: () => void;
    pagination: { current: number, pageSize: number };
    setPagination: (pagination: { current: number, pageSize: number }) => void;
    total: { totalElements: number, totalPages: number };
}

const QuestionTable: React.FC<TutorTableProps> = (props) => {
    const columns = [
        {
            title: 'No',
            key: 'index',
            dataIndex: 'id',
            render: (_: unknown, __: unknown, index: number) => index + 1 + pagination.pageSize * (pagination.current - 1),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Subject',
            dataIndex: 'subjectName',
            key: 'subject',
        },
        {
            title: 'Uploaded by',
            key: 'fullName',
            render: (record: Question) => record.account.fullName
        },
        {
            title: 'Email',
            key: 'email',
            render: (record: Question) => record.account.email
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: Question) => (
                <>
                <QuestionInfo question={record} onReload={props.onReload} />
                </>
            )
        }
    ];

    const [pagination, setPagination] = [props.pagination, props.setPagination]

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Table rowKey={'id'} 
                pagination={{
                    pageSize: pagination.pageSize,
                    current: pagination.current,
                    total: props.total.totalElements,
                    onChange: (page, pageSize) => {
                        handleTableChange({ current: page, pageSize });
                    }
                }}
                columns={columns} 
                dataSource={props.questions} />
        </div>
    );
}

export default QuestionTable;