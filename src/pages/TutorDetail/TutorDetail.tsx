import React, { useEffect, useRef, useState } from "react";
import { Tabs, Skeleton, Row, Col, List, Avatar, notification } from "antd";
import { useAuth, useDocumentTitle } from "../../hooks";
import { getTutorById, getTutorReviews, getTutorEducation, getTutorCertification, getStatusReviews, getTutorStatistic } from "../../utils/tutorAPI";
import { Tutor } from "../../components/TutorsList/Tutor.type";
import Container from "../../components/Container";
import * as Styled from './TutorDetail.styled';

import iconEducation from "../../assets/images/image12.png";
import iconPerson from "../../assets/images/image14.png";
import iconBachelor from "../../assets/images/image13.png";
import Schedule from "../../components/Schedule/Schedule";
import BookTutor from "../../components/Popup/BookTutor";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getTutorBooked } from "../../utils/studentAPI";
import Feedback from "../../components/Popup/Feedback";

const { TabPane } = Tabs;

interface Reviews {
  content?: string;
  createdBy?: string;
  createdAt?: string;
  avatarUrl?: string;
  rating?: number;
  loading: boolean;
}

interface Education {
  id?: number;
  majorName?: string;
  specialization?: string;
  universityName?: string;
  degreeType?: string;
  startYear?: number;
  endYear?: number;
}

interface Certification {
  id?: number;
  certificateName?: string;
  issuedYear?: number;
  issuedBy?: number;
  subject?: string;
}

