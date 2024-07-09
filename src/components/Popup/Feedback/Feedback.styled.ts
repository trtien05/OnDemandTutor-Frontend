import styled from 'styled-components';
import { theme } from '../../../themes/index';
import { Button, Form, Typography } from 'antd';
const { Title } = Typography;

export const ButtonDiv = styled.div`
    width: 100%;
    margintop: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const FormWrapper = styled(Form)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    row-gap: 20px;
`;

export const FormTitle = styled(Title)`
    display: block;
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 18px;
        font-weight: 700;
        text-align: left;
        margin: 0 auto;
    }
`;

export const FormItem = styled(Form.Item)``;
export const GradientButton = styled(Button)`
    color: #fff;
    border: none;
    width: 80%;
    display: flex;
    margin: 0 auto;
    height: 40px;
    margin-top: 20px;
    border-radius: 100px;
`;
