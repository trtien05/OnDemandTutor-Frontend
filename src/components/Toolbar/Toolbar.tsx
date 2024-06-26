import { Avatar, Dropdown, Space } from 'antd';
import UserOutlined from '@ant-design/icons';


import { ToolbarProps } from './Toolbar.type';
import * as Styled from './Toolbar.styled';

const Toolbar = ({
    menu,
    avatar
}: ToolbarProps) => {
    return (
        <Styled.ToolbarAvatarWrapper>


            <Dropdown menu={{ items: menu }} arrow placement="bottomRight" trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                    {avatar ? (
                        <Avatar size={40} src={avatar} alt="avatar" />
                    ) : (
                        <Avatar size={40} icon={<UserOutlined />} />
                    )}
                </Space>
            </Dropdown>
        </Styled.ToolbarAvatarWrapper>
    );
};

export default Toolbar;
