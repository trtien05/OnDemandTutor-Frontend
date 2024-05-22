import { Form, Typography, Checkbox, Input } from "antd";
import styled from "styled-components";

import { theme } from '../../themes';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const FormContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    column-gap: 5%;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
        flex-direction: column;
    }
`;

export const FormCheckbox = styled(Checkbox)`
  text-align: left;
  margin: 24px 0;
  vertical-align: top;
`;
export const CheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
  height: auto;
  text-align: left;
  margin: 24px 0 5px;
`;
export const FormWrapper = styled(Form)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    row-gap: 44px;
`;

export const FormTitle = styled(Title)`
  &.ant-typography {
    margin-bottom: 12px;
    color: ${theme.colors.primary};
    font-size: 1.6rem;
    font-weight: 700;
    text-align: left;
  }
`;

export const FormDescription = styled(Text)`
  display: flex;
  text-align: left;

  column-gap: 8px;
  margin-top: -8px;
  margin-bottom: 24px;
  color: ${theme.colors.textPrimary};
  font-size: 1rem;
`;


export const CommentInput = styled(TextArea)`
  &.ant-input-affix-wrapper {
    border-radius: 2px;
    border: 1px solid ${theme.colors.borderInput};
    background: ${theme.colors.white};
  }

  &.ant-input-affix-wrapper textarea.ant-input {
    padding: 12px 16px;
    font-size: 1.6rem;
    background: ${theme.colors.white};
  }
`;
export const ButtonDiv = styled.div`
        display: flex; 
        justifyContent: flex-end; 
        width: 100%; 
        marginTop: 20px;
 `;
export const FormItem = styled(Form.Item)<{$width?: string;}>`

    width: ${({ $width }) => $width || '100%'};
    &.ant-form-item {
        margin-bottom: 24px;
        ${({ theme }) => theme.breakpoints.down('sm')} {
            
            width: 100%
        }
    }

    &.ant-form-item:last-child {
        

        ${({ theme }) => theme.breakpoints.down('xs')} {
            margin-top: 28px;
        }
    }

    & .ant-form-item-row {
        position: relative;
        width: 100%;

        &:has(.ant-form-item-explain-error:not(:empty)) .ant-form-item-label label {
            color: ${theme.colors.error};
        }

        &:has(input:-webkit-autofill),
        &:has(input:-webkit-autofill:hover),
        &:has(input:-webkit-autofill:focus),
        &:has(input:not(:placeholder-shown)),
        &:has(input:focus) {
            & .ant-form-item-label {
                top: -2px;
                left: 0px;
                padding: 0 10px;
                background-color: ${theme.colors.white};
            }

            & label {
                color: ${theme.colors.primary};
            }
        }
    }

    

    & .ant-form-item-control {
        position: relative;

        & .ant-form-item-control-input + div {
            position: relative;
            top: 100%;
            left: 0;
        }
    }

    & .ant-input,
    & .ant-input-number-input,
    & .ant-input-password,
    & .ant-select-selector {
        padding: 12px 20px;
        font-size: 1rem;
        border-radius: 6px;
        border-color: ${theme.colors.border};

        &:hover,
        &:focus {
            border-color: ${theme.colors.primary};
        }
    }

    & .ant-form-item-explain-error {
        margin-top: 2px;
        margin-bottom: 5px;
        color: ${theme.colors.error};
        font-size: 0.8rem;
        text-align: left;
        line-height: 1.6;
    }
`;





