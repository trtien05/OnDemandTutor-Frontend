import * as Styled from './DefaultBanner.styled';

import Container from '../../../components/Container';
import { Col, Row, Typography } from 'antd';
import bannerImg from '../../../assets/images/banner-img.png';
import fallbackImg from '../../../assets/images/fallback-img.png';
import './style.css'
const { Text } = Typography;

const DefaultBanner = () => {
    return (
        <Styled.DefaultBannerSection>
            <Container>
                {/* <Styled.DefaultBannerWrapper> */}
                <Styled.DefaultBannerRow>
                    <Styled.CustomCol lg={24} >
                        <Styled.DefaultBannerWrapper>
                            <Styled.DefaultBannerImage
                                src={bannerImg}
                                alt="Let's Make Your Apartment More Convenient"
                                fallback={fallbackImg}
                                preview={false}
                            />
                        </Styled.DefaultBannerWrapper>
                    </Styled.CustomCol>

                    <Styled.DefaultBannerContent>
                        <Styled.DefaultBannerHeading level={1}>
                            <Text>With My Tutor,</Text>
                            <br />
                            <Text>Everything Is Easier</Text>
                        </Styled.DefaultBannerHeading>
                        <Styled.DefaultBannerDescription>
                            Our platform connects you with expert tutors in a wide range of subjects, providing personalized and flexible learning experiences tailored to your needs.
                        </Styled.DefaultBannerDescription>
                    </Styled.DefaultBannerContent>
                </Styled.DefaultBannerRow>

                {/* </Styled.DefaultBannerWrapper> */}
            </Container>
        </Styled.DefaultBannerSection>
    );
};

export default DefaultBanner;
