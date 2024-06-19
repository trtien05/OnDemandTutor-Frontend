import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useAuth from '../../hooks/useAuth';
import { getTutorDetail } from '../../api/tutorProfileAPI';
import { Details } from './TutorProfile.type';
import { Avatar, Button, Col, Flex, Input, Row, Skeleton, Space, Spin, Typography, notification } from 'antd';
import * as Style from './TutorProfile.styled';
import Container from '../../components/Container';
import { UserOutlined } from '@ant-design/icons';
import { theme } from '../../themes';
import * as FormStyled from '../BecomeTutor/Form.styled'
import ReactPlayer from 'react-player';


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
    const [url, setUrl] = useState<string>("");
    const [priceValue, setPriceValue] = useState<string>("");

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

    const isValidYouTubeUrl = (url: string): boolean => {
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        return regex.test(url);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        if (isValidYouTubeUrl(url)) {
            setUrl(url);
        } else {
            setUrl("");
        }
    };

    const onChange = (value: number | string | null) => {
        if (typeof value === "string") {
          setPriceValue(value);
        } else if (value === null) {
          setPriceValue("");
        } else {
          setPriceValue(value.toString());
        }
      };

      const formatNumberValue = (value: number | string): number => {
        if (typeof value === "string") {
          // Remove non-digit characters from the string
          const numericString = value.replace(/\D/g, "");
          // Convert the cleaned string to a number
          return parseFloat(numericString);
        } else {
          // If the value is already a number, return it directly
          return value;
        }
      };
      const formatter = (value: number | string | undefined) => {
        if (!value) return "";
        // Use the helper function to ensure value is a number
        const numberValue = formatNumberValue(value);
        // Use Intl.NumberFormat for Vietnamese locale
        const formattedValue = new Intl.NumberFormat("vi-VN").format(numberValue);
        return formattedValue;
      };
      const parser = (value: string | undefined) => {
        // Remove non-digit characters (commas, spaces, etc.)
        return value ? value.replace(/\D/g, "") : "";
      };



    return (
        <>
            <Style.ProfileContainer>
                <Container>
                    <Spin spinning={loading} tip="Đang tải...">
                        <Flex vertical gap={44}>
                            <Style.ProfileWrapper>
                                <Row gutter={40}>
                                    <Col xl={12} lg={12} sm={24} xs={24}>
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

                                    <Col xl={12} lg={12} sm={24} xs={24}>
                                        <Title level={3}>Tutor details</Title>



                                        <FormStyled.FormWrapper 
                                        // onFinish={onFinish}
                                        // initialValues={initialValues}
                                        labelAlign="left"
                                        layout="vertical"
                                        requiredMark={false}
                                        size="middle">
                                            
                                            <FormStyled.FormItem
                                                $width={"100%"}
                                                name="amount"
                                                label="Hourly base rate"
                                                rules={[
                                                    {
                                                        required: true,
                                                        type: 'number',
                                                        min: 0,
                                                        max: 1000000
                                                    },
                                                ]}>
                                                <FormStyled.NumberInput
                                                    style={{ width: '100%' }}
                                                    placeholder="100,000"
                                                    value={priceValue}
                                                    formatter={formatter}
                                                    parser={parser}
                                                    onChange={onChange}
                                                >
                                                </FormStyled.NumberInput>
                                            </FormStyled.FormItem>
                                            <FormStyled.FormDescription>
                                                We will charge a 15% commission fee on each lesson. This fee is for the maintenance of the platform and marketing purposes.
                                                The remaining will be transferred automatically to your bank account every 28 days.
                                            </FormStyled.FormDescription>

                                            <FormStyled.FormItem 
                                            name="description" 
                                            $width={"100%"}
                                            label="Profile description">
                                                <FormStyled.CommentInput rows={6} placeholder="Tell us about yourself..." />
                                            </FormStyled.FormItem>


                                        
                                            <FormStyled.FormItem
                                                name="meetingLink"
                                                label="Google Meet Link"
                                                $width={"100%"}
                                                rules={[
                                                    {
                                                        pattern:
                                                            /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}(?:\?pli=1)?$/,
                                                        message: "Invalid Google Meet link.",
                                                    },
                                                    {
                                                        required: true,
                                                        message: "Please provide your Google Meet link.",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="Paste your Google Meet link"
                                                ></Input>
                                            </FormStyled.FormItem>
                                           
                                            <FormStyled.FormItem
                                                name="youtubeLink"
                                                label="Video introduction"
                                                $width={"100%"}
                                                rules={[
                                                    {
                                                        pattern:
                                                            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                                                        message: "Invalid Youtube link.",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    placeholder="Paste a Youtube link to your video"
                                                ></Input>
                                            </FormStyled.FormItem>
                                            {url && (
                                                // style={{ width: "100%", height: "100%", display: "flex" }}
                                                <div style={{ width: "100%", marginTop: "10px" }}>
                                                    <ReactPlayer url={url} controls={true} width="100%" />
                                                </div>
                                            )}
                                        </FormStyled.FormWrapper>
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