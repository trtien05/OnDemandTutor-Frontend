import { Col, message, Grid } from 'antd';
import React from 'react'
import * as Styled from './Payment.styled'
import iconEducation from "../../assets/images/image12.png";
import iconBachelor from "../../assets/images/image13.png";
import tutorAva from "../../assets/images/image17.png"
import rating from "../../assets/images/star.webp"
import { theme } from '../../themes';

interface Education {
  degreeType?: string;
  majorName?: string;
  specialization?: string;
};

interface Tutor {
  fullName?: string;
  teachingPricePerHour?: number;
  educations: Education;
  subjects: string[],
  averageRating?: number;
  loading: boolean;
};

const Checkout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const screens = Grid.useBreakpoint();

  const EducationMockup: Education = {
    degreeType: 'Bachelor',
    majorName: 'Software Engineering'
  };
  const TutorMockup: Tutor = {
    fullName: 'Alice',
    teachingPricePerHour: 130000,
    educations: EducationMockup,
    subjects: ['Math', 'IELTS'],
    averageRating: 5,
    loading: false
  }

  return (
    <>
      {contextHolder}
      <Col xl={14} lg={14} sm={24} xs={24}>
        <Styled.CheckoutWrapper>

          <Styled.TutorItem justify='space-between'>
            <Styled.ResponsiveStyle>
              <Styled.TutorImage src={tutorAva} alt="tutor" />
              <Styled.TutorContent>
                <Styled.TutorName level={2}>{TutorMockup.fullName}</Styled.TutorName>
                <Styled.TutorEducation>
                  <Styled.TutorEducationBachelorImage src={iconEducation} alt="education" />
                  <Styled.TutorEducationBachelor>
                    {EducationMockup.degreeType}, {EducationMockup.majorName}
                  </Styled.TutorEducationBachelor>

                  <div>
                    <Styled.TutorEducationBachelorImage src={iconBachelor} alt="subject" />
                    {TutorMockup.subjects.map((subject, index) => (
                      <Styled.TutorEducationBachelor key={index}>
                        {subject}{index < TutorMockup.subjects.length - 1 && ','}
                      </Styled.TutorEducationBachelor>
                    ))}
                  </div>
                </Styled.TutorEducation>
              </Styled.TutorContent>
            </Styled.ResponsiveStyle>
            <Styled.ResponsiveStyle>
              <img src={rating} style={{ maxWidth: `30px`, margin: `10px` }} />
              <span style={{ fontSize: `2rem`, color: `${theme.colors.primary}` }}>{TutorMockup.averageRating}</span>
            </Styled.ResponsiveStyle>
          </Styled.TutorItem>
          <Styled.BorderLine/>
        </Styled.CheckoutWrapper>
      </Col>



    </>
  )
}

export default Checkout