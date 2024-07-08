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
      key: 'tutor',
      icon: <UserOutlined />,
      label: <Link to={config.routes.moderator.manageTutor}>Tutor</Link>,
    },
    {
      key: 'question',
      icon: <QuestionCircleOutlined />,
      label: 'Question',
      
    },
    {
      key: 'document',
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
