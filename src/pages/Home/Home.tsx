import * as Styled from './Home.styled';

import { Col, Collapse, theme, Row, Skeleton, List } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';

import Container from '../../components/Container';
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import ieltsImg from '../../assets/images/image5.png';
import mathImg from '../../assets/images/image6.png';
import programImg from '../../assets/images/image7.png';
import toeicImg from '../../assets/images/image8.png';
import iconEducation from "../../assets/images/image12.png";
import iconBachelor from "../../assets/images/image13.png";
import iconPerson from "../../assets/images/image14.png";
import feedbackImg from "../../assets/images/image17.png";
import { useDocumentTitle } from '../../hooks';
import DefaultBanner from '../../components/Banner/DefaultBanner';
import { RightOutlined } from '@ant-design/icons';
import { CollapseProps } from 'antd/lib';
import Link from '../../components/Link';
import config from '../../config';
import BookTutor from '../../components/Popup/BookTutor';


interface DataType {
    gender?: string;
    name: {
        title?: string;
        first?: string;
        last?: string;
    };
    email?: string;
    picture: {
        large?: string;
        medium?: string;
        thumbnail?: string;
    };
    nat?: string;
    loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [

    {
        key: '1',
        label: <Styled.QuestionTitle level={3}>Flexible Scheduling</Styled.QuestionTitle>,
        children: <Styled.AnswerContent>{text}</Styled.AnswerContent>,
        style: panelStyle,
    },
    {
        key: '2',
        label: <Styled.QuestionTitle level={3}>Affordable Pricing</Styled.QuestionTitle>,
        children: <p style={{ 'color': '#fff' }}>{text}</p>,
        style: panelStyle,
    },
    {
        key: '3',
        label: <Styled.QuestionTitle level={3}>Industry-Expert Tutors</Styled.QuestionTitle>,
        children: <p style={{ 'color': '#fff' }}>{text}</p>,
        style: panelStyle,
    },
    {
        key: '4',
        label: <Styled.QuestionTitle level={3}>Customized support</Styled.QuestionTitle>,
        children: <p style={{ 'color': '#fff' }}>{text}</p>,
        style: panelStyle,
    },
];
const Home = () => {
    useDocumentTitle('Home | MyTutor');
    const [translateY, setTranslateY] = useState<number>(0);
    const [hoveredTutor, setHoveredTutor] = useState<DataType>();

    const handleMouseEnter = (event: { currentTarget: any; }, item: DataType) => {
        const tutorItem = event.currentTarget;
        const itemRect = tutorItem.getBoundingClientRect();
        const containerRect = tutorItem.parentElement.getBoundingClientRect();
        const newTranslateY = itemRect.top - containerRect.top;
        setHoveredTutor(item);
        setTranslateY(newTranslateY);
    };
    const listCategory = [ieltsImg, mathImg, programImg, toeicImg];
    const [initLoading, setInitLoading] = useState(true);
    const [data, setData] = useState<DataType[]>([]);
    const [list, setList] = useState<DataType[]>([]);
    const { token } = theme.useToken();
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#B94AB7',
        padding: '10px',
    };
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);
    return (
        <>

            <DefaultBanner />

            <Styled.BestServiceSection>
                <Container>
                    <Row align="middle" justify='center'>
                        <Col lg={12}>
                        <BookTutor />
                            <Styled.BestServiceTitle level={2}>
                                Popular Categories
                            </Styled.BestServiceTitle>

                            <Styled.BestServiceDesc>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Styled.BestServiceDesc>
                        </Col>
                    </Row>


                    <Row gutter={[20, 20]} >
                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Styled.BestServiceItem>
                                <Styled.BestServiceImageDiv>
                                    <Styled.BestServiceImage src={listCategory[0]} alt="Ielts" />
                                </Styled.BestServiceImageDiv>

                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.BestServiceButton>
                                        See More {'>'}
                                    </Styled.BestServiceButton>
                                </Link>
                            </Styled.BestServiceItem>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Styled.BestServiceItem>
                                <Styled.BestServiceImageDiv>
                                    <Styled.BestServiceImageMath src={listCategory[1]} alt="Ielts" />

                                </Styled.BestServiceImageDiv>
                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.BestServiceButton>
                                        See More {'>'}
                                    </Styled.BestServiceButton>
                                </Link>
                            </Styled.BestServiceItem>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Styled.BestServiceItem>
                                <Styled.BestServiceImageDiv>
                                    <Styled.BestServiceImageProgram src={listCategory[2]} alt="Ielts" />

                                </Styled.BestServiceImageDiv>
                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.BestServiceButton>
                                        See More {'>'}
                                    </Styled.BestServiceButton>
                                </Link>
                            </Styled.BestServiceItem>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
                            <Styled.BestServiceItem>
                                <Styled.BestServiceImageDiv>
                                    <Styled.BestServiceImage src={listCategory[3]} alt="Ielts" />

                                </Styled.BestServiceImageDiv>
                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.BestServiceButton>
                                        See More {'>'}
                                    </Styled.BestServiceButton>
                                </Link>

                            </Styled.BestServiceItem>
                        </Col>
                    </Row>
                </Container>
            </Styled.BestServiceSection>

            <Styled.BestTutorSection>
                <Container>
                    <Row align="middle" justify='center'>
                        <Col lg={12}>
                            <Styled.BestServiceTitle level={2}>
                                Best Tutors
                            </Styled.BestServiceTitle>
                            <Styled.BestServiceDesc>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Styled.BestServiceDesc>
                        </Col>

                    </Row>

                    <Row justify='space-between'>
                        <Col lg={17} md={24} xs={24} sm={24}>
                            <List
                                loading={initLoading}
                                itemLayout="horizontal"
                                dataSource={list}
                                renderItem={(item) => (
                                    <Styled.TutorItem
                                        onMouseEnter={(event) => handleMouseEnter(event, item)}
                                        translate={typeof translateY === 'number' ? "no" : translateY}>
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                            <Col lg={24} md={24} sm={24} xs={24}>
                                                <Styled.BoxHover>
                                                    <Styled.BestTutorItem justify='space-between'>
                                                        <Col lg={7} md={8} sm={9} xs={24}>
                                                            <Styled.BestTutorImage src={item.picture.large} alt="Ielts" />
                                                        </Col>
                                                        <Col lg={9} md={8} sm={6} xs={0}>
                                                            <Styled.BestTutorContent>
                                                                <Styled.BestTutorName level={2}>{item.name?.last}</Styled.BestTutorName>
                                                                <Styled.BestTutorEducation>
                                                                    <Styled.BestTutorEducationBachelorImage src={iconEducation} alt="education" />
                                                                    <Styled.BestTutorEducationBachelor>
                                                                        Bachelor, Math
                                                                    </Styled.BestTutorEducationBachelor>
                                                                    <Styled.BestTutorEducationBachelorImage src={iconBachelor} alt="bachelor" />
                                                                    <Styled.BestTutorEducationBachelor>
                                                                        Math Physic
                                                                    </Styled.BestTutorEducationBachelor>
                                                                </Styled.BestTutorEducation>
                                                                <Styled.BestTutorStudent>
                                                                    <Styled.BestTutorStudentImage src={iconPerson} alt="person" />
                                                                    <Styled.BestTutorEducationBachelor>
                                                                        55 students taught
                                                                    </Styled.BestTutorEducationBachelor>
                                                                </Styled.BestTutorStudent>
                                                                <Styled.BestTutorDescription>
                                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                                                                </Styled.BestTutorDescription>


                                                            </Styled.BestTutorContent>
                                                        </Col>

                                                        <Col lg={8} md={8} sm={8} xs={24}>
                                                            <Styled.BestTutorBooking>
                                                                <Styled.BookingInformation>
                                                                    <div style={{ 'textAlign': 'center' }}>
                                                                        <div style={{ 'display': 'flex', 'height': '' }}>
                                                                            <span><FaStar style={{ 'width': '31px', 'height': '31px', 'color': '#FFCC4D', 'marginRight': '5px' }} /></span>
                                                                            <Styled.BookingRatingAndPrice >5</Styled.BookingRatingAndPrice>
                                                                        </div>
                                                                        <div>
                                                                            x view
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Styled.BookingRatingAndPrice>Price</Styled.BookingRatingAndPrice>
                                                                    </div>
                                                                    <div>
                                                                        <span><FaRegHeart style={{ 'width': '20px', 'height': '20px', 'color': '#B94AB7', 'marginTop': '10px' }} /></span>

                                                                    </div>
                                                                </Styled.BookingInformation>
                                                                <Styled.BookingThisTutor>
                                                                    <Styled.BookingTutorButton>
                                                                        Book This Tutor
                                                                    </Styled.BookingTutorButton>
                                                                </Styled.BookingThisTutor>
                                                                <Styled.BookingThisTutor>
                                                                    <Styled.ViewScheduleTutorButton>
                                                                        View Full Schedule
                                                                    </Styled.ViewScheduleTutorButton>
                                                                </Styled.BookingThisTutor>
                                                            </Styled.BestTutorBooking>
                                                        </Col>
                                                    </Styled.BestTutorItem>
                                                </Styled.BoxHover>
                                            </Col>
                                        </Skeleton>

                                    </Styled.TutorItem>
                                )}
                            />
                        </Col>
                        <Col lg={6} md={0} sm={0} xs={0} >
                            <Styled.TurtorVideo translate={typeof translateY === 'number' ? translateY : 0}>
                                {hoveredTutor && (
                                    <>
                                        <h2>{hoveredTutor.name.last}</h2>
                                    </>
                                )}
                            </Styled.TurtorVideo>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={24} md={24} xs={24} sm={24} >
                            <Styled.ButtonWrapper>
                                <Link to={config.routes.public.searchTutors}>
                                    <Styled.SeeMoreButton>
                                        See More {'>'}
                                    </Styled.SeeMoreButton>
                                </Link>
                            </Styled.ButtonWrapper>
                        </Col>
                    </Row>

                </Container>
            </Styled.BestTutorSection>



            <Styled.QuestionSection>
                <Container>
                    <Row align="middle">
                        <Col lg={13} md={24} sm={24} xs={24}>
                            <Styled.AnswerWrapper>
                                <Collapse
                                    accordion
                                    bordered={false}
                                    defaultActiveKey={['1']}
                                    expandIcon={({ isActive }) =>
                                        <div style={
                                            {
                                                'backgroundColor': '#fff', 'width': '40px',
                                                'height': '40px',
                                                'color': '#B94AB7',
                                                'marginTop': '10px',
                                                'borderRadius': '50%',
                                                'display': 'flex',
                                                'justifyContent': 'center',
                                                'alignItems': 'center',
                                            }
                                        }>
                                            <RightOutlined rotate={isActive ? 90 : 0} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                        </div>
                                    }
                                    style={{ background: token.colorBgContainer }}
                                    items={getItems(panelStyle)}
                                    expandIconPosition='end'
                                />
                            </Styled.AnswerWrapper>
                        </Col>
                        <Col lg={11} md={24} sm={24} xs={24}>
                            <Styled.QuestionWrapper>
                                <Styled.QuestionTitleRight level={1}>What makes us the best academy online?</Styled.QuestionTitleRight>
                            </Styled.QuestionWrapper>
                        </Col>
                    </Row>

                </Container>
            </Styled.QuestionSection >

            <Styled.FeedbackSection>
                <Container>
                    <Row align='middle' justify='center' gutter={24}>
                        <Col lg={9} md={24} sm={24} xs={24}>
                            <Styled.FeedbackWrapper>
                                <Styled.FeedbackStudentContent>
                                    "Outstanding experience! The flexibility to learn at my own pace, coupled with expert instruction and tailored support, exceeded my expectations. Engaging with a diverse community of learners and educators enriched my learning journey. Highly recommended for anyone seeking quality education with a personal touch!"
                                </Styled.FeedbackStudentContent>

                                <Styled.FeedbackContent>

                                    <Styled.FeedbackImg src={feedbackImg} alt="feedback" />
                                    <Styled.StudentInfor>
                                        <Styled.SchoolName>
                                            College Student
                                        </Styled.SchoolName>
                                        <Styled.StudentName>
                                            ABC
                                        </Styled.StudentName>
                                    </Styled.StudentInfor>

                                </Styled.FeedbackContent>
                            </Styled.FeedbackWrapper>
                        </Col>
                        <Col lg={15} md={24} sm={24} xs={24}>
                            <Styled.QuestionFeedbackWrapper>
                                <Styled.QuestionTitleRight level={1}>What they say about us?</Styled.QuestionTitleRight>
                            </Styled.QuestionFeedbackWrapper>
                        </Col>
                    </Row>
                </Container>
            </Styled.FeedbackSection >
        </>
    );
};

export default Home;
