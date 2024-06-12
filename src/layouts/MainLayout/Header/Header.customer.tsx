import {
    AiOutlineCalendar,
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineLogout,
    AiOutlineShopping,
    AiOutlineShoppingCart,
    AiOutlineTag,
} from 'react-icons/ai';
import { Avatar, Divider, Typography } from 'antd';
import { HeaderAvatarWrapper, NavbarLink } from './Header.styled';
import { MenuType, PIIProps } from './Header.type';

import Link from '../../../components/Link'
import { LinkEnum } from '../../../utils/enums';
import { UserOutlined } from '@ant-design/icons';
import config from '../../../config';
import cookieUtils from '../../../utils/cookieUtils';

const { Text } = Typography;

/* ==================== Menu ==================== */
const createMenuItem = (
    key: string,
    icon: JSX.Element,
    title: string,
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
) => ({
    key: key,
    label: (
        <Link to={key} onClick={onClick}>
            {icon}
            {title}
        </Link>
    ),
});

export const menuUnLogged = () => {
    const menu: MenuType[] = [
        createMenuItem(config.routes.public.home, <AiOutlineHome size={20} />, 'Trang chủ'),
        createMenuItem(config.routes.student.profile, <AiOutlineShopping size={20} />, 'Cửa hàng'),
        createMenuItem(
            config.routes.student.profile,
            <AiOutlineTag size={20} />,
            'Dịch vụ của tôi',
        ),
        createMenuItem(
            config.routes.student.profile,
            <AiOutlineCalendar size={20} />,
            'Lịch sử dụng',
        ),
        createMenuItem(config.routes.public.login, <AiOutlineLogin size={20} />, 'Login'),
    ];

    return menu;
};

export const menuLogged = (user: PIIProps) => {
    const handleLogout = () => {
        cookieUtils.removeItem(config.cookies.token);
    };

    const menu: MenuType[] = [
        {
            key: config.routes.student.profile,
            label: (
                <HeaderAvatarWrapper>
                    <Link to={config.routes.student.profile}>
                        {user?.avatar ? (
                            <Avatar size={90} src={user.avatar} alt={user.fullName} />
                        ) : (
                            <Avatar size={90} icon={<UserOutlined />} />
                        )}
                    </Link>
                    <Text>{user?.fullName}</Text>
                    <Divider />
                </HeaderAvatarWrapper>
            ),
        },

        ...menuUnLogged().slice(0, -1),

        createMenuItem(
            config.routes.student.profile,
            <AiOutlineShoppingCart size={20} />,
            'Giỏ hàng của tôi',
        ),
        createMenuItem(
            config.routes.public.login,
            <AiOutlineLogout size={20} />,
            'Logout',
            handleLogout,
        ),
    ];

    return menu;
};

/* ==================== Navbar ==================== */
const navbarProps = {
    type: LinkEnum.NAV_LINK,
    underline: true,
    scroll: true,
};

const createNavbarItem = (key: string, title: string) => ({
    key: key,
    label: (
        <NavbarLink to={key} {...navbarProps}>
            {title}
        </NavbarLink>
    ),
});

export const navbar: MenuType[] = [
    createNavbarItem(config.routes.public.home, 'Home'),
    createNavbarItem(config.routes.public.searchClasses, 'Classes'),
    createNavbarItem(config.routes.public.searchTutors, 'Tutors'),
    createNavbarItem(config.routes.public.contact, 'Contact'),
    createNavbarItem(config.routes.student.registerTutor, 'Become A Tutor'),
    createNavbarItem(config.routes.public.login, 'Login'),


];
