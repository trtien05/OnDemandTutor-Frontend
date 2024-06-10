import React from 'react';
import { Col, Skeleton } from 'antd';
import iconBachelor from "../../../assets/images/image13.png";
import * as Styled from '../Question.styled';
import { Question } from '../../QuestionList/Question.type';

interface QuestionItemProps {
  item: Question;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ item }) => {
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
                <Styled.BestTutorName level={2}>{item.customerName}</Styled.BestTutorName>
                <Styled.BestTutorEducation>
                  {/* <Styled.BestTutorEducationBachelorImage src={iconEducation} alt="education" />
                  {item.educations.map((education, index) => (
                    <Styled.BestTutorEducationBachelor key={index}>
                      {education.majorName}{index < item.educations.length - 1 && ','}
                    </Styled.BestTutorEducationBachelor>
                  ))} */}

                  <Styled.BestTutorEducationBachelorImage src={iconBachelor} alt="bachelor" />
                  <Styled.BestTutorEducationBachelor>
                    {item.subject}
                  </Styled.BestTutorEducationBachelor>
                  <Styled.BestTutorEducationBachelor>
                    {item.createDate?.toISOString().split('T')[0]}
                  </Styled.BestTutorEducationBachelor>
                  <Styled.BestTutorEducationBachelor>
                    {item.modifiedDate?.toISOString().split('T')[0]}
                  </Styled.BestTutorEducationBachelor>
                </Styled.BestTutorEducation>
                <Styled.BestTutorStudent>
                {item.questionFile?.map((file, index) => (
                    <Styled.BestTutorEducationBachelor key={index}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        {file.name}
                      </a>
                      {index < item.questionFile.length - 1 && ', '}
                    </Styled.BestTutorEducationBachelor>
                  ))}
                </Styled.BestTutorStudent>
                <Styled.BestTutorDescription>
                  {item.content}
                </Styled.BestTutorDescription>
              </Styled.BestTutorContent>
            </Col>
            <Col lg={8} md={8} sm={8} xs={24}>
              <Styled.BestTutorBooking>
                <Styled.BookingThisTutor>
                  <Styled.BookingTutorButton>
                    Send Message
                  </Styled.BookingTutorButton>
                </Styled.BookingThisTutor>
                <Styled.BookingThisTutor>
                  <Styled.ViewScheduleTutorButton>
                    {item.status}
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

export default QuestionItem;
