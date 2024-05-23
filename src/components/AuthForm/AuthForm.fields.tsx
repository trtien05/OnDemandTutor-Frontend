import { Input } from 'antd';
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';
import { EyeOutlinedIcon, EyeInvisibleOutlinedIcon } from './AuthForm.styled';

export type FieldType = {
    key: number;
    label: string;
    name: string;
    dependencies?: NamePath[];
    rules: Rule[];
    children: JSX.Element;
    initialValue?: string;
};

const validateWhitespace = (_: unknown, value: string) => {
    if (value && value.trim() === '') {
        return Promise.reject('Please enter a valid value');
    }
    return Promise.resolve();
};

export const loginFields: FieldType[] = [
    {
        key: 1,
        label: 'Email',
        name: 'email',
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Please enter the correct email format.',
            },
            {
                max: 50,
                message: 'Email must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 2,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Must be between 8 and 16 characters, including a number, one uppercase letter, and one lowercase letter.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : <EyeInvisibleOutlinedIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                }
                placeholder=" "
            />
        ),
    },
];

export const registerFields: FieldType[] = [
    {
        key: 1,
        label: 'Email',
        name: 'email',
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Please enter the correct email format.',
            },
            {
                max: 50,
                message: 'Email must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 2,
        label: 'Full Name',
        name: 'fullName',
        rules: [
            {
                required: true,
                min: 2,
                max: 50,
                message: 'Please enter first and last name from 2 to 50 characters.',
            },
            {
                validator: validateWhitespace,
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 3,
        label: 'Phone',
        name: 'phoneNumber',
        rules: [
            {
                required: true,
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Please enter the correct phone number format.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 4,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Must be between 8 and 16 characters, including a number, one uppercase letter, and one lowercase letter.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : <EyeInvisibleOutlinedIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                }
                placeholder=" "
            />
        ),
    },
];

export const forgotPasswordFields: FieldType[] = [
    {
        key: 1,
        label: 'Email',
        name: 'email',
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Please enter the correct email format.',
            },
            {
                max: 50,
                message: 'Email must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder=" " />,
    },
];

export const setPasswordFields: FieldType[] = [
    {
        key: 1,
        label: 'Mật khẩu mới',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Must be between 8 and 16 characters, including a number, one uppercase letter, and one lowercase letter.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : <EyeInvisibleOutlinedIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                }
                placeholder=" "
            />
        ),
    },
    {
        key: 2,
        label: 'Confirm new password',
        name: 'confirm',
        dependencies: ['password'],
        rules: [
            {
                required: true,
                message: 'Please confirm new password.',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Confirmation password does not match.'));
                },
            }),
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : <EyeInvisibleOutlinedIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                }
                placeholder=" "
            />
        ),
    },
];
