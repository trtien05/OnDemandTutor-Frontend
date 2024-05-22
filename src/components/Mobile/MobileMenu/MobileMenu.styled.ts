import { theme } from '../../../themes';
import { Drawer } from 'antd';
import styled from 'styled-components';

export const DrawerStyled = styled(Drawer)`
    & .ant-drawer-body {
        padding: 0;
    }

    & .ant-menu.ant-menu-root {
        display: flex;
        flex-direction: column;
        height: 100%;

        & > .ant-menu-item:last-child {
            margin-top: auto;
        }
    }

    & .ant-menu-submenu .ant-menu-submenu-title,
    & .ant-menu-submenu,
    & .ant-menu .ant-menu-item {
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        border-radius: 0;
    }

    & .ant-menu-title-content {
        display: flex;
        height: 100%;
    }

    & .ant-menu-title-content a {
        display: flex;
        align-items: center;

        column-gap: 10px;
        padding: 20px 24px;
        width: 100%;
        color: ${theme.colors.textPrimary};
        font-size: 1.7rem;
        font-weight: 500;
        line-height: 1;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.4rem;
        }
    }
`;
