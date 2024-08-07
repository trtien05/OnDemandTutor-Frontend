import {
    Button,
    Form,
    Modal,
    Select,
    Tooltip,
    notification,
    Row,
    Col,
    Checkbox,
    Input,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { theme } from '../../../themes';
import { changeWithdrawRequest, sendWithdrawEmail } from '../../../utils/salaryAPI';

interface Record {
    id: number;
    bankAccountNumber?: string;
    bankAccountOwner?: string;
    bankName?: string;
    month?: number;
    year?: number;
    amount: number;
    status?: string;
}

interface EditProps {
    record: Record;
    onReload: () => void;
}

const EditSalary: React.FC<EditProps> = ({ record, onReload }) => {
    const [apiNoti, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const [agreement, setAgreement] = useState(false);
    const [status, setStatus] = useState(record.status || '');
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState<{ id: number; name: string }[]>([]);

    const rules = {
        required: true,
        message: 'This field is required!',
    };

    const charLimitRule = [
        {
            required: true,
            max: 255,
            message: 'This field cannot exceed 255 characters.',
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFinish = async (values: any) => {
        setLoading(true);

        const payload = {
            withdrawRequestId: record.id,
            updatedStatus: values.updatedStatus,
            ...(values.updatedStatus === 'REJECTED' && { rejectReason: values.rejectReason }),
            ...(values.updatedStatus === 'DONE' && {
                salaryPaidProvider: values.salaryPaidProvider,
                salaryPaidTransactionId: values.salaryPaidTransactionId,
            }),
        };
        try {
            const [response, responseEmail] = await Promise.all([
                changeWithdrawRequest(payload),
                sendWithdrawEmail(payload),
            ]);
            if (response.status === 200 && responseEmail.status === 200) {
                apiNoti.success({
                    message: 'Update Successful',
                    description: `Successfully updated : ${record.bankAccountOwner}`,
                });
                setTimeout(() => {
                    onReload();
                    setIsModalOpen(false);
                }, 1000);
            }
        } catch (error: any) {
            apiNoti.error({
                message: 'Update Failed',
                description: ` ${error.response.data.message}`,
            });
        } finally {
            setLoading(false);
        }
    };
    const handleStatusChange = (value: string) => {
        setStatus(value);
    };
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
    return (
        <>
            {contextHolder}
            <Tooltip title="Confirm Salary Request">
                <Button icon={<EditOutlined />} onClick={showModal} />
            </Tooltip>
            <Modal
                title={`Confirm Salary Request: ${record.bankAccountOwner}`}
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}
                width={800}
            >
                <Form
                    onFinish={handleFinish}
                    initialValues={{
                        updatedStatus: record.status,
                    }}
                    form={form}
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="updatedStatus" label="Status" rules={[rules]}>
                                <Select onChange={handleStatusChange}>
                                    <Select.Option value="DONE">DONE</Select.Option>
                                    <Select.Option value="PROCESSING">PROCESSING</Select.Option>
                                    <Select.Option value="REJECTED">REJECTED</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {status === 'DONE' && (
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="salaryPaidProvider"
                                    label="Bank Name"
                                    rules={[rules]}
                                >
                                    <Select
                                        size="large"
                                        placeholder="Select bank"
                                        style={{ width: '100%' }}
                                    >
                                        {banks.map((bank) => (
                                            <Select key={bank.id} value={bank.name}>
                                                {bank.name}
                                            </Select>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Col span={24}>
                                    <Form.Item
                                        name="salaryPaidTransactionId"
                                        label="Transaction ID"
                                        rules={charLimitRule}
                                    >
                                        <Input
                                            type="text"
                                            style={{ textTransform: 'uppercase', width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Col>
                        </Row>
                    )}
                    {status === 'REJECTED' && (
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="rejectReason"
                                    label="Rejection Reason"
                                    rules={charLimitRule}
                                >
                                    <Input.TextArea rows={4} style={{ resize: 'none' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                      new Error('You must agree before submitting'),
                                                  ),
                                    },
                                ]}
                            >
                                <Checkbox
                                    name="agreement"
                                    checked={agreement}
                                    defaultChecked={agreement}
                                    style={{
                                        margin: `20px 0`,
                                        color: `${theme.colors.black}`,
                                        fontWeight: `bold`,
                                    }}
                                    onChange={(e) => setAgreement(e.target.checked)}
                                >
                                    I have processed this request carefully
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item>
                                <Button loading={loading} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default EditSalary;
