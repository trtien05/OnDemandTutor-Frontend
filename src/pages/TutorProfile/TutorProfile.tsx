import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useAuth from '../../hooks/useAuth';
import { getTutorDetail } from '../../api/tutorProfileAPI';
import { Details } from './TutorProfile.type';
import { Avatar, Col, Flex, Row, Skeleton, Spin, Typography, notification } from 'antd';
import * as Style from './TutorProfile.styled';
import Container from '../../components/Container';
import { UserOutlined } from '@ant-design/icons';


const { Title, Paragraph, Text } = Typography;

const TutorProfile = () => {
    useDocumentTitle('Tutor Profile');
    const [tutorDetails, setTutorDetails] = useState<Details>();
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const { user, role } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(user?.avatarUrl ? user?.avatarUrl : null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!user || !(role == "TUTOR")) return;

                const { data } = await getTutorDetail(user.id);

                setTutorDetails(data);

                // setPurchaseHistory(data.purchaseHistory.slice(0, 9));
                // setUsageHistory(data.usageHistory.slice(0, 9));
                // setCustomer(data);
                // setImageUrl(data.userInfo.avatar);
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload, user]);



    return (
        <>
            <Style.ProfileContainer>
                <Container>
                    <Spin spinning={loading} tip="Đang tải...">
                        <Flex vertical gap={44}>
                            <Style.ProfileWrapper>
                                <Row gutter={40}>
                                    <Col span={12}>
                                        <Style.ProfileContent vertical align="center">
                                            {user?.avatarUrl ? (
                                                <Avatar
                                                    src={user?.avatarUrl}
                                                    size={125}
                                                />
                                            ) : (
                                                <Avatar
                                                    icon={<UserOutlined />}
                                                    size={125}
                                                />
                                            )}
                                            <Title level={1}>{user?.fullName}</Title>
                                            <Text>Tutoring since: </Text>
                                            <Style.ProfileInfoItem vertical gap={10}>
                                                <Title level={3}>Overview</Title>

                                                <Style.ProfileInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Total tutoring hours:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                   15
                                                                </Text>
                                                                <Text>hours</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>

                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Income made:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {(4000000).toLocaleString()}
                                                                </Text>
                                                                <Text>VND</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                </Style.ProfileInfoBox>
                                            </Style.ProfileInfoItem>
                                            <Style.ProfileInfoItem vertical gap={10}>
                                                <Title level={3}>This month</Title>

                                                <Style.ProfileInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Total tutoring hours:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                   15
                                                                </Text>
                                                                <Text>hours</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>

                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Income made:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {(4000000).toLocaleString()}
                                                                </Text>
                                                                <Text>VND</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                </Style.ProfileInfoBox>
                                            </Style.ProfileInfoItem>
                                        </Style.ProfileContent>
                                    </Col>
                                </Row>
                            </Style.ProfileWrapper>
                        </Flex>
                    </Spin>
                </Container>
            </Style.ProfileContainer>
        </>
    )
}

export default TutorProfile