import { Avatar, Badge, Dropdown, Space } from 'antd';
import UserOutlined from '@ant-design/icons';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import Link from '../../components/Link';
import Notify from '../../components/Notify';
import config from '../../config';
import { theme } from '../../themes';

import { ToolbarProps } from './Toolbar.type';
import * as Styled from './Toolbar.styled';

const Toolbar = ({
    menu,
    notifications,
    cartItems = -1,
    avatar,
    handleReadAll,
    handleReadOne,
}: ToolbarProps) => {
    return (
        <Styled.ToolbarAvatarWrapper>
            {notifications && (
                <Badge
                    count={notifications.filter((notification) => !notification.read).length}
                    showZero
                >
                    <Notify
                        items={notifications}
                        handleReadAll={handleReadAll}
                        handleReadOne={handleReadOne}
                    />
                </Badge>
            )}

            {/* {cartItems >= 0 && (
                <Badge showZero count={cartItems}>
                    <Link to={config.routes.customer.cart}>
                        <AiOutlineShoppingCart
                            size={28}
                            color={theme.colors.textPrimary}
                            cursor="pointer"
                        />
                    </Link>
                </Badge>
            )} */}

            <Dropdown menu={{ items: menu }} arrow placement="bottomRight" trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                    {avatar ? (
                        <Avatar size={40} src={avatar} alt="avatar" />
                    ) : (
                        // <Avatar size={40} icon={<UserOutlined />} />
                    )}
                </Space>
            </Dropdown>
        </Styled.ToolbarAvatarWrapper>
    );
};

export default Toolbar;
