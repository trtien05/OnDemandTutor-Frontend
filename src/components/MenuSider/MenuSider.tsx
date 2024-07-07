import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import config from '../../config';
import { TeamOutlined, UsergroupAddOutlined, ProjectOutlined } from '@ant-design/icons';
import { LuLayoutDashboard } from "react-icons/lu";

const MenuSider: React.FC = () => {

  const items: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <LuLayoutDashboard />,
      label: <Link to={config.routes.admin.dashboard}>Dashboard</Link>,
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
