import { Table, TableColumnsType } from 'antd';
import React from 'react';

interface Report {
  id: number;
  createdAt?: string;
  studentFullName?: string;
  tutorFullName?: string;
  appointmentTuition?: number;
  totalProfit?: number;
  tutorIncome?: number;
  tutorFeePercentage?: number;
}

interface ReportTableProps {
  reportByAppointment: Report[];
  loading: boolean;
}

const formatPrice = (price: number) => {
  const safePrice = Number(price) || 0;
  return `${safePrice.toLocaleString()} đ`;
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Date(date).toLocaleString('vi-VN', options);
}
const generateLast12MonthsFilters = () => {
  const filters = [];
  const date = new Date();
  for (let i = 0; i < 12; i++) {
    const month = date.toLocaleString('vi-VN', { month: '2-digit', year: 'numeric' });
    filters.push({
      text: month,
      value: month,
    });
    date.setMonth(date.getMonth() - 1);
  }
  return filters;
}
const AppointmentReportTable: React.FC<ReportTableProps> = ({ reportByAppointment, loading }) => {
  const columns: TableColumnsType<Report> = [
    {
      title: 'No',
      render: (_, __, index: number) => index + 1,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
      render: (text: string) => formatDate(text),
      filters: generateLast12MonthsFilters(),
      onFilter: (value, record) => {
        const recordDate = new Date(record.createdAt!);
        const recordMonthYear = recordDate.toLocaleString('vi-VN', { month: '2-digit', year: 'numeric' });
        return recordMonthYear === value;
      },
    },
    {
      title: 'Student Name',
      dataIndex: 'studentFullName',
      sorter: (a, b) => a.studentFullName!.localeCompare(b.studentFullName!),
      filters: [...new Set(reportByAppointment.map(report => report.studentFullName).filter(name => name !== undefined))].map(name => ({ text: name!, value: name! })),
      onFilter: (value, record) => record.studentFullName === value,
    },
    {
      title: 'Profit',
      dataIndex: 'totalProfit',
      sorter: (a, b) => a.totalProfit! - b.totalProfit!,
      render: (text: number) => formatPrice(text),
    },
    {
      title: 'Tutor Fee',
      dataIndex: 'tutorFeePercentage',
      sorter: (a, b) => a.tutorFeePercentage! - b.tutorFeePercentage!,
      render: (text: number) => `${text}%`,
    },
    {
      title: 'Appointment Tuition',
      dataIndex: 'appointmentTuition',
      sorter: (a, b) => a.appointmentTuition! - b.appointmentTuition!,
      render: (text: number) => formatPrice(text),
    },
    {
      title: 'Tutor Name',
      dataIndex: 'tutorFullName',
      sorter: (a, b) => a.tutorFullName!.localeCompare(b.tutorFullName!),
      filters: [...new Set(reportByAppointment.map(report => report.tutorFullName).filter(name => name !== undefined))].map(name => ({ text: name!, value: name! })),
      onFilter: (value, record) => record.tutorFullName === value,
    },
    {
      title: 'Tutor Income',
      dataIndex: 'tutorIncome',
      sorter: (a, b) => a.tutorIncome! - b.tutorIncome!,
      render: (text: number) => formatPrice(text),
    }
  ];

  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={reportByAppointment}
        loading={loading}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
}

export default AppointmentReportTable;
