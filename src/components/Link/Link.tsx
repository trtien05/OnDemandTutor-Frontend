import { LinkEnum } from '../../utils/enums';
import { LinkStyled, NavLinkStyled } from './Link.styled';

type LinkProps = {
    type?: LinkEnum;
    className?: string;
    to: string;
    target?: string;
    children: any;
    zoom?: boolean;
    underline?: boolean;
    scroll?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    replace?: boolean;
    style?: React.CSSProperties;
};

const Link = ({
    type = LinkEnum.LINK,
    to,
    target = '_self',
    className,
    children,
    zoom = false,
    underline = false,
    scroll = false,
    onClick,
    replace,
    style,
    ...rest
}: LinkProps) => {
    const Component: React.ElementType = type === LinkEnum.NAV_LINK ? NavLinkStyled : LinkStyled;

    return (
        <Component
            className={className}
            to={to}
            title={typeof children === 'string' ? children : ''}
            $zoom={zoom}
            $underline={underline}
            $scroll={scroll}
            target={target}
            onClick={onClick}
            replace={replace}
            style={style}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default Link;
