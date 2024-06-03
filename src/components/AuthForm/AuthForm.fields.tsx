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
                message: 'Vui lòng nhập đúng định dạng email.',
            },
            {
                max: 50,
                message: 'Email không được vượt quá 50 ký tự.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 2,
        label: 'Mật khẩu',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết hoa và một chữ cái viết thường.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
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
                message: 'Vui lòng nhập đúng định dạng email.',
            },
            {
                max: 50,
                message: 'Email không được vượt quá 50 ký tự.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 2,
        label: 'Họ và tên',
        name: 'fullName',
        rules: [
            {
                required: true,
                min: 2,
                max: 50,
                message: 'Vui lòng nhập họ và tên từ 2 đến 50 ký tự.',
            },
            {
                validator: validateWhitespace,
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 3,
        label: 'Số điện thoại',
        name: 'phoneNumber',
        rules: [
            {
                required: true,
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Vui lòng nhập đúng định dạng số điện thoại.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 4,
        label: 'Mật khẩu',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết hoa và một chữ cái viết thường.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
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
                message: 'Vu lòng nhập đúng định dạng email.',
            },
            {
                max: 50,
                message: 'Email không được vượt quá 50 ký tự.',
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
                    'Phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết hoa và một chữ cái viết thường.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
                placeholder=" "
            />
        ),
    },
    {
        key: 2,
        label: 'Xác nhận mật khẩu mới',
        name: 'confirm',
        dependencies: ['password'],
        rules: [
            {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu mới.',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp.'));
                },
            }),
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
                placeholder=" "
            />
        ),
    },
];
