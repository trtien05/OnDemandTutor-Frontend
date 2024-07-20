import { Table, TableColumnsType } from 'antd';
import React from 'react'

interface Report {
  id: number;
  fullName?: string;
  totalProfit?: number;
  totalTuition?: number;
  totalAppointment?: number;
}

interface ReportTableProps {
  reportByStudent: Report[];
  loading: boolean;
}


const formatPrice = (price: number) => {
  const safePrice = Number(price) || 0;
  return `${safePrice.toLocaleString()} đ`;
}

const StudentReportTable: React.FC<ReportTableProps> = ({ reportByStudent, loading }) => {
  const columns: TableColumnsType<Report> = [
    {
      title: 'No',
      render: (_, __, index: number) => index + 1,
    },

    {
      title: 'Student Name',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName!.localeCompare(b.fullName!),
      filters: [...new Set(reportByStudent.map(report => report.fullName).filter(name => name !== undefined))].map(name => ({ text: name!, value: name! })),
      onFilter: (value, record) => record.fullName === value,
    },
    {
      title: 'Total Tuition',
      dataIndex: 'totalTuition',
      sorter: (a, b) => a.totalTuition! - b.totalTuition!,
      render: (text: number) => formatPrice(text),
    },
    {
      title: 'Total Profit',
      dataIndex: 'totalProfit',
      sorter: (a, b) => a.totalProfit! - b.totalProfit!,
      render: (text: number) => formatPrice(text),
    },
    {
      title: 'Total Appointment',
      dataIndex: 'totalAppointment',
      sorter: (a, b) => a.totalAppointment! - b.totalAppointment!,
    },


  ];

  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={reportByStudent}
        loading={loading}
        pagination={{ pageSize: 7 }}
      />
    </div>
  )
}

export default StudentReportTable