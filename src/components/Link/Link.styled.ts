import { Link, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { theme } from '../../themes';

type LinkStyledType = {
    title: string;
    $zoom?: boolean;
    $underline?: boolean;
    $scroll?: boolean;
};

export const LinkBase = css<LinkStyledType>`
    position: relative;
    display: inline-block;
    text-align: center;
    text-decoration: none;

    ${(props) =>
        props.$zoom &&
        css`
            &::before {
                content: attr(title);
                display: block;
                font-weight: 600;
                height: 0;
                overflow: hidden;
                visibility: hidden;
            }

            &:hover {
                font-weight: 600;
            }
        `};

    ${(props) =>
        props.$underline &&
        css`
            &::after {
                content: '';
                display: block;
                position: absolute;
                bottom: 1px;
                right: 0;
                width: 0;
                height: 2px;
                background: ${theme.colors.primary};
                transition: ${theme.transition.primary};
            }

            &::after {
                width: 100%;
            }
        `};

    ${(props) =>
        props.$scroll &&
        css`
            &::after {
                width: 0;
            }

            &:hover::after {
                width: 100%;
                bottom: 1px;
                left: 0px;
            }
        `};
`;

export const LinkStyled = styled(Link)<LinkStyledType>`
    ${LinkBase}
`;

export const NavLinkStyled = styled(NavLink)<LinkStyledType>`
    ${LinkBase}
`;
