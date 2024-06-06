import { Col, Row, List, Flex } from 'antd';
import { MenuProps } from 'antd/lib';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Container from '../../../components/Container';
import Logo from '../../../components/Logo';

import Toolbar from '../../../components/Toolbar';
import config from '../../../config';
import cookieUtils from '../../../utils/cookieUtils';

import { HeaderProps, MenuType } from './Header.type';
import * as Styled from './Header.styled';
import MobileMenu from '../../../components/Mobile/MobileMenu';




const items: MenuProps['items'] = [
    {
        label: <Link to={config.routes.student.profile}>Trang cá nhân</Link>,
        key: config.routes.student.profile,
    },
    {
        type: 'divider',
    },
    {
        label: (
            <Link to={config.routes.public.login} onClick={() => cookieUtils.clear()}>
                Đăng xuất
            </Link>
        ),
        key: config.routes.public.login,
    },
];

const Header = ({ role, navbar, menu, avatar }: HeaderProps) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    // Re-render component when login with Google
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== config.routes.public.home) return;

        navigate(config.routes.public.home);
    }, [location.search]);

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const transitionNavBar = () => {
        if (window.scrollY > 0) {
            setShow(true);
        } else setShow(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, []);



    return (
        <Styled.Header $isScroll={show}>
            <Container>
                <Row align="middle" justify={'space-between'}>
                    <Styled.ColumnStyle lg={5}>
                        <Logo to={config.routes.public.home} />
                    </Styled.ColumnStyle>

                    <Col lg={15} md={0} sm={0} xs={0}>
                        <Styled.Navbar
                            split={false}
                            dataSource={navbar}
                            renderItem={(item: MenuType) => (
                                <List.Item key={item.key}>{item.label}</List.Item>
                            )}
                        />
                    </Col>


                    {role ? (
                        <Col lg={4} md={0} sm={0} xs={0}>
                            <Toolbar
                                menu={items}
                                avatar={avatar}
                            />
                        </Col>
                    ) : (
                        <Col lg={4} md={0} sm={0} xs={0}>
                            <Styled.HeaderButton
                                onClick={() => navigate(config.routes.public.login)}
                            >
                                ĐĂNG NHẬP
                            </Styled.HeaderButton>
                        </Col>
                    )}

                    <Col lg={0}>
                        <Flex gap={16}>


                            <MobileMenu menu={menu} />
                        </Flex>
                    </Col>
                </Row>
            </Container>
        </Styled.Header>
    );
};

export default Header;
