import { Col, message, Grid, Space, Typography, Row, Button, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import * as Styled from './Payment.styled'
import iconEducation from "../../assets/images/image12.png";
import iconBachelor from "../../assets/images/image13.png";
import tutorAva from "../../assets/images/image17.png"
import rating from "../../assets/images/star.webp"
import vnpayLogo from "../../assets/svg/vnpay-logo.svg"
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { theme } from '../../themes';
import { useLocation } from 'react-router-dom';
import { getPaymentUrl, getTutorEducation, getTutorInfo } from '../../api/paymentAPI';
import cookieUtils from '../../utils/cookieUtils';
import config from '../../config';
const { Title, Text } = Typography;

interface Schedule {
  id?: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
}

interface Education {
  degreeType?: string;
  majorName?: string;
  specialization?: string;
  verified?: boolean;
};

interface Tutor {
  id: number;
  fullName?: string;
  teachingPricePerHour: number;
  educations?: Education;
  subjects: string[],
  averageRating?: number;
  loading: boolean;
};

export function toScheduleString(schedule: Schedule) {
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

const MakePayment = () => {
  const [api, contextHolder] = notification.useNotification({
    top: 100,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [tutor, setTutor] = useState<Tutor>();
  const screens = Grid.useBreakpoint();
  const location = useLocation();
  const [schedule, setSchedule] = useState<Schedule[]>();
  const appointmentData = location.state.appointmentData;
  const tutorId = appointmentData.tutorId;
  const selectedSchedule = location.state.selectedSchedule;
  const fee = 0.1;


  useEffect(() => {
    const fetchTutor = async () => {
      setLoading(true);
      try {

        const response =
          await getTutorInfo(tutorId)
            .catch(error => {
              api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
              });
            });

        const educations =
          await getTutorEducation(tutorId)
            .catch(error => {
              api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
              });
            });

        let selectSchedule: Schedule[] = [];
        selectedSchedule.map((scd, index) => {
          if (scd) {
            selectSchedule[index] = {
              scheduleDate: scd.StartTime.toLocaleDateString('en-US'),
              startTime: scd.StartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
              endTime: scd.EndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            }
          }
        })

        setSchedule(selectSchedule);

        //format data    
        const tutorData: Tutor = {
          id: response.data.id,
          fullName: response.data.fullName,
          teachingPricePerHour: response.data.teachingPricePerHour,
          educations: await selectTutorEducation(educations.data),
          subjects: response.data.subjects,
          averageRating: response.data.averageRating,
          loading: false
        }
        await setTutor(tutorData); // Set state once, after processing all schedules
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tutor info ', error);
        setLoading(false);
      }
    };

    fetchTutor();
  }, [])

  function selectTutorEducation(education: []) {
    let selectedEdu: Education = null;
    if (education.length > 0) {
      education.map((edu) => {
        if (edu.verified && selectedEdu === null) {
          selectedEdu = {
            degreeType: edu.degreeType,
            majorName: edu.majorName,
            specialization: edu.specialization,
            verified: edu.verified
          }
        }
      })
    }
    return selectedEdu;
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

  
  const handleOrder = async () => {
    try {
      // Call API to create order
      // If success, show success message
      setLoading(true);
      const { data } = await getPaymentUrl({ "appointmentId": appointmentData.id.toString() });
      const totalHour = calculateTotalHour(schedule);
      const price = totalHour * tutor.teachingPricePerHour * (1 + fee)
        await cookieUtils.setItem('bookingData', JSON.stringify({
          tutor: tutor,
          schedule: schedule,
          totalHour: totalHour,
          price: price,
        }));
        window.open(data.paymentUrl, '_blank')
        //window.location.href = data.paymentUrl;
      
    } catch (error) {
      api.error({
        message: 'Error',
        description: error.response ? error.response.data : error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading spinner
  } else {
    return (
      <>
        {contextHolder}
        {/* <Row> */}
        <div style={{ display: `flex`, flexDirection: `row`, flexWrap: `wrap` }}>
          <Col xl={13} lg={13} sm={24} xs={24} >

            <Styled.CheckoutWrapper>

              <Styled.TutorItem justify='space-between'>
                <Styled.ResponsiveStyle>
                  <Styled.TutorImage src={tutorAva} alt="tutor" />
                  <Styled.TutorContent>
                    <Styled.TutorName level={2}>{tutor.fullName}</Styled.TutorName>
                    <Styled.TutorEducation>
                      <Styled.TutorEducationBachelorImage src={iconEducation} alt="education" />
                      <Styled.TutorEducationBachelor>
                        {tutor?.educations?.degreeType?.slice(0, 1)}{tutor?.educations?.degreeType?.slice(1).toLowerCase()}, {tutor?.educations?.majorName}
                      </Styled.TutorEducationBachelor>

                      <div>
                        <Styled.TutorEducationBachelorImage src={iconBachelor} alt="subject" />
                        {tutor.subjects.map((subject, index) => (
                          <Styled.TutorEducationBachelor key={index}>
                            {subject}{index < tutor.subjects.length - 1 && ','}
                          </Styled.TutorEducationBachelor>
                        ))}
                      </div>
                    </Styled.TutorEducation>
                  </Styled.TutorContent>
                </Styled.ResponsiveStyle>
                {tutor?.averageRating && (<Styled.ResponsiveStyle>
                  <img src={rating} style={{ maxWidth: `30px`, margin: `10px` }} />
                  <span style={{ fontSize: `2rem`, color: `${theme.colors.primary}` }}>{tutor.averageRating}</span>
                </Styled.ResponsiveStyle>)}

              </Styled.TutorItem>
              {/* <Styled.ResponsiveStyle>
            <Styled.TutorName style={{ fontWeight: `500` }}>{formatMoney(tutor.teachingPricePerHour)}</Styled.TutorName>
            <span style={{ margin: `5px`, color: `${theme.colors.primary}` }}>/hour</span>
          </Styled.ResponsiveStyle> */}
              <Styled.BorderLine />
              <div style={{ marginLeft: `20px` }}>
                {schedule.map((schedule: Schedule, index: number) => (
                  <p key={index} style={{ lineHeight: `200%` }}>{toScheduleString(schedule)}</p>
                )
                )}
              </div>
              <Styled.BorderLine />
              <Styled.PriceCalculation>
                <Space>
                  <Title level={3}>Tutor's price per hour</Title>
                  <Text> {formatMoney(tutor.teachingPricePerHour)} VND</Text>
                </Space>

                <Space>
                  <Title level={3}>Total hour</Title>
                  <Text>
                    {calculateTotalHour(schedule)} hour{calculateTotalHour(schedule) > 1 && 's'}
                  </Text>
                </Space>

                <Space>
                  <Title level={3}>Tutoring price</Title>
                  <Text>
                    {formatMoney(calculateTotalHour(schedule) * tutor.teachingPricePerHour)} VND
                  </Text>
                </Space>

                <Space>
                  <Title level={3}>Processing fee (10%)</Title>
                  <Text>
                    {formatMoney(Math.round(calculateTotalHour(schedule) * tutor.teachingPricePerHour * (1+fee)))} VND
                  </Text>
                </Space>

                <Styled.BorderLine />

                <Space>
                  <Title level={3} >
                    Total
                  </Title>
                  <Text>
                    {formatMoney(Math.round((calculateTotalHour(schedule) * tutor.teachingPricePerHour) * 1.1))} VND
                  </Text>
                </Space>
                <p></p>
              </Styled.PriceCalculation>
            </Styled.CheckoutWrapper>

          </Col>
          {/* </Row> */}
          {/* <Row> */}
          <Col xl={10} lg={10} sm={24} xs={24}>
            <Styled.CheckoutWrapper >
              <Styled.TutorName style={{ textAlign: `center`, fontWeight: `600` }} >Payment</Styled.TutorName>
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
                onClick={handleOrder}
              >
                {loading ? (
                  <Loading3QuartersOutlined
                    spin
                    style={{ fontSize: '1.6rem' }}
                  />
                ) : (
                  'Pay'
                )}
              </Button>
            </Styled.CheckoutWrapper>
          </Col>
          {/* </Row> */}
        </div>

      </>
    )
  }
}

export default MakePayment;