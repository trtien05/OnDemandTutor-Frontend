import { Col, message, Space, Typography, Button } from 'antd';
import { useState } from 'react'
import * as Styled from './Payment.styled'
import iconEducation from "../../assets/images/image12.png";
import iconBachelor from "../../assets/images/image13.png";
import tutorAva from "../../assets/images/image17.png"
import rating from "../../assets/images/star.webp"
import vnpayLogo from "../../assets/svg/vnpay-logo.svg"
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { theme } from '../../themes';

const { Title, Text } = Typography;

interface Schedule {
  id: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
}

interface Education {
  degreeType?: string;
  majorName?: string;
  specialization?: string;
};

interface Tutor {
  fullName?: string;
  teachingPricePerHour: number;
  educations: Education;
  subjects: string[],
  averageRating?: number;
  loading: boolean;
};

const Payment = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const ScheduleMockup: Schedule[] = [
    { id: 1, scheduleDate: '2024-06-09', startTime: '07:00', endTime: '10:00' },
    { id: 2, scheduleDate: '2024-06-07', startTime: '12:00', endTime: '13:00' },
    { id: 3, scheduleDate: '2024-06-08', startTime: '14:00', endTime: '15:00' },
    { id: 4, scheduleDate: '2024-06-07', startTime: '16:00', endTime: '17:00' },
  ];

  function toScheduleString(schedule: Schedule) {
    let scheduleString = '';
    const dateString = new Date(schedule.scheduleDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    scheduleString = dateString + " at " + schedule.startTime + " - " + schedule.endTime;
    return scheduleString;
  }

  function formatMoney(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function calculateTotalHour(schedule: Schedule[]) {
    let sum = 0;
    let start = 0;
    let end = 0;
    schedule.map((time: Schedule) => {
      start = Number.parseInt(time.startTime.slice(0, 3));
      end = Number.parseInt(time.endTime.slice(0, 3));
      sum += end - start;
    })
    return sum;
  }

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
      {/* <Row> */}
      <div style={{ display: `flex`, flexDirection: `row`, flexWrap: `wrap` }}>
        <Col xl={13} lg={13} sm={24} xs={24} >

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
            {/* <Styled.ResponsiveStyle>
            <Styled.TutorName style={{ fontWeight: `500` }}>{formatMoney(TutorMockup.teachingPricePerHour)}</Styled.TutorName>
            <span style={{ margin: `5px`, color: `${theme.colors.primary}` }}>/hour</span>
          </Styled.ResponsiveStyle> */}
            <Styled.BorderLine />
            <div style={{ marginLeft: `20px` }}>
              {ScheduleMockup.map((schedule, index) => (
                <p key={index} style={{ lineHeight: `200%` }}>{toScheduleString(schedule)}</p>
              )
              )}
            </div>
            <Styled.BorderLine />
            <Styled.PriceCalculation>
              <Space>
                <Title level={3}>Tutor's price per hour</Title>
                <Text> {formatMoney(TutorMockup.teachingPricePerHour)} VND</Text>
              </Space>

              <Space>
                <Title level={3}>Total hour</Title>
                <Text>
                  {calculateTotalHour(ScheduleMockup)} hour{calculateTotalHour(ScheduleMockup) > 1 && 's'}
                </Text>
              </Space>

              <Space>
                <Title level={3}>Tutoring price</Title>
                <Text>
                  {formatMoney(calculateTotalHour(ScheduleMockup) * TutorMockup.teachingPricePerHour)} VND
                </Text>
              </Space>

              <Space>
                <Title level={3}>Processing fee (10%)</Title>
                <Text>
                  {formatMoney(calculateTotalHour(ScheduleMockup) * TutorMockup.teachingPricePerHour * 0.1)} VND
                </Text>
              </Space>

              <Styled.BorderLine />

              <Space>
                <Title level={3} >
                  Total
                </Title>
                <Text>
                  {formatMoney((calculateTotalHour(ScheduleMockup) * TutorMockup.teachingPricePerHour) * 1.1).split('.')[0]} VND
                </Text>
              </Space>
              <p></p>
            </Styled.PriceCalculation>
          </Styled.CheckoutWrapper>

        </Col>
        {/* </Row> */}
        {/* <Row> */}
        <Col xl={11} lg={11} sm={24} xs={24}>
          <Styled.CheckoutWrapper >
            <Title level={3}>Payment method</Title>
            <Styled.CheckoutPaymentImgWrapper>
              <img
                src={vnpayLogo}
                loading="lazy"
                decoding="async"
                alt="VNPAY"
              />
            </Styled.CheckoutPaymentImgWrapper>
            <Button
              block
              type="primary"
              size="large"
              htmlType="submit"
            >
              {loading ? (
                <Loading3QuartersOutlined
                  spin
                  style={{ fontSize: '1.6rem' }}
                />
              ) : (
                'Đặt hàng'
              )}
            </Button>
          </Styled.CheckoutWrapper>
        </Col>
        {/* </Row> */}
      </div>

    </>
  )
}

export default Payment