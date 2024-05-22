import { FC, PropsWithChildren } from 'react';

import { ContainerStyled } from './Container.styled';
// import config from '../../config';
// import { useLocation } from 'react-router-dom';

const Container: FC<PropsWithChildren> = ({ children }) => {
    // const { pathname } = useLocation();
    // const isWide = pathname.includes(config.routes.customer.schedule);
    const isWide = false;
    return <ContainerStyled $isWide={isWide}>{children}</ContainerStyled>;
};

export default Container;
