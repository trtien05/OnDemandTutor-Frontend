import { Table, TableColumnsType, Tag } from 'antd';
import React from 'react';
import EditSalary from './EditSalary';

interface Account {
  id: number;
  bankAccountNumber?: string;
  bankAccountOwner?: string;
  bankName?: string;
  month?: number;
  year?: number;
  amount: number;
  status?: string;
};

interface SalaryTableProps {
  withdrawRequest: Account[];
  onReload: () => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  pageSize: number;
}

const formatPrice = (price: number) => {
  const safePrice = Number(price) || 0;
  return `${safePrice.toLocaleString()} đ`;
}

const SalaryTable: React.FC<SalaryTableProps> = ({ withdrawRequest, onReload, onPageChange, currentPage, pageSize }) => {

  const columns: TableColumnsType<Account> = [
    {
      title: 'No',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
    },
    {
      title: 'Bank Account Number',
      dataIndex: 'bankAccountNumber',
    },
    {
      title: 'Bank Account Owner',
      dataIndex: 'bankAccountOwner',
    },
    {
      title: 'Month',
      dataIndex: 'month',
    },
    {
      title: 'Year',
      dataIndex: 'year',
    },
    {
      title: 'Salary',
      dataIndex: 'amount',
      render: (_, record) => formatPrice(record.amount),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'DONE', value: 'DONE' },
        { text: 'PROCESSING', value: 'PROCESSING' },
        { text: 'REJECTED', value: 'REJECTED' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, record) => (
        <Tag color={
          record.status === 'DONE' ? 'green' :
            record.status === 'PROCESSING' ? 'orange' :
              record.status === 'REJECTED' ? 'red' : ''
        }>
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Account) => (
        <EditSalary record={record} onReload={onReload} />
      ),
    }
  ];

  return (
    <div>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={withdrawRequest}
        scroll={{ x: true }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: onPageChange,
          showSizeChanger: false,
          total: withdrawRequest.length * 2,

        }}
      />
    </div>
  );
};

export default SalaryTable;
