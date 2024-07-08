import { Skeleton, Typography } from 'antd';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import * as Styled from '../../Payment/Payment.styled';
import Container from '../../../components/Container/Container';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { theme } from '../../../themes';
const { Title, Text } = Typography;

const RegisterStatus = () => {
    useDocumentTitle('Application Status');

    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])


    return (
        location.state ? (
            <>
                <Styled.CheckSection>
                    <Container>
                        <Styled.CheckInner>
                            <Skeleton loading={loading}>
                                {(location.state==='sent') ? (
                                    <>
                                        <Styled.CheckSuccessMsg>
                                            <AiOutlineCheckCircle
                                                size={80}
                                                color={theme.colors.success}
                                            />
                                            <Title level={2}>You application has been sent!</Title>
                                            <Text>We have received your application and are processing it with careful thought.</Text> 
                                        </Styled.CheckSuccessMsg>
                                        
                                    </>) : (
                                        <>
                                    <Styled.CheckErrorMsg>
                                        <AiOutlineCloseCircle size={80} color={theme.colors.error} />
                                        <Title level={2}>There was an error sending your application</Title>
                                    <Text>Please try again after a few minutes or contacting us for further support.</Text>
                                        
                                    </Styled.CheckErrorMsg>
                                    </>
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
                            <Title level={2}>No application data</Title>
                        </Styled.CheckErrorMsg>
                        </Skeleton>
                    </Styled.CheckInner>
                </Container>
            </Styled.CheckSection>
        )
    )
}

export default RegisterStatus;