import React, { useEffect, useState } from 'react';
import { Avatar, Col } from 'antd';
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
    <Col lg={24} md={24} sm={24} xs={24}>
      <Styled.BoxHover>

        <Styled.BestTutorItem justify='space-between'>
          <Col lg={7} md={8} sm={9} xs={24}>
            {item.avatarUrl ? (
              <Link to={route}>
                <Avatar
                  size={150}
                  src={item.avatarUrl}
                  icon={<UserOutlined />}
                  style={{
                    cursor: 'pointer',
                    width: '210px',
                    height: '210px',
                    borderRadius: '50px',
                    left: '-5px',
                    bottom: '2px',
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
          <Col lg={8} md={8} sm={6} xs={0}>
            <Styled.BestTutorContent>
              <Styled.BestTutorName level={2}>
                {truncateText(item.fullName)}
              </Styled.BestTutorName>
              <Styled.BestTutorEducation>
                <Styled.BestTutorEducationBachelorImage src={iconEducation} alt="education" />
                {item.educations.map((education, index) => (
                  <Styled.BestTutorEducationBachelor key={index}>
                    {index === 0 && education.majorName}
                  </Styled.BestTutorEducationBachelor>
                ))}
                <Styled.BestTutorEducationBachelorImage src={iconBachelor} alt="bachelor" />
                {item.educations.map((education, index) => (
                  <Styled.BestTutorEducationBachelor key={index}>
                    {index === 0 && education.degreeType}
                  </Styled.BestTutorEducationBachelor>
                ))}
              </Styled.BestTutorEducation>
              <Styled.BestTutorStudent>
                <Styled.BestTutorStudentImage src={iconPerson} alt="person" />
                <Styled.BestTutorEducationBachelor>
                  {totalTaughtStudent} students taught
                </Styled.BestTutorEducationBachelor>
              </Styled.BestTutorStudent>
              <Styled.BestTutorDescription>
                {truncateText(item.backgroundDescription)}
              </Styled.BestTutorDescription>
            </Styled.BestTutorContent>
          </Col>
          <Col lg={9} md={8} sm={8} xs={24}>
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
  );
}

export default TutorItem;
