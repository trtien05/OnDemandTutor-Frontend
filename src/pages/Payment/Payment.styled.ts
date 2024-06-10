import { Form, Row, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '../../themes';
import Title from 'antd/es/typography/Title';

export const CheckoutWrapper = styled.div`
margin: 50px 10%;
${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 20px;
}
    padding: 27px 50px;
    background-color: #fff;
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};

    & h3.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
    }

`;

export const PriceCalculation = styled.div`
    margin: 24px;
    background-color: ${theme.colors.white};

    & h3.ant-typography {
        margin-bottom: 12px;
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.4;

        & span.ant-typography {
            font-size: 1.6rem;
            margin: 0 4px;
        }
    }

    & span.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.4;
    }

    & .ant-space:last-of-type h3.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.5;
    }

    & .ant-space {
        justify-content: space-between;
        width: 100%;
    }

    & .ant-divider {
        margin: 32px 0;
    }

    & .ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 32px;
        padding: 0 100px;
        height: 50px;
        line-height: 50px;
        border-radius: 2px;

        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.57143;

        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};
    }
`;


export const CheckoutPayment = styled.div`
    margin-top: 36px;
    padding: 16px 20px 36px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};

    & h3.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
    }

    & .ant-radio-group {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    & .ant-radio-wrapper:hover {
        
    }

    & .ant-radio-wrapper:has(:checked) figure {
        outline: 1px solid ${theme.colors.primary};
        box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCartHover};
    }

    & .ant-radio.ant-wave-target {
        display: none;
    }
`;

export const CheckoutPaymentImgWrapper = styled.figure`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 22px;
    padding: 20px;
    width: 160px;
    height: 150px;
    border-radius: 15px;
    background: ${theme.colors.white};

    visibility: visible;

    & img {
        width: 100%;
        aspect-ratio: 16/9;
    }
`;

export const CheckoutTotalWrapper = styled.div`
    margin-top: 36px;
    padding: 36px 34px 25px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};
    background-color: ${theme.colors.white};

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.5;

        & span.ant-typography {
            font-size: 1.6rem;
            margin: 0 4px;
        }
    }

    & span.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
    }

    & .ant-space:first-of-type {
        margin-bottom: 32px;
    }

    & .ant-space:last-of-type h3.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.5;
    }

    & .ant-space {
        justify-content: space-between;
        width: 100%;
    }

    & .ant-divider {
        margin: 32px 0;
    }

    & .ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 32px;
        padding: 0 100px;
        height: 50px;
        line-height: 50px;
        border-radius: 2px;

        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.57143;

        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};
    }
`;

export const TutorContent = styled.div`
    margin-top: 20px;
    color: ${theme.colors.primary};
`;

export const BorderLine = styled.hr`
    border: ${theme.colors.primary} 1px solid;
    opacity: 20%;
    width: 100%;
    margin: 20px 0;
`

export const TutorItem = styled(Row)`
    display: flex;
    background-color: #fff;
    border-radius: 50px;
    margin-bottom: 2%;
    & .ant-list-item {
        border-block-end: none;
    }
`;

export const TutorImage = styled.img`
    margin: 20px;
    max-width: 100px;
    max-height: 100px;
    border-radius: 10px;
    display: flex;
    ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 0;
        margin-right: 15px;
    }
`;
export const ResponsiveStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    max-width: 85%;
    ${({ theme }) => theme.breakpoints.down('md')} {
        width: 100%;
        justify-content: center;
    }
`

export const TutorName = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%;
    }
`;
export const TutorEducation = styled.div`
    display: block;
    justify-content: space-between;
    margin: 10px 0;
`;
export const TutorEducationBachelorImage = styled.img`
    max-height: 20px;
    max-width: 20px;
    align-items: center;

`;
export const TutorEducationBachelor = styled.span`
    margin: 0 5px;
    line-height: 1.5;
    margin: 0 3px;
`;
