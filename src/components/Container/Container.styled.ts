import styled from 'styled-components';

export const ContainerStyled = styled.div<{ $isWide: boolean }>`
    width: ${(props) => (props.$isWide ? '1440px' : '1170px')};
    max-width: calc(100% - 48px);
    margin-left: auto;
    margin-right: auto;

    ${({ theme }) => theme.breakpoints.down('xs')} {
        max-width: calc(100% - 24px);
    }
`;
