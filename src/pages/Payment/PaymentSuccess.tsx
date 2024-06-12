import { Skeleton, notification, Typography } from 'antd';
import { useEffect, useState } from 'react'
import { checkPaymentStatus } from '../../api/paymentAPI';
import { useLocation } from 'react-router-dom';
import cookieUtils from '../../utils/cookieUtils';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import * as Styled from './Payment.styled';
import Container from '../../components/Container/Container';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { theme } from '../../themes';
import { toScheduleString } from './MakePayment';
const { Title, Text } = Typography;

const PaymentSuccess = () => {
    useDocumentTitle('Payment Success');
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const [bookingData, setBookingData] = useState<any>();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await checkPaymentStatus(location.search);
                if (response.status !== 200) return;
                setBookingData(cookieUtils.getItem('bookingData'));
                cookieUtils.removeItem('bookingData');
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [])


    function formatMoney(number: number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Styled.CheckSection>
            <Container>
                <Styled.CheckInner>
                    <Skeleton loading={loading}>
                        {bookingData ? (
                            <>
                                <Styled.CheckSuccessMsg>
                                    <AiOutlineCheckCircle
                                        size={80}
                                        color={theme.colors.success}
                                    />
                                    <Title level={2}>Thank you for trusting us!</Title>
                                </Styled.CheckSuccessMsg>
                                <Styled.BorderLine />

                                <Styled.PaymentMainPrice>
                                    <Title level={3}>
                                        Total payment
                                    </Title>
                                    <Text>{formatMoney(Math.round(bookingData.price))}</Text>
                                </Styled.PaymentMainPrice>

                                <Styled.PaymentMainPrice>
                                    <Title level={3}>Booked schedule</Title>
                                    <Text>
                                            {bookingData.schedule.map((schedule, index: number) => (
                                                <p key={index} style={{ lineHeight: `200%` }}>{toScheduleString(schedule).split('at')[0]} at <span style={{ color:`${theme.colors.primary}` }}>{toScheduleString(schedule).split('at')[1]} </span></p>
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
                                <Title level={2}>Payment failed</Title>
                            </Styled.CheckErrorMsg>
                        )}
                    </Skeleton>
                </Styled.CheckInner>
            </Container>
        </Styled.CheckSection>
    )
}

export default PaymentSuccess