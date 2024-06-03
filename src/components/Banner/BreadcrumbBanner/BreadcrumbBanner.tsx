import * as Styled from './BreadcrumbBanner.styled';

import { Breadcrumb, Space, Typography } from 'antd';

import { BreadcrumbBannerProps } from './BreadcrumbBanner.type';
import Container from '../../../components/Container';
import bannerImage from '../../assets/images/banner-img.webp';

const { Text } = Typography;

const BreadcrumbBanner = ({ title, breadcrumbItems, image }: BreadcrumbBannerProps) => {
    return (
        <Styled.BreadcrumbBannerSection>
            <Container>
                <Styled.BreadcrumbBannerInner>
                    <Space direction="vertical" size={0}>
                        <Styled.BreadcrumbBannerTitle level={1}>
                            <Text>{title.firstLine}</Text>

                            <Styled.BreadcrumbBannerBrand>
                                <Text>{title.secondLine[0]}</Text>
                                <Text>{title.secondLine[1]}</Text>
                            </Styled.BreadcrumbBannerBrand>

                            <Text>{title.thirdLine}</Text>
                        </Styled.BreadcrumbBannerTitle>

                        <Breadcrumb separator="|" items={breadcrumbItems} />
                    </Space>

                    <Styled.BreadcrumbBannerImage
                        src={image || bannerImage}
                        preview={false}
                        $isImage={!!image}
                    />
                </Styled.BreadcrumbBannerInner>
            </Container>
        </Styled.BreadcrumbBannerSection>
    );
};

export default BreadcrumbBanner;
