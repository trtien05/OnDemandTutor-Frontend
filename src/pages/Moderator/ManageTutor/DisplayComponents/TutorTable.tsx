import {Table} from 'antd';
import React from 'react';
import TutorDocument from '../../ManageDocument/TutorDocument';
import { Tutor } from '../Tutor.type'
import TutorInfo from './TutorInfo/TutorInfo';

interface TutorTableProps {
  tutors: Tutor[];
  onReload: () => void;
  manage: string;
}

const TutorTable: React.FC<TutorTableProps> = ({ tutors, onReload, manage }) => {
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
          {manage.includes('tutor') ? 
          <TutorInfo tutorId={record.id} tutor={record} onReload={onReload} />
          : <TutorDocument tutorId={record.id} tutor={record} onReload={onReload} />}
        </>
      )
    }
  ];

  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 7,
});

const handleTableChange = (pagination: any) => {
    setPagination(pagination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <div>
      <Table rowKey={'id'} 
        columns={columns} 
        dataSource={tutors} 
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.current,
          total: tutors.length,
          onChange: (page, pageSize) => {
              handleTableChange({ current: page, pageSize });
          }
      }} />;
    </div>
  );
}

export default TutorTable;