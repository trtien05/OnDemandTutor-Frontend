import React, { useEffect, useState } from 'react';
import { Avatar, Col, Skeleton } from 'antd';
import iconEducation from "../../../assets/images/image12.png";
import iconBachelor from "../../../assets/images/image13.png";
import iconPerson from "../../../assets/images/image14.png";
import * as Styled from '../Tutors.styled';
import { Tutor } from '../Tutor.type';
import config from '../../../config';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { getTutorStatistic } from '../../../utils/tutorAPI';

interface TutorItemProps {
  item: Tutor;
}

const TutorItem: React.FC<TutorItemProps> = ({ item }) => {
  const [totalTaughtStudent, setTotalTaughtStudent] = useState(0);
  const truncateText = (text?: string): string | undefined => {
    if (!text) return undefined;
    return text.length > 20 ? `${text.slice(0, 40)}...` : text;
  };
  useEffect(() => {
    const fetchTutorStatistic = async () => {
      if (item?.id) {
        const responseTutorStatistic = await getTutorStatistic(item.id);
        setTotalTaughtStudent(responseTutorStatistic.data.totalTaughtStudent);
      }
    }
    fetchTutorStatistic();
  }, []);
  // Handle route
  const route: string = `${config.routes.public.searchTutors}/${item.id}`;

  return (
    <Skeleton avatar title={true} loading={item.loading} active>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Styled.BoxHover>

          <Styled.BestTutorItem justify='space-between'>
            <Col xl={7} lg={8} md={7} sm={8} xs={24}>
              {item.avatarUrl ? (
                <Link to={route}>

                  <Styled.AvatarTutor
                    src={item.avatarUrl}
                    icon={<UserOutlined />}
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px',
                    }}
                  />

                </Link>

              ) : (
                <Link to={route}>
                  <Avatar
                    size={150}
                    style={{
                      cursor: 'pointer',
                      width: '210px',
                      height: '210px',
                      borderRadius: '100px',
                      left: '-5px',
                      bottom: '2px',
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px',
                    }}
                  />
                </Link>
              )}
            </Col>
            <Col xl={8} lg={8} md={9} sm={5} xs={0}>
              <Styled.BestTutorContent>
                <Styled.BestTutorName level={2}>
                  {truncateText(item.fullName)}
                </Styled.BestTutorName>
                <Styled.BestTutorEducation>
                  <Styled.BestTutorEducationBachelorImage src={iconEducation} alt="education" />
                  {item.educations.map((education, index) => (
                    <Styled.BestTutorEducationBachelor key={index}>
                      {index === 0 && `${education.degreeType} of ${education.majorName}`}
                    </Styled.BestTutorEducationBachelor>
                  ))}
                </Styled.BestTutorEducation>
                <Styled.BestTutorEducation>
                  <Styled.BestTutorEducationBachelorImage src={iconBachelor} alt="bachelor" />
                  {item.subjects.slice(0, 3).map((subject, index) => (
                    <React.Fragment key={index}>
                      <Styled.BestTutorEducationBachelor>{subject}</Styled.BestTutorEducationBachelor>
                      {index < 2 && ', '}
                    </React.Fragment>
                  ))}
                  {item.subjects.length > 3 && '...'}
                </Styled.BestTutorEducation>
                <Styled.BestTutorEducation>
                  <Styled.BestTutorStudentImage src={iconPerson} alt="person" />
                  <Styled.BestTutorEducationBachelor>
                    {totalTaughtStudent} students taught
                  </Styled.BestTutorEducationBachelor>
                </Styled.BestTutorEducation>
                <Styled.BestTutorDescription>
                  {truncateText(item.backgroundDescription)}
                </Styled.BestTutorDescription>
              </Styled.BestTutorContent>
            </Col>
            <Col xl={9} lg={8} md={8} sm={10} xs={24}>
              <Styled.BestTutorBooking>
                <Styled.BookingInformation>
                  <div style={{ 'textAlign': 'center' }}>
                    <div style={{ 'display': 'flex', }}>
                      <Styled.IconStyleStart />
                      <Styled.BookingRatingAndPrice>{item.averageRating}</Styled.BookingRatingAndPrice>
                    </div>

                  </div>
                  <div>
                    <Styled.BookingRatingAndPrice>{item.teachingPricePerHour?.toLocaleString() + 'đ'}</Styled.BookingRatingAndPrice>
                  </div>

                </Styled.BookingInformation>
                <Styled.BookingThisTutor>
                  <Link to={route}>
                    <Styled.BookingTutorButton >
                      Book This Tutor
                    </Styled.BookingTutorButton>
                  </Link>
                </Styled.BookingThisTutor>

                <Styled.BookingThisTutor>
                  <Link to={route}>
                    <Styled.ViewScheduleTutorButton>
                      View Full Schedule
                    </Styled.ViewScheduleTutorButton>
                  </Link>
                </Styled.BookingThisTutor>


              </Styled.BestTutorBooking>
            </Col>
          </Styled.BestTutorItem>
        </Styled.BoxHover>
      </Col>
    </Skeleton>
  );
}

export default TutorItem;
