import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import config from '../../config';
import { TeamOutlined, UsergroupAddOutlined, ProjectOutlined } from '@ant-design/icons';
import { GrMoney } from "react-icons/gr";
import { GrDocumentPerformance } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosTimer } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";

const MenuSider: React.FC = () => {

  const items: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <LuLayoutDashboard />,
      label: <Link to={config.routes.admin.dashboard}>Dashboard</Link>,
    },
    {
      key: config.routes.admin.manageAdmin,
      icon: <RiAdminLine />,
      label: <Link to={config.routes.admin.manageAdmin}>Admin</Link>,
    },
    {
      key: config.routes.admin.manageModerator,
      icon: <ProjectOutlined />,
      label: <Link to={config.routes.admin.manageModerator}>Moderator</Link>,
    },
    {
      key: config.routes.admin.manageTutor,
      icon: <TeamOutlined />,
      label: <Link to={config.routes.admin.manageTutor}>Tutor</Link>,
    },
    {
      key: config.routes.admin.manageStudent,
      icon: <UsergroupAddOutlined />,
      label: <Link to={config.routes.admin.manageStudent}>Student</Link>,
    },
    {
      key: config.routes.admin.manageSalary,
      icon: <GrMoney />,
      label: <Link to={config.routes.admin.manageSalary}>Salary</Link>,
    },
    {
      key: 'Report',
      icon: <GrDocumentPerformance />,
      label: <span style={{ fontWeight: 500 }}>Report</span>,
      children: [
        {
          key: config.routes.admin.manageReportByAppointment,
          icon: <IoIosTimer />,
          label: <Link to={config.routes.admin.manageReportByAppointment}>Appointment</Link>
        },
        {
          key: config.routes.admin.manageReportByTutor,
          icon: <TeamOutlined />,
          label: <Link to={config.routes.admin.manageReportByTutor}>Tutor</Link>
        },
        {
          key: config.routes.admin.manageReportByStudent,
          icon: <UsergroupAddOutlined />,
          label: <Link to={config.routes.admin.manageReportByStudent}>Student</Link>
        },
      ]
    }
  ];

  return (
    <div>
      <Menu
        style={{ border: 'none' }}
        items={items}
        mode="inline"
        defaultOpenKeys={['dashboard']}
        defaultSelectedKeys={['dashboard']}
      />
    </div>
  );
};

export default MenuSider;
