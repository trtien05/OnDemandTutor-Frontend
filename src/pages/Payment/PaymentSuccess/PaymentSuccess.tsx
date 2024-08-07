import { Skeleton, notification, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react'
import { checkPaymentStatus } from '../../../utils/paymentAPI';
import { useLocation } from 'react-router-dom';
import cookieUtils from '../../../utils/cookieUtils';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import * as Styled from '../Payment.styled';
import Container from '../../../components/Container/Container';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { theme } from '../../../themes';
import { toScheduleString } from '../MakePayment';
import { Schedule } from '../../../components/Schedule/Schedule.type';
import { sendBookingEmail } from '../../../utils/tutorBookingAPI';
import config from '../../../config';
const { Title, Text } = Typography;

const PaymentSuccess = () => {
    useDocumentTitle('Payment Status | MyTutor');
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const [paymentResponse, setPaymentResponse] = useState<any>();
    const [bookingData, setBookingData] = useState<any>();

    // Ref to prevent double API call
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return; // Check the flag
        hasFetched.current = true; // Set the flag

        (async () => {
            try {
                setLoading(true);
                const paymentMethod = cookieUtils.getItem('bookingData').paymentMethod;
                if (location.search) {
                    const response = await checkPaymentStatus(paymentMethod, location.search);
                    if (response.status === 200) {
                        setPaymentResponse(response);
                        setBookingData(cookieUtils.getItem('bookingData'));
                        cookieUtils.removeItem('bookingData');
                    }
                }
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
                setPaymentResponse(error.response)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        })();
    }, [])

    useEffect(() => {
        if (paymentResponse && paymentResponse.status === 200 && bookingData) {
            sendBookingEmail(bookingData.appointmentId);
        }
    }, [paymentResponse])


    return (
        paymentResponse ? (
            <>
                {contextHolder}
                <Styled.CheckSection>
                    <Container>
                        <Styled.CheckInner>
                            <Skeleton loading={loading}>
                                {(paymentResponse.status === 200 && bookingData) ? (
                                    <>
                                        <Styled.CheckSuccessMsg>
                                            <AiOutlineCheckCircle
                                                size={80}
                                                color={theme.colors.success}
                                            />
                                            <Title level={2}>Thank you for trusting us!</Title>
                                            <Text>You can view your booked lessons in <a href={config.routes.student.studySchedule}>My Schedule</a> and payment history in <a href={config.routes.student.profile}>My Profile</a>.</Text>
                                        </Styled.CheckSuccessMsg>
                                        <Styled.BorderLine />

                                        <Styled.PaymentMainPrice>
                                            <Title level={3}>
                                                Total payment
                                            </Title>
                                            <Text>{Math.round(bookingData.price).toLocaleString('en-US')} VND</Text>
                                        </Styled.PaymentMainPrice>

                                        <Styled.PaymentMainPrice>
                                            <Title level={3}>Booked schedule</Title>
                                            <Text>
                                                <p style={{ textAlign: `right` }}>Subject: {bookingData.subject}</p>
                                                {bookingData.schedule.map((schedule: Schedule, index: number) => (
                                                    <p key={index} style={{ lineHeight: `100%`, textAlign: `right` }}>{toScheduleString(schedule).split(' at ')[0]} at <span style={{ color: `${theme.colors.primary}` }}>{toScheduleString(schedule).split(' at ')[1]} </span></p>
                                                )
                                                )}
                                            </Text>
                                        </Styled.PaymentMainPrice>

                                        <Styled.BorderLine />
                                        <Styled.PaymentMainPrice style={{ marginBottom: `20px` }}>
                                            <Title level={3}>Tutor profile</Title>
                                            <Text>
                                                <a href={`/search-tutors/${bookingData.tutor.id}`}>{bookingData.tutor.fullName}</a>
                                            </Text>
                                        </Styled.PaymentMainPrice>
                                    </>) : (
                                    <Styled.CheckErrorMsg>
                                        <AiOutlineCloseCircle size={80} color={theme.colors.error} />
                                        
                                        <Title level={2}>{paymentResponse.data.error ? paymentResponse.data.error: paymentResponse.data}</Title>
                                    </Styled.CheckErrorMsg>
                                )}
                            </Skeleton>
                        </Styled.CheckInner>
                    </Container>
                </Styled.CheckSection>
            </>
        ) : (
            <Styled.CheckSection>
                <Container>
                    <Styled.CheckInner>
                        <Skeleton loading={loading}><Styled.CheckErrorMsg>
                            <AiOutlineCloseCircle size={80} color={theme.colors.error} />
                            <Title level={2}>No payment data</Title>
                        </Styled.CheckErrorMsg>
                        </Skeleton>
                    </Styled.CheckInner>
                </Container>
            </Styled.CheckSection>
        )
    )
}

export default PaymentSuccess;