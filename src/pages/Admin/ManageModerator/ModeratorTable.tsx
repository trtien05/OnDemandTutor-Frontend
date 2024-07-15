import { Table, TableColumnsType, Tag } from 'antd';
import React from 'react';
import DeleteModerator from './DeleteModerator';
import EditModerator from './EditModerator';

interface Moderator {
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

interface ModeratorTableProps {
  moderators: Moderator[];
  onReload: () => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  pageSize: number;
  totalElements: number;
}

const ModeratorTable: React.FC<ModeratorTableProps> = ({ moderators, onReload, onPageChange, currentPage, pageSize, totalElements }) => {

  const columns: TableColumnsType<Moderator> = [
    {
      title: 'No',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Moderator Name',
      dataIndex: 'fullName',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => (a.fullName?.length ?? 0) - (b.fullName?.length ?? 0),
      sortDirections: ['descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Female', value: 'female' },
        { text: 'Male', value: 'male' },

      ],
      onFilter: (value, record) => record.gender === value,
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
      filters: [
        { text: 'ACTIVE', value: 'ACTIVE' },
        { text: 'PROCESSING', value: 'PROCESSING' },
        { text: 'BANNED', value: 'BANNED' },
        { text: 'UNVERIFIED', value: 'UNVERIFIED' },
      ],
      onFilter: (value, record) => record.status === value,
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
      render: (_: any, record: Moderator) => (
        <>
          <EditModerator record={record} onReload={onReload} />
          <DeleteModerator record={record} onReload={onReload} />

        </>
      )
    }
  ];
  return (
    <div>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={moderators}
        scroll={{ x: true }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: onPageChange,
          showSizeChanger: false,
          total: totalElements,
        }}
      />
    </div>
  );
}

export default ModeratorTable;
