import React from 'react';
import { Dropdown, MenuProps, Space, Avatar, Typography } from 'antd';
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import * as Styled from './MiniNotify.syled';
import { UserType } from '../../hooks/useAuth';
import cookieUtils from '../../utils/cookieUtils';
import config from '../../config';
import { Link } from 'react-router-dom';
const { Text } = Typography;

type MiniNotifyProps = {
  user: UserType | undefined;
};

const items: MenuProps['items'] = [
  {
    key: 'logout',
    label: (
      <Link to={config.routes.public.login} onClick={() => cookieUtils.clear()}>
        <Space >
          <LogoutOutlined />
          Logout
        </Space>
      </Link>
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
