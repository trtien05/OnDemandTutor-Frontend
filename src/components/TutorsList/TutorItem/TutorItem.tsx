import React from 'react';
import { Col, Skeleton } from 'antd';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import iconEducation from "../../../assets/images/image12.png";
import iconBachelor from "../../../assets/images/image13.png";
import iconPerson from "../../../assets/images/image14.png";
import * as Styled from '../Tutors.styled';
import { Tutor } from '../Tutor.type';

interface TutorItemProps {
  item: Tutor;
}

const TutorItem: React.FC<TutorItemProps> = ({ item }) => {
  return (
    <Skeleton avatar title={false} loading={item.loading} active>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Styled.BoxHover>
          <Styled.BestTutorItem justify='space-between'>
            <Col lg={7} md={8} sm={9} xs={24}>
              {/* <Styled.BestTutorImage src={item.picture.large} alt="Ielts" /> */}
            </Col>
            <Col lg={9} md={8} sm={6} xs={0}>
              <Styled.BestTutorContent>
                <Styled.BestTutorName level={2}>{item.fullName}</Styled.BestTutorName>
                <Styled.BestTutorEducation>
                  <Styled.BestTutorEducationBachelorImage src={iconEducation} alt="education" />
                  {item.educations.map((education, index) => (
                    <Styled.BestTutorEducationBachelor key={index}>
                      {education.majorName}{index < item.educations.length - 1 && ','}
                    </Styled.BestTutorEducationBachelor>
                  ))}
                  <Styled.BestTutorEducationBachelorImage src={iconBachelor} alt="bachelor" />
                  {item.educations.map((education, index) => (
                    <Styled.BestTutorEducationBachelor key={index}>
                      {education.degreeType}{index < item.educations.length - 1 && ','}
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
                  {item.backgroundDescription}
                </Styled.BestTutorDescription>
              </Styled.BestTutorContent>
            </Col>
            <Col lg={8} md={8} sm={8} xs={24}>
              <Styled.BestTutorBooking>
                <Styled.BookingInformation>
                  <div style={{ 'textAlign': 'center' }}>
                    <div style={{ 'display': 'flex', 'height': '' }}>
                      <span><FaStar style={{ 'width': '31px', 'height': '31px', 'color': '#FFCC4D', 'marginRight': '5px' }} /></span>
                      <Styled.BookingRatingAndPrice>{item.averageRating}</Styled.BookingRatingAndPrice>
                    </div>
                    <div>
                      x view
                    </div>
                  </div>
                  <div>
                    <Styled.BookingRatingAndPrice>{item.teachingPricePerHour}</Styled.BookingRatingAndPrice>
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
  );
}

export default TutorItem;