const TutorDetail: React.FC = () => {
  useDocumentTitle("Tutor Detail | MyTutor");
  const { user } = useAuth();
  
  const aboutRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const handleTabClick = (key: string) => {
    let ref;
    switch (key) {
      case "1":
        ref = aboutRef;
        break;
      case "2":
        ref = scheduleRef;
        break;
      case "3":
        ref = reviewRef;
        break;
      case "4":
        ref = resumeRef;
        break;
      default:
        ref = aboutRef;
    }
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  const tutorId: number = parseInt(window.location.pathname.split('/')[2]);

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [tutorBooked, setTutorBooked] = useState<Tutor[]>([]);
  const [tutorFeedback, setTutorFeedback] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(false);
  const [totalTaughtStudent, setTotalTaughtStudent] = useState(0);

  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certification, setCertification] = useState<Certification[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const [api, contextHolderNotification] = notification.useNotification({
    top: 100,
  });

  const fetchStatusFeedback = async () => {
    if (user?.id !== undefined) {
      const response = await getStatusReviews(tutorId, user.id);
      if (response.status === 204) {
        setStatusFeedback(true)
      } else {
        setStatusFeedback(false);
      }
    }
  }

  const fetchReviews = async () => {
    try {
      const reviewsResponse = await getTutorReviews(tutorId, page, 1);
      setReviews(reviewsResponse.data.content);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
  };

  const handleReload = () => {
    fetchReviews();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Tutor Data
        const tutorResponse = await getTutorById(tutorId);
        setTutor(tutorResponse.data);

        // // Fetch Reviews Data
        await fetchReviews();

        // Fetch Education Data
        const educationResponse = await getTutorEducation(tutorId, 'true');
        setEducations(educationResponse.data);

        // Fetch Certificate Data
        const cetificateResponse = await getTutorCertification(tutorId, 'true');
        setCertification(cetificateResponse.data);

        // Fetch Booked Tutor Data
        if (user?.id) {
          const bookedtutorResponse = await getTutorBooked(user.id);
          setTutorBooked(bookedtutorResponse.data);
          // Check if tutor with specific tutorId is booked
          const isTutorBooked = bookedtutorResponse.data.some(
            (bookedTutor: { id: number; }) => bookedTutor.id === tutorId);

          // Set tutorFeedback based on the check
          setTutorFeedback(isTutorBooked);
        }

        //Fetch Status feedback
        await fetchStatusFeedback()

        //Fetch Statistic Data
        const responseTutorStatistic = await getTutorStatistic(tutorId);
        setTotalTaughtStudent(responseTutorStatistic.data.totalTaughtStudent);

      } catch {
        api.error({
          message: 'Error',
          description: 'Fail to fetch data.',
        });
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tutorId, user?.id]);
  const navigate = useNavigate();

  const handleSendMessage = () => {

    if (user?.role === 'STUDENT') {
      if (!tutorFeedback) {
        api.warning({
          message: 'You did NOT register this tutor!',
          description: 'You can not send message!',
        })
      } else {
        navigate(`/chat-room`, { state: { id: tutor?.id, fullName: tutor?.fullName, avatar: tutor?.avatarUrl } });
      }
    } else {
      api.warning({
        message: 'Warning',
        description: 'You can not send messages to other tutor!',
      })
    }
  };

  const onLoadMore = async () => {
    try {
      const newPage = page + 1;
      const newReviewsResponse = await getTutorReviews(tutorId, newPage, 1);
      if (newReviewsResponse.data.content.length <= 0) {
        api.info({
          message: 'Done',
          description: 'All reviews have been displayed!',
        })
      }
      setReviews((prevReviews) => [...prevReviews, ...newReviewsResponse.data.content]);
      setPage(newPage);
    } catch (err) {
      api.error({
        message: 'Error',
        description: 'Fail to fetch data.',
      });
    }
  };
  console.log(tutor);
  const loadMore = !loading ? (
    <Row>
      <Col lg={24} md={24} xs={24} sm={24} >
        <Styled.ButtonWrapper>
          <Styled.SeeMoreButton onClick={onLoadMore}>More Reviews</Styled.SeeMoreButton>
        </Styled.ButtonWrapper>
      </Col>
    </Row>
  ) : null;
  return (
    <>
      {contextHolderNotification}
      <Styled.TutorDetailBackground>
        <Container>
          {tutor && (
            <Row justify='space-between'>
              <Col lg={12} md={12} sm={12} xs={24}>
                <Skeleton paragraph={{ rows: 4 }} loading={loading} active>
                  <Styled.TutorInfoCard>
                    <Col>
                      {tutor.avatarUrl ? (
                        <Avatar
                          src={tutor.avatarUrl}
                          icon={<UserOutlined />}
                          size={150}
                          style={{
                            width: '210px',
                            height: '210px',
                            borderRadius: '50px',
                            marginRight: '20px'

                          }}
                        />
                      ) : (
                        <Avatar
                          size={150}
                          icon={<UserOutlined />}
                          style={{
                            width: '210px',
                            height: '210px',
                            borderRadius: '25px',
                            marginRight: '20px'

                          }}
                        />
                      )}
                    </Col>
                    <Col>
                      <Styled.TutorDetails>
                        <Styled.BestTutorName level={2}>{tutor.fullName}</Styled.BestTutorName>
                        <Styled.BestTutorEducation>
                          <Styled.BestTutorEducationBachelorImage src={iconEducation} alt="education" />
                          {educations.map((education, index) => (
                            <React.Fragment key={education.id}>
                              <Styled.BestTutorEducationBachelor>{education.degreeType}</Styled.BestTutorEducationBachelor>
                              {index < educations.length - 1 && ', '}
                            </React.Fragment>
                          ))}

                        </Styled.BestTutorEducation>
                        <Styled.BestTutorEducation>
                          <Styled.BestTutorEducationBachelorImage src={iconBachelor} alt="bachelor" />
                          {tutor.subjects.map((subject, index) => (
                            <React.Fragment key={index}>
                              <Styled.BestTutorEducationBachelor>{subject}</Styled.BestTutorEducationBachelor>
                              {index < tutor.subjects.length - 1 && ', '}
                            </React.Fragment>
                          ))}
                        </Styled.BestTutorEducation>
                        <Styled.BestTutorStudent>
                          <Styled.BestTutorStudentImage src={iconPerson} alt="person" />
                          <Styled.BestTutorEducationBachelor>{totalTaughtStudent} students taught</Styled.BestTutorEducationBachelor>
                        </Styled.BestTutorStudent>
                        <Styled.BestTutorDescription>{tutor.backgroundDescription}</Styled.BestTutorDescription>
                      </Styled.TutorDetails>
                    </Col>
                  </Styled.TutorInfoCard>
                </Skeleton>
                <Skeleton style={{ marginTop: '30px' }} paragraph={{ rows: 4 }} loading={loading} active>
                  <Styled.StyledTabs defaultActiveKey="1" onTabClick={handleTabClick}>
                    <TabPane tab="About" key="1" />
                    <TabPane tab="Schedule" key="2" />
                    <TabPane tab="Review" key="3" />
                    <TabPane tab="Resume" key="4" />
                  </Styled.StyledTabs>
                </Skeleton>
                <Skeleton style={{ marginTop: '30px' }} paragraph={{ rows: 4 }} loading={loading} active>
                  <Styled.SectionInfor ref={aboutRef}>
                    <Styled.TitleWrapper>
                      <Styled.TitleDetail level={4}>ABOUT THE TUTOR</Styled.TitleDetail>
                    </Styled.TitleWrapper>
                    <p>{tutor.backgroundDescription}</p>
                  </Styled.SectionInfor>
                </Skeleton>
                <Skeleton style={{ marginTop: '30px' }} paragraph={{ rows: 4 }} loading={loading} active>
                  <Styled.SectionInfor ref={scheduleRef}>
                    <Styled.TitleWrapper>
                      <Styled.TitleDetail level={4}>SCHEDULE</Styled.TitleDetail>
                    </Styled.TitleWrapper>
                    <Schedule tutorId={tutorId} />

                  </Styled.SectionInfor>
                </Skeleton>
                <Skeleton style={{ marginTop: '10px' }} paragraph={{ rows: 4 }} loading={loading} active>
                  <Styled.SectionInfor ref={reviewRef}>
                    <Styled.TitleWrapper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Styled.TitleDetail level={4}>REVIEWS</Styled.TitleDetail>
                      <Feedback statusFeedback={statusFeedback} tutorId={tutorId} tutorFeedback={tutorFeedback} onReload={handleReload} tutorName={tutor?.fullName} />
                    </Styled.TitleWrapper>
                    <List
                      loading={loading}
                      itemLayout="horizontal"
                      loadMore={loadMore}
                      dataSource={reviews}
                      renderItem={(item) => (
                        <List.Item>
                          <Skeleton avatar title={false} loading={item.loading} active>
                            <Styled.ReviewCard>
                              <Styled.ReviewHeader>
                                <Styled.AvatarStyled src={item.avatarUrl} />
                                <div>
                                  <Styled.StudentName>{item.createdBy}</Styled.StudentName>
                                  <Styled.DateRated>{item.createdAt}</Styled.DateRated>
                                  <Styled.Rating disabled defaultValue={item.rating} />
                                </div>
                              </Styled.ReviewHeader>
                              <Styled.ReviewContent>{item.content}</Styled.ReviewContent>
                            </Styled.ReviewCard>
                          </Skeleton>
                        </List.Item>
                      )}
                    />
                  </Styled.SectionInfor>
                </Skeleton>
                <Skeleton style={{ marginTop: '30px' }} paragraph={{ rows: 4 }} loading={loading} active>
                  <Styled.ResumeSection ref={resumeRef}>
                    <Styled.TitleWrapper>
                      <Styled.TitleDetail level={4}>RESUME</Styled.TitleDetail>
                    </Styled.TitleWrapper>
                    {(educations.length > 0) && (
                      <Styled.Section>
                        <Col lg={4} md={4} sm={4} xs={4}>
                          <Styled.SectionHeader>Education</Styled.SectionHeader>
                        </Col>
                        <Col lg={20} md={20} sm={20} xs={20}>
                          <Styled.SectionContent>
                            {educations.map((education) => (
                              <Styled.Item key={education.id}>
                                <Styled.Year>{education.startYear} - {education.endYear}</Styled.Year>
                                <Styled.Description>
                                  {education.universityName}<br />
                                  {education.degreeType}
                                </Styled.Description>
                              </Styled.Item>
                            ))}
                          </Styled.SectionContent>
                        </Col>
                      </Styled.Section>
                    )}
                    {(certification.length > 0) && (
                      <Styled.Section>
                        <Col lg={4} md={4} sm={4} xs={4}>
                          <Styled.SectionHeader>Certification</Styled.SectionHeader>
                        </Col>
                        <Col lg={20} md={20} sm={20} xs={20}>
                          <Styled.SectionContent>
                            {certification.map((certification) => (
                              <Styled.Item key={certification.id}>
                                <Styled.Year>{certification.issuedBy} - {certification.issuedYear}</Styled.Year>
                                <Styled.Description>
                                  {certification.certificateName}<br />
                                  {certification.subject}
                                </Styled.Description>
                              </Styled.Item>
                            ))}
                          </Styled.SectionContent>
                        </Col>
                      </Styled.Section>
                    )}

                  </Styled.ResumeSection>
                </Skeleton>
              </Col>
              <Skeleton style={{ marginTop: '30px', width: '30%' }} paragraph={{ rows: 4 }} loading={loading} active>
                <Col lg={9} md={9} sm={9} xs={24}>
                  <Styled.TutorVideoCard>
                    <Styled.TutorVideo>
                      {tutor.videoIntroductionLink && (
                        <iframe
                          width="100%"
                          height="100%"

                          style={{ borderRadius: '30px' }}
                          src={getEmbedUrl(tutor.videoIntroductionLink)}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
                    </Styled.TutorVideo>
                    <Styled.BookingInformation>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex' }}>
                          <Styled.IconStyleStart />
                          <Styled.BookingRatingAndPrice>{tutor.averageRating}</Styled.BookingRatingAndPrice>
                        </div>
                      </div>
                      <div>
                        <Styled.BookingRatingAndPrice>{tutor.teachingPricePerHour?.toLocaleString() + 'đ'}</Styled.BookingRatingAndPrice>
                      </div>
                    </Styled.BookingInformation>
                    <BookTutor tutorId={tutorId} />
                    <Styled.SendMessageButton onClick={handleSendMessage}>Send message</Styled.SendMessageButton>
                    <Styled.SendMessageButton>Save to my list</Styled.SendMessageButton>
                  </Styled.TutorVideoCard>
                </Col>
              </Skeleton>
            </Row>
          )}
        </Container>
      </Styled.TutorDetailBackground>
    </>
  );
};

export default TutorDetail;
