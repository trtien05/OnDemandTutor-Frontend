import React, { useState } from 'react';
import { Avatar, Col, Skeleton } from 'antd';
import iconEducation from "../../../assets/images/image12.png";
import iconBachelor from "../../../assets/images/image13.png";
import iconPerson from "../../../assets/images/image14.png";
import * as Styled from '../Tutors.styled';
import { Tutor } from '../Tutor.type';
import config from '../../../config';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

interface TutorItemProps {
  item: Tutor;
}
const MAX_DESCRIPTION_LENGTH = 40;


const TutorItem: React.FC<TutorItemProps> = ({ item }) => {
  const showFullDescription = false;
  const truncatedDescription = item.backgroundDescription?.slice(0, MAX_DESCRIPTION_LENGTH);
  const descriptionToShow = showFullDescription ? item.backgroundDescription : truncatedDescription;

  // Handle route
  const route: string = `${config.routes.public.searchTutors}/${item.id}`;

  return (
    <Skeleton avatar title={true} loading={item.loading} active>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Styled.BoxHover>
          <Styled.BestTutorItem justify='space-between'>
            <Col lg={7} md={8} sm={9} xs={24}>
              {item.avatarUrl ? (
                <Link to={route}>
                  <Avatar
                    size={64}
                    src={item.avatarUrl}
                    style={{
                      cursor: 'pointer',
                      width: '210px',
                      height: '100%',
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
                    size={64}
                    icon={<UserOutlined />}
                    style={{
                      cursor: 'pointer',
                      width: '210px',
                      height: '100%',
                      borderRadius: '50px',
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
                <Styled.BestTutorName level={2}>{item.fullName}</Styled.BestTutorName>
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
                    55 students taught
                  </Styled.BestTutorEducationBachelor>
                </Styled.BestTutorStudent>
                <Styled.BestTutorDescription>
                  {descriptionToShow}...

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
                  <div>
                    <Styled.IconStyleHeart />
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
