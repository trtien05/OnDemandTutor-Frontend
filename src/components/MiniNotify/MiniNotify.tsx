import React from 'react';
import { Dropdown, Button, MenuProps, Space, Avatar, Typography, Divider, Menu } from 'antd';
import { BellOutlined, EditOutlined, LogoutOutlined, ProjectOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import * as Styled from './MiniNotify.syled';
import { UserType } from '../../hooks/useAuth';
const { Text } = Typography;

type MiniNotifyProps = {
  user: UserType | undefined;
};

const items: MenuProps['items'] = [
  {
    key: 'edit-profile',
    label: (
      <Space>
        <EditOutlined />
        Edit Profile
      </Space>
    ),
  },
  {
    key: 'account-settings',
    label: (
      <Space>
        <SettingOutlined />
        Account Settings
      </Space>
    ),
  },
  {
    key: 'projects',
    label: (
      <Space>
        <ProjectOutlined />
        Projects
      </Space>
    ),
  },
  {
    key: 'logout',
    label: (
      <Space>
        <LogoutOutlined />
        Logout
      </Space>
    ),
  },
];
const MiniNotify: React.FC<MiniNotifyProps> = ({ user }) => {
  return (
    <div>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        dropdownRender={(menus) => (
          <>
            <Styled.Dropdown>
              <Styled.Head>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size={40} src={user?.avatarUrl} alt="avatar" />
                  <div style={{ marginLeft: 10 }}>
                    <Text strong>{user?.fullName}</Text>
                    <br />
                    <Text type="secondary">{user?.role}</Text>
                  </div>
                </div>
              </Styled.Head>
              <Styled.Body>
                {menus}
              </Styled.Body>
            </Styled.Dropdown>
          </>
        )}
      >

        <Space style={{ cursor: 'pointer' }}>
          {user ? (
            <Avatar size={40} src={user.avatarUrl} alt="avatar" />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} />
          )}
        </Space>
      </Dropdown>
    </div>
  );
}

export default MiniNotify;
