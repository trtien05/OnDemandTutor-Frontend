import { Form } from "antd/lib";
import { theme } from "../../../../../themes";
import styled from 'styled-components';

export const FormItem = styled(Form.Item)`
    width: 100%;
    &.ant-form-item {
        padding: 12px 0 12px 0;
        margin: 0;
        margin-bottom: 0px;
        
        ${({ theme }) => theme.breakpoints.down('sm')} {
            margin-bottom: 0px;
            width: 100%;
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

    & .ant-form-item-label {
        top: -2px;
        left: 0px;
        padding: 0 10px;
        background-color: ${theme.colors.white};

        & label {
            color: ${theme.colors.primary};
            font-size: 1.6rem;
            font-weight: 400;
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

    & .ant-select-outlined,
    & .ant-select-selector,
    & .ant-select,
    & .ant-picker {
        height: 44px;
        text-align: left;
        border-radius: 8px;
    }

    & .ant-input,
    & .ant-input-number-input,
    & .ant-input-password {
        padding: 12px 20px;
        font-size: 1.6rem;
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
        font-size: 1.4rem;
        text-align: left;
        line-height: 1.6;
    }
`;

export const Clickable = styled.div`
padding: 15px;
/* Hover effect */
&:hover {
    background-color: ${theme.colors.secondary};
    cursor: pointer;
}
`