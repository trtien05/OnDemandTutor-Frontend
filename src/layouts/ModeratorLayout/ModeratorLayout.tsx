import React, { useState } from 'react';
import { Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/svg/logo.png';
import MiniNotify from '../../components/MiniNotify/MiniNotify';
import MenuSider from '../../components/MenuSider/ModeratorMenuSider';
import * as Styled from './ModeratorLayout.styled'

const ModeratorLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Styled.StyledLayout>
      <Styled.Header>
        <Styled.Logo className={collapsed ? 'fold' : ''}>
          <img src={logo} alt="Logo" />
        </Styled.Logo>
        <Styled.Nav>
          <div className="left">
            <Button
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <div className="right">
            <MiniNotify />
          </div>
        </Styled.Nav>
      </Styled.Header>
      <Styled.Main className={collapsed ? 'fold' : ''}>
        <Styled.StyledSider
          collapsed={collapsed}
          breakpoint='lg'
          onBreakpoint={(broken: boolean) => setCollapsed(broken)}
          theme='light'
          style={{ 'backgroundColor': '#fff' }}
        >
          <MenuSider />
        </Styled.StyledSider>
        <Styled.StyledContent>
          <Outlet />
        </Styled.StyledContent>
      </Styled.Main>
    </Styled.StyledLayout>
  );
}

export default ModeratorLayout;
