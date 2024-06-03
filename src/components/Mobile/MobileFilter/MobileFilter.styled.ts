import { BsFilter } from 'react-icons/bs';
import styled from 'styled-components';

export const DrawerInner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 32px;
`;

export const DrawerIcon = styled(BsFilter)`
    display: none;

    ${({ theme }) => theme.breakpoints.down('xl')} {
        display: block;
    }
`;
