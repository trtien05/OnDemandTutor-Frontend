import { Badge, Table, TableColumnsType, Tag, Tooltip } from 'antd';
import React from 'react';
import DeleteTutor from './DeleteStudent';
import DeleteStudent from './DeleteStudent';

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
  const columns: TableColumnsType<Tutor> = [
    {
      title: 'Student Name',
      dataIndex: 'fullName',
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
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
    },
    {
      title: 'Created At',
      dataIndex: 'createAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Tutor) => (
        <>
          {/* <EditRoom record={record} onReload={onReload} /> */}
          <DeleteStudent record={record} onReload={onReload} />

        </>
      )
    }
  ];
  return (
    <div>
      <Table rowKey={'id'} columns={columns} dataSource={tutors} />
    </div>
  );
}

export default TutorTable;
