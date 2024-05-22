import { Col, List, Row, Typography } from 'antd';
import Container from '../../../components/Container';
import Link from '../../../components/Link';
import { aboutUs, pages, socials } from './Footer.data';
import * as Styled from './Footer.styled';
import myTutor from '../../../assets/images/mytutor.png'
const { Title, Text } = Typography;
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Footer = () => {
    const categoryList = [
        {
            id: 1,
            titleName: 'IELTS',
        },
        {
            id: 2,
            titleName: 'TOEIC',
        },
        {
            id: 3,
            titleName: 'TOEFL',
        },
        {
            id: 4,
            titleName: 'CAMBRIDGE',
        },
    ]

    return (
        <>
            {/* {contextHolder} */}

            <Styled.FooterSection>
                <Container>
                    <Row gutter={24}>
                        <Col lg={5} sm={12} xs={24}>
                            <Styled.MyTutorImage src={myTutor} />
                        </Col>

                        <Col lg={5} sm={12} xs={24}>
                            <Styled.FooterColumnWrapper>
                                <Title level={2}>LEARN</Title>

                                <List
                                    itemLayout="vertical"
                                    dataSource={categoryList}
                                    renderItem={(category) => (
                                        <List.Item key={category.id}>
                                            <Styled.FooterSocialsLink to={'/'}>
                                                {category.titleName}
                                            </Styled.FooterSocialsLink>
                                        </List.Item>
                                    )}
                                />
                            </Styled.FooterColumnWrapper>
                        </Col>

                        <Col lg={5} sm={12} xs={24}>
                            <Styled.FooterColumnWrapper>
                                <Title level={2}>PAGE</Title>

                                <List
                                    itemLayout="vertical"
                                    dataSource={pages}
                                    renderItem={(page) => (
                                        <List.Item key={page.key}>
                                            <Link to={page.to}>{page.title}</Link>
                                        </List.Item>
                                    )}
                                />
                            </Styled.FooterColumnWrapper>
                        </Col>

                        <Col lg={5} sm={12} xs={24}>
                            <Styled.FooterColumnWrapper>
                                <Title level={2}>CONTACT</Title>

                                <List
                                    itemLayout="vertical"
                                    dataSource={aboutUs}
                                    renderItem={(about) => (
                                        <List.Item key={about.key}>
                                            <Link to={about.to} target={about.target}>
                                                {about.key === 2 ? <IoMail /> : <FaPhoneAlt />}  {about.title}
                                            </Link>
                                        </List.Item>
                                    )}
                                />
                            </Styled.FooterColumnWrapper>
                        </Col>

                        <Col md={4} xs={24}>
                            <Styled.FooterSocials>
                                {socials.map((social) => {
                                    const Icon = social.icon;

                                    return (
                                        <Link
                                            key={social.key}
                                            to={social.to}
                                            aria-label={social.label}
                                        >
                                            {Icon && <Icon size={20} />}
                                        </Link>
                                    );
                                })}
                            </Styled.FooterSocials>
                        </Col>
                    </Row>

                    <Styled.FooterRow align="middle" justify={'space-between'}>
                        <Col lg={24} md={14} xs={24}>
                            <Styled.FooterCopyright>
                                <Text>
                                    @2024 Copyright All Rights Reserved
                                </Text>
                                <Text>
                                    Privacy Policy
                                </Text>
                                <Text>
                                    Legal Center
                                </Text>
                            </Styled.FooterCopyright>
                        </Col>


                    </Styled.FooterRow>
                </Container>
            </Styled.FooterSection>
        </>
    );
};

export default Footer;
