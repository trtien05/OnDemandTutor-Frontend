import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import config from '../../config';

const MenuSider: React.FC = () => {
  const location = useLocation();

  const items: MenuProps['items'] = [
    {
      key: 'muc-0',
      icon: <MailOutlined />,
      label: <Link to={config.routes.admin.dashboard}>Dashboard</Link>,
    },
    {
      key: 'muc-1',
      icon: <AppstoreOutlined />,
      label: 'Muc 1',
      children: [
        {
          key: 'muc_1-1',
          label: 'Muc 1-1',
        },
      ],
    },
    {
      key: config.routes.admin.manageModerator,
      icon: <HomeOutlined />,
      label: <Link to={config.routes.admin.manageModerator}>Moderater</Link>,
    },
    {
      key: config.routes.admin.manageTutor,
      icon: <HomeOutlined />,
      label: <Link to={config.routes.admin.manageTutor}>Tutor</Link>,
    },
    {
      key: config.routes.admin.manageStudent,
      icon: <HomeOutlined />,
      label: <Link to={config.routes.admin.manageStudent}>Student</Link>,
    }
  ];

  return (
    <div>
      <Menu
        items={items}
        mode="inline"
        defaultOpenKeys={['muc-0']}
        defaultSelectedKeys={[location.pathname]}
      />
    </div>
  );
};

export default MenuSider;
