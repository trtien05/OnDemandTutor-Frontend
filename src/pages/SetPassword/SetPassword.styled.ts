import { theme } from '../../themes';
import { Typography } from 'antd';
import styled from 'styled-components';
const { Text } = Typography;

export const SetPasswordDesc = styled(Text)`
    margin-bottom: 24px;
    color: ${theme.colors.textSecondary};
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.85714;
`;
