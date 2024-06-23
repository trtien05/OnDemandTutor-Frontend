import styled, { css } from 'styled-components';
import { theme } from '../../themes';

export const CheckSection = styled.section`
    margin: 72px 0 134px;
`;

export const CheckInner = styled.div`
    max-width: 768px;
    margin: 0 auto;
    padding: 30px 19px 14px;
    background-color: ${theme.colors.white};
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};
    box-shadow: 0px 24px 55px 0px ${theme.colors.shadowPurchasedHover};

    & .ant-divider {
        margin: 16px 0;
    }

    & button.ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 50px;
        margin-top: 32px;
        border-radius: 2px;
        border: 1px solid ${theme.colors.primary};
        background: ${theme.colors.primary};
        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};

        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;
export const ConfirmPrimaryText = css`
    margin-bottom: 0;
    color: ${theme.colors.textPrimary};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.5;
`;
export const CheckErrorMsg = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;

    & h2.ant-typography {
        ${ConfirmPrimaryText}
        margin-bottom: 16px;
        font-size: 3rem;
        line-height: 1.33333;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 2.2rem;
        }
    }
`;
