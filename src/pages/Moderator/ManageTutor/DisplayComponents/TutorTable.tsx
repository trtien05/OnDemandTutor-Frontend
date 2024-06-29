import { Badge, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import DeleteTutor from '../DeleteTutor';
import { Tutor } from '../Tutor.type'
import TutorInfo from './TutorInfo/TutorInfo';

interface TutorTableProps {
  tutors: Tutor[];
  onReload: () => void;
}

const TutorTable: React.FC<TutorTableProps> = ({ tutors, onReload }) => {
  const columns = [
    {
      title: 'Id',
      key: 'index',
      dataIndex: 'id'
      // render: (text: any, record:any , index:number) => index + 1,
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
      key: 'teachingPricePerHour',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: Tutor) => (
        <>
          {/* <EditRoom record={record} onReload={onReload} /> */}
          <TutorInfo tutorId={record.id} tutor={record} />

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