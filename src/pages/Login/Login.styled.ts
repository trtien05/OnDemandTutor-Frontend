import { Typography } from 'antd';
import styled from 'styled-components';

import { theme } from '../../themes';

const { Paragraph } = Typography;

export const LoginDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 36px;
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.73333;
        text-align: center;

        a {
            margin: 0 4px;
            font-weight: 700;
            color: ${theme.colors.textSecondary};
            transition: ${theme.transition.primary};

            span:first-child {
                font-size: inherit;
                color: ${theme.colors.primary};
            }

            span:last-child {
                font-size: inherit;
                color: ${theme.colors.primary};
            }

            &:hover {
                color: ${theme.colors.primary};
            }
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.4rem;
        }
    }
`;
