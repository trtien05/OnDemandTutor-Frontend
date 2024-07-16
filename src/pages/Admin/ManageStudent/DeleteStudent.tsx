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
      messageApi.open({
        type: 'success',
        content: 'Ban Account Success',
      });
      setTimeout(() => {
        onReload();
      }, 1000);
    } else {
      messageApi.open({
        type: 'error',
        content: 'Ban Account Fail',
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
