import { Table, TableColumnsType, Tag } from 'antd';
import React from 'react';
import EditAdmin from './EditAdmin';

interface Admin {
  id: number;
  fullName?: string;
  gender?: boolean;
  address?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  createAt?: string;
  status?: string;
};

interface AdminTableProps {
  admins: Admin[];
  onReload: () => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  loading: boolean;
}

const AdminTable: React.FC<AdminTableProps> = ({ admins, onReload, onPageChange, currentPage, pageSize, totalElements, loading }) => {

  const columns: TableColumnsType<Admin> = [
    {
      title: 'No',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Admin Name',
      dataIndex: 'fullName',
      width: 180,
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => (a.fullName?.length ?? 0) - (b.fullName?.length ?? 0),
      sortDirections: ['descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Created At',
      dataIndex: 'createAt',
      sorter: (a, b) => new Date(a.createAt ?? '').getTime() - new Date(b.createAt ?? '').getTime(),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => (

        <Tag color={
          record.status === 'ACTIVE' ? 'green' :
            record.status === 'PROCESSING' ? 'orange' :
              record.status === 'BANNED' ? 'red' :
                record.status === 'UNVERIFIED' ? 'gray' : ''
        }>
          {record.status}
        </Tag>

      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Admin) => (
        <>
          <EditAdmin record={record} onReload={onReload} />
        </>
      )
    }
  ];
  return (
    <div>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={admins}
        scroll={{ x: true }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: onPageChange,
          showSizeChanger: false,
          total: totalElements,
        }}
        loading={loading}
      />
    </div>
  );
}

export default AdminTable;
