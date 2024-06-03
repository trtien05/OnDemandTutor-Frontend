import styled, { css } from 'styled-components';
import Link from '@/components/Link';
import { theme } from '@/themes';

type NotifyProps = {
    $isRead: boolean;
};

export const NotificationItemWrapper = styled(Link)<NotifyProps>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px 36px 8px 12px;

    & .ant-avatar {
        flex-shrink: 0;
    }

    ${(props) =>
        !props.$isRead &&
        css`
            background-color: ${theme.colors.hoverPrimary};

            & div.ant-typography,
            & div.ant-typography strong {
                color: ${theme.colors.textPrimary};
            }

            & div ~ span.ant-typography {
                color: ${theme.colors.primary};
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                right: 10px;
                background-color: ${theme.colors.primary};
                border-radius: 999px;
                height: 10px;
                width: 10px;
            }
        `}
`;

export const NotificationItemContent = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 4px;
    margin-left: 12px;

    & .ant-typography {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 20px;
        color: ${theme.colors.textSecondary};
        text-align: left;
        white-space: normal;
    }

    & .ant-typography strong {
        margin-right: 4px;
        color: ${theme.colors.textSecondary};
    }

    & span.ant-typography {
        color: ${theme.colors.textSecondary};
        font-size: 1.3rem;
        font-weight: 500;
    }
`;
