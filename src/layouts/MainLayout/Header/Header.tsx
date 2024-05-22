import { Badge, Col, Flex, List, Row } from 'antd';
import { MenuProps } from 'antd/lib';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Container from '../../../components/Container';
import Logo from '../../../components/Logo';
import Notify from '../../../components/Notify';
import MobileMenu from '../../../components/Mobile/MobileMenu';
import Toolbar from '../../../components/Toolbar';
import config from '../../../config';
import cookieUtils from '../../../config';

import { HeaderProps, MenuType } from './Header.type';
import * as Styled from './Header.styled';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { NotificationType } from '../../../components/Toolbar/Toolbar.type';

// import { getAllNotifications, markAllAsRead, markAsRead } from '@/utils/notificationAPI';

// const items: MenuProps['items'] = [
//     {
//         label: <Link to={config.routes.customer.profile}>Trang cá nhân</Link>,
//         key: config.routes.customer.profile,
//     },
//     {
//         type: 'divider',
//     },
//     {
//         label: (
//             <Link to={config.routes.public.login} onClick={() => cookieUtils.clear()}>
//                 Đăng xuất
//             </Link>
//         ),
//         key: config.routes.public.login,
//     },
// ];

const Header = ({ navbar }: HeaderProps) => {
    // const [reload, setReload] = useState(0);
    // const [notifications, setNotifications] = useState<NotificationType[]>([]);

    // function onMessageReceived({ body }: { body: string }) {
    //     setNotifications((prev) => [...prev, JSON.parse(body)]);
    // }

    // Receive real time notification
    // useEffect(() => {
    //     if (!userId) return;

    //     // Create a new WebSocket connection and a Stomp client
    //     const socket = new SockJS(`${config.publicRuntime.API_URL}/ws`);
    //     let client = Stomp.over(socket);
    //     client.debug = () => { };

    //     // Handle connect
    //     const onConnect = () => {
    //         client.subscribe(`/user/${userId}/queue/notification`, onMessageReceived);
    //     };

    //     // Connect to the WebSocket server
    //     try {
    //         client.connect({}, onConnect);
    //     } catch (error: any) {
    //         console.log(error.response ? error.response.data : error.message);
    //     }

    //     // Clean up WebSocket connection when component unmounts
    //     return () => {
    //         if (client && client.connected) {
    //             client.disconnect(() => { }, {});
    //             client.unsubscribe(`/user/${userId}/queue/notification`);
    //         }
    //     };
    // }, [userId]);

    // Get all notifications
    // useEffect(() => {
    //     if (!userId) return;

    //     (async () => {
    //         try {
    //             const { data } = await getAllNotifications();
    //             setNotifications(data);
    //         } catch (error: any) {
    //             console.log(error.response ? error.response.data : error.message);
    //         }
    //     })();
    // }, [reload, userId]);

    // Re-render component when login with Google
    // const location = useLocation();
    // useEffect(() => {
    //     if (location.pathname !== config.routes.public.home) return;

    //     navigate(config.routes.public.home);
    // }, [location.search]);

    // const navigate = useNavigate();
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

    // const handleReadAll = async () => {
    //     await markAllAsRead();
    //     setReload(reload + 1);
    // };

    // const handleReadOne = async (notificationId: number) => {
    //     await markAsRead(notificationId);
    //     setReload(reload + 1);
    // };

    return (
        <Styled.Header $isScroll={show}>
            <Container>
                <Row align="middle" justify={'space-between'}>
                    <Styled.ColumnStyle lg={5}>
                        <Logo to={config.routes.public.home} />
                    </Styled.ColumnStyle>

                    <Col lg={19} md={0} sm={0} xs={0}>
                        <Styled.Navbar
                            split={false}
                            dataSource={navbar}
                            renderItem={(item: MenuType) => (
                                <List.Item key={item.key}>{item.label}</List.Item>
                            )}
                        />
                    </Col>


                    {/* {role ? (
                        <Col lg={4} md={0} sm={0} xs={0}>
                            <Toolbar
                                menu={items}
                                notifications={[...notifications].reverse()}
                                cartItems={cartItems}
                                avatar={avatar}
                                handleReadAll={handleReadAll}
                                handleReadOne={handleReadOne}
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
                    )} */}

                    <Col lg={0}>
                        <Flex gap={16}>
                            {/* {role && (
                                <Badge
                                    count={notifications.filter((noti) => !noti.read).length}
                                    showZero
                                >
                                    <Notify
                                        items={[...notifications].reverse()}
                                        handleReadAll={handleReadAll}
                                        handleReadOne={handleReadOne}
                                    />
                                </Badge>
                            )} */}

                            <MobileMenu menu={navbar} />
                        </Flex>
                    </Col>
                </Row>
            </Container>
        </Styled.Header>
    );
};

export default Header;
