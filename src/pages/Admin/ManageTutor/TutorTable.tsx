import { Table, TableColumnsType, Tag } from 'antd';
import React, { useState } from 'react';
import DeleteTutor from './DeleteTutor';
import EditTutor from './EditTutor'
import { FaStar } from 'react-icons/fa';

interface Education {
  degreeType?: string;
  majorName?: string;
  specialization?: string;
  verified?: boolean;
};

interface Tutor {
  id: number;
  fullName?: string;
  avatarUrl?: string;
  teachingPricePerHour: number;
  educations?: Education;
  subjects: string[],
  averageRating?: number;
  loading: boolean;
  status: string;
  gender: boolean;
  dateOfBirth: string;
};

interface TutorTableProps {
  tutors: Tutor[];
  onReload: () => void;
}
const formatPrice = (price: number) => {
  const safePrice = Number(price) || 0;
  return `${safePrice.toLocaleString()} đ`;
}

const TutorTable: React.FC<TutorTableProps> = ({ tutors, onReload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns: TableColumnsType<Tutor> = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Tutor Name',
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
      title: 'Price Per Hour',
      dataIndex: 'teachingPricePerHour',
      render: (_, record) => formatPrice(record.teachingPricePerHour),
      sorter: (a, b) => a.teachingPricePerHour - b.teachingPricePerHour,
    },
    {
      title: 'Rating',
      dataIndex: 'averageRating',
      filters: [
        { text: '1 Star', value: 1 },
        { text: '2 Stars', value: 2 },
        { text: '3 Stars', value: 3 },
        { text: '4 Stars', value: 4 },
        { text: '5 Stars', value: 5 },
      ],
      onFilter: (value, record) => record.averageRating === value,
      sorter: (a, b) => (a.averageRating ?? 0) - (b.averageRating ?? 0),
      render: (_, record) => (
        <>
          {record.averageRating &&
            Array.from({ length: record.averageRating }).map((_, index) => (
              <FaStar key={index} style={{ color: '#ffc107' }} />
            ))}
        </>
      ),
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
      render: (_: any, record: Tutor) => (
        <>
          <EditTutor record={record} onReload={onReload} />
          <DeleteTutor record={record} onReload={onReload} />

        </>
      )
    }
  ];
  return (
    <div>
      <Table rowKey={'id'} columns={columns} pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: tutors.length,
        showSizeChanger: false,
      }} dataSource={tutors}
        onChange={handleTableChange}
        scroll={{ x: true }}
      />
    </div>
  );
}

export default TutorTable;
