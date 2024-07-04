import { Button, Popconfirm, Tooltip, message } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteAccount } from '../../../utils/accountAPI';

interface Record {
  id: number;
}

interface DeleteStudentProps {
  record: Record;
  onReload: () => void;
}

const DeleteStudent: React.FC<DeleteStudentProps> = ({ record, onReload }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async (record: Record) => {
    const response = await deleteAccount(record.id);
    // const response = true;
    if (response) {
      onReload();
      messageApi.open({
        type: 'success',
        content: 'Delete Success',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Delete Fail',
      });
    }
  }

  return (
    <>
      {contextHolder}
      <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
        <Tooltip title='Button Delete'>
          <Button danger icon={<DeleteOutlined />} />
        </Tooltip>
      </Popconfirm>
    </>
  );
}

export default DeleteStudent;
