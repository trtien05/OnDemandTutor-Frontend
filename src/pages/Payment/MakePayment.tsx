import { Col, Typography, Space, Button, notification, Statistic, Skeleton, Radio, Row } from 'antd';
import { useEffect, useState } from 'react'
import * as Styled from './Payment.styled'
import iconEducation from "../../assets/images/image12.png";
import iconBachelor from "../../assets/images/image13.png";
import rating from "../../assets/images/star.webp"
import vnpayLogo from "../../assets/svg/vnpay-logo.svg"
import momoLogo from "../../assets/svg/momo-logo.svg"
import paypalLogo from "../../assets/svg/paypal-logo.svg"
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { theme } from '../../themes';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPaymentUrl, getTutorEducation, getTutorInfo } from '../../utils/paymentAPI';
import cookieUtils from '../../utils/cookieUtils';
import { Schedule, ScheduleEvent } from '../../components/Schedule/Schedule.type';
import config from '../../config';
import useAuth from '../../hooks/useAuth';
import { rollbackBooking } from '../../utils/tutorBookingAPI';
import { ButtonDiv } from '../BecomeTutor/Form.styled';
import { useDocumentTitle } from '../../hooks';

const { Title, Text } = Typography;
const { Countdown } = Statistic;


interface Education {
  degreeType?: string;
  majorName?: string;
  specialization?: string;
  verified?: boolean;
};

