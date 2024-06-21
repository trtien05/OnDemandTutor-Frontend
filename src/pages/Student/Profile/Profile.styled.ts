import styled from 'styled-components';
import { theme } from '../../../themes';

export const ProfileContainer = styled.section`
    padding: 10px 0 60px;
`;

export const ProfileWrapper = styled.section`
    padding: 30px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
    transition: ${theme.transition.primary};

    & .ant-row {
        width: 100%;
    }

    & h2.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.4;
    }
        @media (max-width: 768px) {
        .ant-col {
            width: 100% !important; /* Ensure columns take full width on small screens */
            margin-bottom: 20px; /* Optional: Adjust margin for better spacing */
        }
    }
`;