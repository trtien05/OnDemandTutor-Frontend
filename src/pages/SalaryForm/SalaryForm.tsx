import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Select, Button, Col, Typography, notification } from 'antd';
import { Rule } from 'antd/es/form';
import { Flex } from 'antd';
import * as FormStyled from '../BecomeTutor/Form.styled';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { theme } from '../../themes';
import { postTutorSalary } from '../../utils/salaryAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../config';
const { Option } = Select;
const { Title } = Typography;

type FieldType = {
    key: number;
    label: string;
    name: string;
    initialValue?: string | boolean | number;
    rules?: Rule[];
    component: JSX.Element;
    halfWidth?: boolean;
};

const validateWhitespace = (_: unknown, value: string) => {
    if (value && value.trim() === '') {
        return Promise.reject('Please enter valid information');
    }
    return Promise.resolve();
};

const validateBankAccountNumber = (_: unknown, value: string) => {
    if (!value || value.trim() === '') {
        return Promise.reject('Please enter a valid bank account number');
    }
    if (!/^\d+$/.test(value)) {
        return Promise.reject('Bank account number must be numeric');
    }
    return Promise.resolve();
};

const SalaryForm: React.FC = () => {
    const navigate = useNavigate();
    useDocumentTitle('Withdraw salary');

    const [banks, setBanks] = useState<{ id: number; name: string }[]>([]);
    const [form] = Form.useForm();
    const fieldComponents = useRef<JSX.Element[]>([]);
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });

    //useLocation gives access to the current location object, which contains information about the current URL,
    //including the pathname, search, hash, and state.
    const location = useLocation();

    //checks if location.state exists -> checks if location.state.month exists.
    //If both -> assigns the value of location.state.month to the month variable.
    //Otherwise, it assigns null to month.
    const month = location.state ? (location.state.month ? location.state.month : null) : null;
    const year = location.state ? (location.state.year ? location.state.year : null) : null;
    const tutorId = location.state
        ? location.state.tutorId
            ? location.state.tutorId
            : null
        : null;

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
        // Navigate to home if month or year is not provided
        if (month === null || year === null) {
            navigate(config.routes.public.home);
        }
    }, [month, year, navigate]);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await fetch('https://api.viqr.net/list-banks/');
                const result = await response.json();
                if (result.code === '00') {
                    setBanks(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch banks:', error);
            }
        };

        fetchBanks();
    }, []);

    const fields: FieldType[] = [
        {
            key: 1,
            label: 'Bank Name',
            name: 'bankName',
            rules: [{ required: true, message: 'Please select a bank' }],
            component: (
                <Select size="large" placeholder="Select bank" style={{ width: '100%' }}>
                    {banks.map((bank) => (
                        <Option key={bank.id} value={bank.name}>
                            {bank.name}
                        </Option>
                    ))}
                </Select>
            ),
            halfWidth: false,
        },
        {
            key: 2,
            label: 'Bank Account Number',
            name: 'bankAccountNumber',
            rules: [
                { required: true, message: 'Please enter a bank account number' },
                { max: 100, message: 'Account number must be at most 100 characters long' },
                { validator: validateBankAccountNumber },
            ],
            component: <Input size="large" placeholder="Enter bank account number" />,
            halfWidth: false,
        },
        {
            key: 3,
            label: 'Bank Account Owner Name',
            name: 'bankAccountOwner',
            rules: [
                { required: true, message: 'Please enter the account owner name' },
                { min: 2, message: 'Name must be at least 2 characters long' },
                { max: 50, message: 'Name must be at most 50 characters long' },
                { validator: validateWhitespace },
            ],
            component: <Input size="large" placeholder="Enter account owner name" />,
            halfWidth: false,
        },
        {
            key: 4,
            label: 'Month',
            name: 'month',
            initialValue: month,
            rules: [{ required: true, message: 'Please select a month' }],
            component: <Input size="large" value={month} disabled style={{ width: '100%' }} />,
            halfWidth: true,
        },
        {
            key: 5,
            label: 'Year',
            name: 'year',
            initialValue: year,
            rules: [{ required: true, message: 'Please select a year' }],
            component: <Input size="large" value={year} disabled style={{ width: '100%' }} />,
            halfWidth: true,
        },
    ];

    const handleFinish = async (values: any) => {
        try {
            const { bankAccountNumber, bankAccountOwner, bankName } = values;
            await postTutorSalary(tutorId, {
                bankAccountNumber,
                bankAccountOwner,
                bankName,
                month: parseInt(month),
                year: parseInt(year),
            });
            api.success({
                message: 'Success',
                description: 'Your request has been submitted.',
            });
        } catch (error: any) {
            const errorMessage =
                error.response && error.response.data
                    ? JSON.stringify(error.response.data)
                    : error.message;
            api.error({
                message: 'Error',
                description: errorMessage,
            });
        }
    };

    return (
        <div style={{ background: `white`, padding: `3%` }}>
            {contextHolderNotification}
            <Col lg={{ span: 12 }} sm={{ span: 16 }} xs={{ span: 24 }} style={{ margin: `auto` }}>
                <Title
                    style={{
                        color: `${theme.colors.primary}`,
                        textTransform: `capitalize`,
                        textAlign: `center`,
                    }}
                >
                    Withdraw Request
                </Title>
                <FormStyled.FormWrapper
                    form={form}
                    onFinish={handleFinish}
                    labelAlign="left"
                    requiredMark={false}
                    size="middle"
                    layout="vertical"
                    autoComplete="off"
                >
                    <FormStyled.FormContainer>
                        {fields.map((field) => {
                            if (fieldComponents.current.length === 2) fieldComponents.current = [];

                            const component = (
                                <Form.Item
                                    key={field.key}
                                    label={field.label}
                                    name={field.name}
                                    initialValue={field.initialValue}
                                    rules={field.rules}
                                    required
                                    style={field.halfWidth ? { width: '50%' } : { width: '100%' }}
                                >
                                    {field.component}
                                </Form.Item>
                            );

                            if (field.halfWidth) {
                                fieldComponents.current.push(component);

                                if (fieldComponents.current.length !== 2) return;
                            }

                            return fieldComponents.current.length === 2 ? (
                                <Flex gap={12} key={field.key} style={{ width: '100%' }}>
                                    {fieldComponents.current.map((component) => component)}
                                </Flex>
                            ) : (
                                component
                            );
                        })}

                        <FormStyled.ButtonDiv>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: '150px',
                                    borderRadius: '6px',
                                }}
                            >
                                Send Request
                            </Button>
                        </FormStyled.ButtonDiv>
                    </FormStyled.FormContainer>
                </FormStyled.FormWrapper>
            </Col>
        </div>
    );
};

export default SalaryForm;