interface EducationRaw {
  degreeType: string;
  diplomaUrl: string;
  endYear: number;
  id: number;
  majorName: string;
  specialization: string;
  startYear: number;
  universityName: string;
  verified: boolean;
}

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
  useDocumentTitle("Make Payment | MyTutor");

  const [api, contextHolder] = notification.useNotification({
    top: 100,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [tutor, setTutor] = useState<Tutor>();
  const location = useLocation();
  const [schedule, setSchedule] = useState<Schedule[]>();
  const [appointmentData, setAppointmentData] = useState<any>(location.state ? location.state.appointmentData ? location.state.appointmentData : null : null); // [TODO] Replace any with the correct type

  const [tutorId, setTutorId] = useState<number>(appointmentData ? appointmentData.tutor.tutorId ? appointmentData.tutor.tutorId : 0 : 0); // [TODO] Replace any with the correct type
  const selectedSchedule = location.state ? location.state.selectedSchedule ? location.state.selectedSchedule : null : null;
  const deadline : number = location.state ? location.state.expired : 0;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('vnpay');

  useEffect(() => {
    (async () => {
      if (!user) navigate(config.routes.public.login);
      if (location.state) {
        await setAppointmentData(location.state.appointmentData);
        await setTutorId(appointmentData.tutor.tutorId);
      } else navigate(config.routes.public.home)
    })
  }, []);


  useEffect(() => {
    if (location.state.appointmentData != null && appointmentData.tutor.tutorId) {
      const fetchTutor = async () => {
        setLoading(true);
        try {
          await setAppointmentData(location.state.appointmentData);
          await setTutorId(appointmentData.tutor.tutorId);
          const response = await getTutorInfo(tutorId)

          const educations = await getTutorEducation(tutorId)

          let selectSchedule: Schedule[] = [];
          selectedSchedule.map((scd: ScheduleEvent, index: number) => {
            if (scd) {
              selectSchedule[index] = {
                scheduleDate: scd.StartTime.toLocaleDateString('en-US'),
                startTime: scd.StartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                endTime: scd.EndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
              }
            }
          })

          setSchedule(selectSchedule);
          const tutorEdu = await selectTutorEducation(educations.data);
          if (tutorEdu !== null) {
            //format data    
            const tutorData: Tutor = {
              id: response.data.id,
              fullName: response.data.fullName,
              avatarUrl: response.data.avatarUrl,
              teachingPricePerHour: response.data.teachingPricePerHour,
              educations: tutorEdu,
              subjects: response.data.subjects,
              averageRating: response.data.averageRating,
              loading: false
            }
            await setTutor(tutorData); // Set state once, after processing all schedules
          }
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch tutor info ', error);
          setLoading(false);
        }
      };

      fetchTutor();
    } else navigate(config.routes.public.home);
  }, [appointmentData, appointmentData.tutor.tutorId])


  // for countdown clock

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        clearInterval(timer);
        handleTimerEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const handleTimerEnd = () => {
    navigate(config.routes.student.paymentSuccess)
  };

  function selectTutorEducation(education: EducationRaw[]) {
    let selectedEdu: Education | null = null;
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


  function calculateTotalHour(schedule: Schedule[]): number {
    let totalMinutes = 0;

    schedule.forEach((time: Schedule) => {
      const [startHour, startMinute] = time.startTime.split(':').map(Number);
      const [endHour, endMinute] = time.endTime.split(':').map(Number);

      // Convert start and end times to minutes
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      // Calculate the difference in minutes
      totalMinutes += endTimeInMinutes - startTimeInMinutes;
    })
    return totalMinutes / 60;
  }

  const handleCancel = async () => {
    setLoading(true);
    const response = await rollbackBooking(appointmentData.id);
    if (response.status === 200) {
      api.success({
        message: 'Success',
        description: 'Your booking has been cancelled',
      });
      setTimeout(() => {
        navigate(config.routes.public.searchTutors + `/${tutorId}`);
      }, 2000);
    }
  }

  const handleOrder = async () => {
    try {
      // Call API to create order
      // If success, show success message
      setLoading(true);
      if (!paymentMethod) {
        api.error({
          message: 'Error',
          description: 'Please select a payment method',
        });
        return;
      }
      const { data } = await getPaymentUrl({ "appointmentId": appointmentData.id.toString(), "provider": paymentMethod.toUpperCase() });
      if (schedule !== undefined && tutor !== undefined && tutor !== null) {
        const totalHour = calculateTotalHour(schedule);
        const price = totalHour * tutor.teachingPricePerHour;
        await cookieUtils.setItem('bookingData', JSON.stringify({
          paymentMethod: paymentMethod,
          appointmentId: appointmentData.id,
          tutor: tutor,
          schedule: schedule,
          subject: appointmentData.subjectName,
          totalHour: totalHour,
          price: price,
        }));
      } else throw new Error("Can't send Tutor and Schedule data")
      setTutor(undefined);
      window.location.href = data.paymentUrl;

    } catch (error: any) {
      api.error({
        message: 'Error',
        description: error.response ? error.response.data : error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (appointmentData && tutor !== null) {
    return (
      <>
        {contextHolder}
        <Row justify='space-around'>
          <Col xl={13} lg={13} sm={24} xs={24} >
            <Skeleton loading={loading} style={{ backgroundColor: '#fff', padding: '27px 50px', margin: '50px 5px', borderRadius: '15px' }}>
              <Styled.CheckoutWrapper>
                <Styled.TutorItem justify='space-between'>
                  <Styled.ResponsiveStyle>
                    <Styled.TutorImage src={tutor?.avatarUrl} alt="tutor" />
                    <Styled.TutorContent>
                      <Styled.TutorName level={2}>{tutor?.fullName}</Styled.TutorName>
                      <Styled.TutorEducation>
                        <Styled.TutorEducationBachelorImage src={iconEducation} alt="education" />
                        <Styled.TutorEducationBachelor>
                          {tutor?.educations?.degreeType?.slice(0, 1)}{tutor?.educations?.degreeType?.slice(1).toLowerCase()}, {tutor?.educations?.majorName}
                        </Styled.TutorEducationBachelor>

                        <div>
                          <Styled.TutorEducationBachelorImage src={iconBachelor} alt="subject" />
                          <Styled.TutorEducationBachelor>
                            {tutor?.subjects.map((subject, index) => (
                              <span key={index}>
                                {subject}{index < tutor?.subjects.length - 1 && ', '}
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

                <Styled.BorderLine />
                <div style={{ marginLeft: `20px` }}>
                  <p>Subject: {appointmentData.subjectName}</p>
                  {schedule?.map((schedule: Schedule, index: number) => (
                    <p key={index} style={{ lineHeight: `200%` }}>{toScheduleString(schedule).split(' at ')[0]} at <span style={{ fontWeight: `bold` }}>{toScheduleString(schedule).split(' at ')[1]} </span></p>
                  )
                  )}
                  <p>{appointmentData.description ? `Description: ${appointmentData.description}` : ''}</p>
                </div>
                <Styled.BorderLine />

                <Styled.PriceCalculation>
                  <Space>
                    <Title level={3}>Tutor's price per hour</Title>
                    <Text> {(tutor) ? (tutor.teachingPricePerHour).toLocaleString('en-US') : ''} VND</Text>
                  </Space>

                  <Space>
                    <Title level={3}>Total hour</Title>
                    <Text>
                      {schedule ? calculateTotalHour(schedule) : ''} hour{schedule && calculateTotalHour(schedule) > 1 && 's'}
                    </Text>
                  </Space>

                </Styled.PriceCalculation>
                <Styled.BorderLine />

                <Styled.PriceCalculation>

                  <Space>
                    <Title level={3} style={{ color: `${theme.colors.textPrimary}` }} >
                      Total
                    </Title>
                    <Text>
                      {(schedule && tutor) ? (Math.round((calculateTotalHour(schedule) * tutor.teachingPricePerHour))).toLocaleString('en-US') : ''} VND
                    </Text>
                  </Space>
                  <p></p>
                </Styled.PriceCalculation>

              </Styled.CheckoutWrapper>
            </Skeleton>
          </Col>

          <Col xl={10} lg={10} sm={24} xs={24}>
            <Skeleton loading={loading} style={{ backgroundColor: '#fff', padding: '27px 30px', margin: '50px 5px', borderRadius: '15px' }}>
              <Styled.CheckoutWrapper >
                <Styled.TutorName style={{ textAlign: `center`, fontWeight: `600`, marginTop: `10px` }} >Payment method</Styled.TutorName>

                <Styled.CheckoutPayment>

                  <Radio.Group
                    name="payment"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <Radio
                      value={'momo'}
                      style={{ visibility: 'hidden' }}
                    >
                      <Styled.CheckoutPaymentImgWrapper>
                        <img
                          src={momoLogo}
                          loading="lazy"
                          decoding="async"
                          alt='MOMO'
                        />
                      </Styled.CheckoutPaymentImgWrapper>
                    </Radio>
                    <Radio
                      value={'vnpay'}
                      style={{ visibility: 'hidden' }}
                    >
                      <Styled.CheckoutPaymentImgWrapper>
                        <img
                          src={vnpayLogo}
                          loading="lazy"
                          decoding="async"
                          alt="VNPAY"
                        />
                      </Styled.CheckoutPaymentImgWrapper>
                    </Radio>
                    <Styled.BorderLine />
                    <div  style={{ height: `100%`, width: `100%`}}>
                    <Styled.TutorName style={{ textAlign: `center`, fontWeight: `600` }}>Overseas?</Styled.TutorName>
                    </div>
                    <div style={{ height: `100%`, width: `70%`, marginBottom:`10px` }}>
                      <Text>We will use
                        <span style={{ fontWeight: `bold` }}> VCB's latest currency transfer rate</span>.</Text>
                      <br />
                      <Text>Paypal also charges you additional fee of 
                        <span style={{ fontWeight: `bold` }}> 4.4% rate </span>  
                        + <span style={{ fontWeight: `bold` }}>0.3$ fixed fee</span> per transaction.
                        </Text>
                        
                    </div>
                    <Radio
                      value={'paypal'}
                      style={{ visibility: 'hidden' }}
                    >
                      <Styled.CheckoutPaymentImgWrapper style={{width:`80px`, height:`80px`, marginTop:`0`}}>
                        <img
                          src={paypalLogo}
                          loading="lazy"
                          decoding="async"
                          alt="PAYPAL"
                        />
                      </Styled.CheckoutPaymentImgWrapper>
                    </Radio>

                  </Radio.Group>
                </Styled.CheckoutPayment>
                <ButtonDiv>
                  <Button
                    style={{ marginRight: '10px', width: `40%` }}
                    type="default"
                    size="large"
                    onClick={handleCancel}
                  >
                    {loading ? (
                      <Loading3QuartersOutlined
                        spin
                        style={{ fontSize: '1.6rem' }}
                      />
                    ) : (
                      'Cancel'
                    )}
                  </Button>
                  <Button
                    style={{ marginRight: '10px', width: `60%` }}
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
                </ButtonDiv>
                <Styled.BorderLine />

                <Countdown style={{ width: `fit-content`, margin: `auto` }} title="Remaining Time" value={deadline} onFinish={handleTimerEnd} />

              </Styled.CheckoutWrapper>
            </Skeleton>
          </Col>
        </Row>

      </>
    )
  } else {
    navigate(config.routes.public.notFound);
  }
}

export default MakePayment;