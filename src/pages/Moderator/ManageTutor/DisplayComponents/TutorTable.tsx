import { Table } from 'antd';
import React from 'react';
import TutorDocument from '../../ManageDocument/TutorDocument';
import { Tutor } from '../Tutor.type'
import TutorInfo from './TutorInfo/TutorInfo';

interface TutorTableProps {
  tutors: Tutor[];
  onReload: () => void;
  manage: string;
  pagination: { current: number, pageSize: number };
  setPagination: (pagination: { current: number, pageSize: number }) => void;
  total: { totalElements: number, totalPages: number };
  loading: boolean;
}

const TutorTable: React.FC<TutorTableProps> = (props) => {
  const columns = [
    {
      title: 'No',
      key: 'index',
      dataIndex: 'id',
      render: (_: unknown, __: unknown, index: number) => index + 1 + pagination.pageSize * (pagination.current - 1),
    },
    {
      title: 'Tutor Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: Tutor) => (
        <>
          {props.manage.includes('tutor') ?
            <TutorInfo tutorId={record.id} tutor={record} onReload={props.onReload} />
            : <TutorDocument tutorId={record.id} tutor={record} onReload={props.onReload} />}
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
        loading={props.loading}
        columns={columns}
        dataSource={props.tutors}
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.current,
          total: props.total.totalElements,
          onChange: (page, pageSize) => {
            handleTableChange({ current: page, pageSize });
          }
        }} />;
    </div>
  );
}

export default TutorTable;