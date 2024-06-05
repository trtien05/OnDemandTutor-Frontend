import React, { useState } from 'react';
import { Col, Skeleton } from 'antd';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import iconEducation from "../../../assets/images/image12.png";
import iconBachelor from "../../../assets/images/image13.png";
import iconPerson from "../../../assets/images/image14.png";
import * as Styled from '../Tutors.styled';
import { Tutor } from '../Tutor.type';
import Link from '../../Link';

interface TutorItemProps {
  item: Tutor;
}
const MAX_DESCRIPTION_LENGTH = 40;


const TutorItem: React.FC<TutorItemProps> = ({ item }) => {
  const showFullDescription = false;


  const truncatedDescription = item.backgroundDescription?.slice(0, MAX_DESCRIPTION_LENGTH);
  const descriptionToShow = showFullDescription ? item.backgroundDescription : truncatedDescription;



  return (
    <Skeleton avatar title={false} loading={item.loading} active>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Styled.BoxHover>
          <Styled.BestTutorItem justify='space-between'>
            <Col lg={7} md={8} sm={9} xs={24}>
              {/* <Styled.BestTutorImage src={item.picture.large} alt="Ielts" /> */}
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
                  {descriptionToShow}
                  {item.backgroundDescription && item.backgroundDescription.length > MAX_DESCRIPTION_LENGTH && (
                    <Link to='/'>...See More</Link>
                  )}
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
  );
}

export default TutorItem;
