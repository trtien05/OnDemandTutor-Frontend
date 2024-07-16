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
  totalElements: number;
  loading: boolean;
}

const formatPrice = (price: number) => {
  const safePrice = Number(price) || 0;
  return `${safePrice.toLocaleString()} đ`;
}

const SalaryTable: React.FC<SalaryTableProps> = ({ withdrawRequest, onReload, onPageChange, currentPage, pageSize, totalElements, loading }) => {

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
      sorter: (a, b) => (a.month || 0) - (b.month || 0),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      sorter: (a, b) => (a.year || 0) - (b.year || 0),
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
          total: totalElements,
        }}
        loading={loading}
      />
    </div>
  );
};

export default SalaryTable;
