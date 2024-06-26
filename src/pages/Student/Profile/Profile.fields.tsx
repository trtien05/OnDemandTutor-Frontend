import { DatePicker, Input, Select } from 'antd';
import { Rule } from 'antd/es/form';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { Gender } from '../../../utils/enums';

type FieldType = {
    key: number;
    label: string;
    name: string;
    initialValue?: string|boolean|number;
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

const validateBirthDate = (_: unknown, value: string) => {
    if (!value) {
        return Promise.resolve();
    }

    const birthDate = new Date(value);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
        return Promise.reject('Users must be 18 years old and above');
    }

    return Promise.resolve();
};

export const fields: FieldType[] = [
    {
        key: 1,
        label: 'Full Name',
        name: 'fullName',
        rules: [
            {
                required: true,
                message: 'Please enter fullname',
            },
            {
                min: 2,
                message: 'Fullname must be at least 2 characters long',
            },
            {
                max: 50,
                message: 'Fullname must be at most 50 characters long',
            },
            {
                validator: validateWhitespace,
            },
        ],
        component: <Input size="large" placeholder="Enter fullname" />,
        halfWidth: false,
    },
    {
        key: 2,
        label: 'Date of birth',
        name: 'dateOfBirth',
        rules: [
            {
                required: true,
                message: 'Please enter date of birth',
            },
            {
                validator: validateBirthDate,
            },
        ],
        component: (
            <DatePicker
                size="large"
                placeholder="Select date of birth"
                locale={locale}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
            />
        ),
        halfWidth: true,
    },
    {
        key: 3,
        label: 'Gender',
        name: 'gender',
        initialValue: Gender.MALE,
        rules: [
            {
                required: true,
                message: 'Please select gender',
            },
            // {
            //     validator: validateWhitespace,
            // },
        ],
        component: (
            <Select size="large" placeholder="Select gender" style={{ width: '100%' }}>
                <Select.Option value={Gender.MALE}>Male</Select.Option>
                <Select.Option value={Gender.FEMALE}>Female</Select.Option>
                {/* <Select.Option value={Gender.OTHER}>Khác</Select.Option> */}
            </Select>
        ),
        halfWidth: true,
    },
    {
        key: 4,
        label: 'Phone number',
        name: 'phoneNumber',
        rules: [
            {
                required: true,
                message: 'Please enter phone number',
            },
            {
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Please enter a valid phone number',
            },
        ],
        component: (
            <Input size="large" placeholder="Enter phone number" style={{ width: '100%' }} />
        ),
        halfWidth: true,
    },
    {
        key: 5,
        label: 'Address',
        name: 'address',
        rules: [
            {
                required: true,
                message: 'Please enter your address',
            },
            {
                validator: validateWhitespace,
            },
        ],
        component: <Input size="large" placeholder="Enter address" />,
        halfWidth: true,
    },
    {
        key: 6,
        label: 'Email',
        name: 'email',
        rules: [
            {
                required: true,
                message: 'Please enter an email address',
            },
            {
                type: 'email',
                message: 'Please enter a valid email address',
            },
            {
                max: 50,
                message: 'Email must be at most 50 characters long',
            },
        ],
        component: <Input size="large" placeholder="Enter email" disabled />,
        halfWidth: false,
    },
    
    
];