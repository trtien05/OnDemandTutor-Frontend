import { Badge, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import DeleteTutor from './DeleteTutor';

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

const TutorTable: React.FC<TutorTableProps> = ({ tutors, onReload }) => {
  const columns = [
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
      title: 'Price Per Hour',
      dataIndex: 'teachingPricePerHour',
      key: 'teachingPricePerHour',
    },
    {
      title: 'Rating',
      dataIndex: 'averageRating',
      key: 'averageRating',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: Tutor) => (
        <>
          {/* <EditRoom record={record} onReload={onReload} /> */}
          <DeleteTutor record={record} onReload={onReload} />

        </>
      )
    }
  ];
  return (
    <div>
      <Table rowKey={'id'} columns={columns} dataSource={tutors} />;
    </div>
  );
}

export default TutorTable;