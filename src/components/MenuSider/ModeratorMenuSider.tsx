import { Menu } from 'antd';
import { UserOutlined, FileDoneOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import config from '../../config';

const MenuSider: React.FC = () => {
  const location = useLocation();

  const items: MenuProps['items'] = [
    {
      key: 'muc-0',
      icon: <UserOutlined />,
      label: <Link to={config.routes.moderator.manageTutor}>Tutor</Link>,
      children: [
        {
          key: 'muc_1-1',
          label: 'Muc 1-1',
        },
      ],
    },
    {
      key: 'muc-1',
      icon: <QuestionCircleOutlined />,
      label: 'Question',
      
    },
    {
      key: config.routes.admin.manageModerator,
      icon: <FileDoneOutlined />,
      label: <Link to={config.routes.moderator.manageDocument}>Document</Link>,
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
