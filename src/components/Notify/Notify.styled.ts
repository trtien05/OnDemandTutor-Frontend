import { Menu } from 'antd';
import styled from 'styled-components';
import { theme } from '../../themes';

export const PopoverHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 4px 20px;

    & {
        margin-bottom: 0;
    }

    & span.ant-typography {
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 1.8rem;
        font-weight: 500;
    }

    & .ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1.6rem;
        border: none;
        border-radius: 4px;
        padding: 0 8px;
        color: ${theme.colors.primary};
        box-shadow: none;

        &:hover {
            background-color: ${theme.colors.hoverSecondary};
            color: ${theme.colors.primary};
        }
    }
`;

export const NotifyMenu = styled(Menu)`
    max-height: 59.5vh;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    width: 380px;
    padding: 0 8px 0 10px;

    &.ant-menu-root.ant-menu {
        border-inline-end: none;
    }

    & .ant-menu-item {
        width: 100%;
        height: 100%;
        margin: 0 0 8px 0;
        padding: 0;

        &.ant-menu-item.ant-menu-item-only-child:hover {
            background-color: ${theme.colors.hoverSecondary};
        }

        &.ant-menu-item-selected {
            background-color: transparent;
        }

        &.ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child:active {
            background-color: ${theme.colors.hoverPrimary};
        }
    }
`;
