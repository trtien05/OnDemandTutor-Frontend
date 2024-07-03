import styled from 'styled-components';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export const StyledLayout = styled(Layout)`
    & .ant-layout {
        background: #fff;
    }
`;

export const Header = styled.header`
    display: flex;
    background-color: #fff;
    height: 70px;
    border: 1px solid #ddd;
    position: sticky;
    top: 0;
    z-index: 1;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    border-right: 1px solid #ddd;
    transition: all 0.2s;

    &.fold {
        width: 80px;
    }
`;

export const Nav = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    flex: 1;
    justify-content: space-between;

    .left {
        display: flex;
        align-items: center;
    }

    .right {
        display: flex;
        align-items: center;
    }
`;

export const Main = styled(Layout)`
    margin-left: 200px;
    transition: all 0.2s;

    &.fold {
        margin-left: 80px;
    }
`;

export const StyledSider = styled(Sider)`
    position: fixed !important;
    top: 70px;
    left: 0;
    z-index: 1;
    height: calc(100vh);
`;

export const StyledContent = styled(Content)`
    padding: 20px;
    background: #fff;
`;
