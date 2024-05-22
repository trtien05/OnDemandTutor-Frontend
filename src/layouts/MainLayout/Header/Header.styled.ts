import { Button, Col, List } from 'antd';
import styled, { css } from 'styled-components';

import Link from '../../../components/Link';
import { theme } from '../../../themes';

export const Header = styled.header<{ $isScroll: boolean }>`
    width: 100%;
    padding: 24px 0;
    background-color: #fff;

    ${(props) =>
        props.$isScroll &&
        css`
            background: ${theme.colors.white};
            transition: all 0.4s ease-in;
            box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
        `}
`;

export const Navbar = styled(List)`
    & .ant-list-items {
        display: flex;
        align-items: center;
        justify-content: center;

        column-gap: 76px;
    }
`;

export const ColumnStyle = styled(Col)`
    border-right: 2.5px solid #b94ab7;

    @media (max-width: 992px) {
        border-right: none;
    }
`;

export const NavbarLink = styled(Link)`
    position: relative;
    display: inline-block;
    color: #b94ab7;
    font-family: 'SVN-Poppins', sans-serif;
    font-size: 1.8rem;
    font-weight: 400;

    &::before {
        position: absolute;
        display: inline-block;
        content: '';
        left: 0;
        bottom: 1px;
        width: 0;
        height: 2px;
        background: ${theme.colors.primary};
    }

    &.active::before {
        width: 100%;
        left: 0;
        bottom: 1px;
    }
`;

export const HeaderButton = styled(Button)`
    --height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: auto;
    min-width: 112px;
    height: var(--height);
    line-height: var(--height);
    background-color: ${theme.colors.secondary};
    border-radius: 2px;
    border: 1px solid ${theme.colors.secondary};

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: ${theme.colors.white};
        border-radius: 2px;
        transform: scaleX(0);
        transition: ${theme.transition.primary};
    }

    & span {
        position: relative;
        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
        text-transform: uppercase;
        transition: ${theme.transition.primary};
    }

    &.ant-btn.ant-btn-default:hover {
        border-color: ${theme.colors.secondary};
    }

    &:hover::before {
        transform: scaleX(1);
    }

    &:hover span {
        color: ${theme.colors.secondary};
    }
`;

export const HeaderAvatarWrapper = styled.div`
    width: 100%;

    & span.ant-typography {
        padding: 0 24px;
        width: 100%;
        color: ${theme.colors.textPrimary};
        font-size: 1.7rem;
        font-weight: 500;
        line-height: 1;
    }

    & div.ant-divider {
        margin: 8px 0 0;
    }

    & span.anticon.anticon-user {
        font-size: 4.6rem;
    }
`;
