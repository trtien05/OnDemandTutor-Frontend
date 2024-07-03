import { Badge, Table, TableColumnsType, Tag, Tooltip } from 'antd';
import React from 'react';
import DeleteModerator from './DeleteModerator';

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

const ModeratorTable: React.FC<TutorTableProps> = ({ tutors, onReload }) => {
  const columns: TableColumnsType<Tutor> = [
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
      title: 'Price Per Hour',
      dataIndex: 'teachingPricePerHour',
      render: (_text, record) => formatPrice(record.teachingPricePerHour),
      sorter: (a, b) => a.teachingPricePerHour - b.teachingPricePerHour,
    },
    {
      title: 'Rating',
      dataIndex: 'averageRating',
      sorter: (a, b) => (a.averageRating ?? 0) - (b.averageRating ?? 0),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Tutor) => (
        <>
          {/* <EditRoom record={record} onReload={onReload} /> */}
          <DeleteModerator record={record} onReload={onReload} />

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

export default ModeratorTable;
