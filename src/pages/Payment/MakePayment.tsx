import { Col, message, Grid, Typography, Space, Button, notification, Statistic } from 'antd';
import React, { useEffect, useState } from 'react'
import * as Styled from './Payment.styled'
import iconEducation from "../../assets/images/image12.png";
import iconBachelor from "../../assets/images/image13.png";
import tutorAva from "../../assets/images/image17.png"
import rating from "../../assets/images/star.webp"
import vnpayLogo from "../../assets/svg/vnpay-logo.svg"
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { theme } from '../../themes';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPaymentUrl, getTutorEducation, getTutorInfo } from '../../api/paymentAPI';
import cookieUtils from '../../utils/cookieUtils';
import moment from 'moment';
import config from '../../config';

const { Title, Text } = Typography;
const { Countdown } = Statistic;

interface CountdownTimerProps {
  duration: number; // in seconds
  onExpire: () => void;
}

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
  avatarUrl?: string;
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
  const [tutor, setTutor] = useState<Tutor | null>();
  const screens = Grid.useBreakpoint();
  const location = useLocation();
  const [schedule, setSchedule] = useState<Schedule[]>();
  const [appointmentData, setAppointmentData] = useState<any>(location.state.appointmentData); // [TODO] Replace any with the correct type
 
  const [tutorId, setTutorId] = useState<number>(appointmentData.tutorId); // [TODO] Replace any with the correct type
  const selectedSchedule = location.state.selectedSchedule;
  const [deadline, setDeadline] = useState(moment().add(15, 'minutes'));
  const navigate = useNavigate();


  useEffect(() => {
    if (location.state.appointmentData && appointmentData.tutorId) {
    const fetchTutor = async () => {
      setLoading(true);
      try {
        await setAppointmentData(location.state.appointmentData);
        await setTutorId(appointmentData.tutorId);
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
          avatarUrl: response.data.avatarUrl,
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
  }
  }, [location.state.appointmentData, appointmentData.tutorId])

  useEffect(() => {
    setAppointmentData(location.state.appointmentData);
    setTutorId(appointmentData.tutorId);
  }, []);

  // for countdown clock

  useEffect(() => {
    const timer = setInterval(() => {
      if (moment().isAfter(deadline)) {
        clearInterval(timer);
        handleTimerEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const handleTimerEnd = () => {
    // Clear user data here
    navigate(config.routes.student.paymentSuccess)
    // Redirect or reset state as needed
  };

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
      const price = totalHour * tutor.teachingPricePerHour;
      await cookieUtils.setItem('bookingData', JSON.stringify({
        tutor: tutor,
        schedule: schedule,
        totalHour: totalHour,
        price: price,
      }));
      // window.open(data.paymentUrl)
      setTutor(null);
      window.location.href = data.paymentUrl;

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
  } else if (!loading && appointmentData && tutor !== null) {
    return (
      <>
        {contextHolder}
        {/* <Row> */}
        <div style={{ display: `flex`, flexDirection: `row`, flexWrap: `wrap` }}>
          <Col xl={13} lg={13} sm={24} xs={24} >

            <Styled.CheckoutWrapper>

              <Styled.TutorItem justify='space-between'>
                <Styled.ResponsiveStyle>
                  <Styled.TutorImage src={tutor.avatarUrl} alt="tutor" />
                  <Styled.TutorContent>
                    <Styled.TutorName level={2}>{tutor.fullName}</Styled.TutorName>
                    <Styled.TutorEducation>
                      <Styled.TutorEducationBachelorImage src={iconEducation} alt="education" />
                      <Styled.TutorEducationBachelor>
                        {tutor?.educations?.degreeType?.slice(0, 1)}{tutor?.educations?.degreeType?.slice(1).toLowerCase()}, {tutor?.educations?.majorName}
                      </Styled.TutorEducationBachelor>

                      <div>
                        <Styled.TutorEducationBachelorImage src={iconBachelor} alt="subject" />
                        <Styled.TutorEducationBachelor>
                        {tutor.subjects.map((subject, index) => (
                          <span key = {index}>
                            {subject}{index < tutor.subjects.length - 1 && ', '}
                            </span>
                        ))}
                        </Styled.TutorEducationBachelor>
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
                  <p key={index} style={{ lineHeight: `200%` }}>{toScheduleString(schedule).split('at')[0]} at <span style={{ fontWeight: `bold`}}>{toScheduleString(schedule).split('at')[1]} </span></p>
                )
                )}
                <p>Description: {appointmentData.description}</p>
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

                </Styled.PriceCalculation>
                <Styled.BorderLine />

                <Styled.PriceCalculation>

                <Space>
                  <Title level={3} style={{color: `${theme.colors.textPrimary}`}} >
                    Total
                  </Title>
                  <Text>
                    {formatMoney(Math.round((calculateTotalHour(schedule) * tutor.teachingPricePerHour)))} VND
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
              <Styled.BorderLine />

              <Countdown style={{ width: `fit-content`, margin: `auto` }} title="Remaining Time" value={deadline} onFinish={handleTimerEnd} />

            </Styled.CheckoutWrapper>
          </Col>
          {/* </Row> */}
        </div>

      </>
    )
  } else {
    navigate(config.routes.public.notFound);
  }
}

export default MakePayment;