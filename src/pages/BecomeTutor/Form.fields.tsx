import { Input, DatePicker, Select } from 'antd';
import { Rule } from 'antd/es/form';
import locale from 'antd/es/date-picker/locale/vi_VN'
import { NamePath } from 'antd/es/form/interface';
import { Degree, Gender } from '../../utils/enums';

export type FieldType = {
    key: number;
    label: string;
    name: string;
    rules: Rule[];
    children: JSX.Element;
    initialValue?: string;
    $width?: string;
};

const validateWhitespace = (_: unknown, value: string) => {
    if (value && value.trim() === '') {
        return Promise.reject('Please enter a valid value');
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
        return Promise.reject('You must be over 18 years old to be a tutor.');
    }

    return Promise.resolve();
};

export const aboutForm: FieldType[] = [
    {
        key: 1,
        label: 'Full name',
        name: 'name',
        initialValue: 'Nguyen Van A',
        rules: [
            {
                required: true,
                type: 'string',
                message: 'Please input your full name.',
            },
            {
                max: 50,
                message: 'Full name must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder=" "/>,
    },
    {
        key: 2,
        label: 'Phone number',
        name: 'phoneNumber',
        initialValue: '0908888888',
        rules: [
            {
                required: true,
                message: 'Please input your phone number.',
            },
            {
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Invalid phone number.',
            },
        ],
        children: <Input placeholder="0908888888" disabled />,
        $width: '40%',
    },
    {
        key: 3,
        label: 'Email',
        name: 'email',
        initialValue: 'abc@gmail.com',
        rules: [
            {
                required: true,
                message: 'Please input your phone number.',
            },
            {
                type: 'email',
                message: 'Invalid email.',
            },
        ],
        children: <Input placeholder="abc@example.com" disabled />,
        $width: '55%',
    },
    {
        key: 4,
        label: 'Date of Birth',
        name: 'dateOfBirth',
        rules: [
            {
                required: true,
                message: 'Please select your date of birth.',
            },
            {
                validator: validateBirthDate,
            },
        ],
        children: (
            <DatePicker
                size="large"
                placeholder="DD/MM/YYYY"
                locale={locale}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
            />
        ),
        $width: '65%',
    },
    {
        key: 5,
        label: 'Gender',
        name: 'gender',
        
        rules: [
            {
                required: true,
                message: 'Please select your Gender',
            },
        ],
        children: (
            <Select size="large" placeholder="Select gender" style={{flex:0}} >
                <Select.Option value={Gender.MALE}>Male</Select.Option>
                <Select.Option value={Gender.FEMALE}>Female</Select.Option>
                <Select.Option value={Gender.OTHER}>Other</Select.Option>
            </Select>
        ),
        $width: '30%',
    },
    {
        key: 6,
        label: 'Your address',
        name: 'address',
        rules: [
            {
                required: true,
                message: 'Please input your address',
            },
            {
                max: 50,
                message: 'Address must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder="Phuong 7, Quan Phu Nhuan, TP.HCM" />,
    },
    
]

export const educationForm: FieldType[] = [
    {
        key: 1,
        label: 'University',
        name: 'university',
        rules: [
            {
                required: true,
                type: 'string',
                message: 'Please input your university name.',
            },
            {
                max: 50,
                message: 'University name must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder="Ho Chi Minh City University of Education" />,
    },
    {
        key: 2,
        label: 'Degree',
        name: 'degree',
        rules: [
            {
                required: true,
                message: 'Please select your degree.',
            },
        ],
        children: (<Select size="large"  placeholder="Select degree type" style={{ flex: `0`, lineHeight: `2.8rem` }} >
        <Select.Option value={Degree.ASSOCIATE}>{Degree.ASSOCIATE}</Select.Option>
        <Select.Option value={Degree.BACHELOR}>{Degree.BACHELOR}</Select.Option>
        <Select.Option value={Degree.MASTER}>{Degree.MASTER}</Select.Option>
        <Select.Option value={Degree.DOCTORAL}>{Degree.DOCTORAL}</Select.Option>
    </Select>),
        $width: '40%',
    },
    {
        key: 3,
        label: 'Major',
        name: 'major',
        rules: [
            {
                required: true,
                message: 'Please input your major.',
            },
            {
                max: 50,
                message: 'Major name must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder="English Language" />,
        $width: '55%',
    },
    {
        key: 4,
        label: 'Specialization',
        name: 'specialization',
        rules: [
            {
                required: true,
                message: 'Please input your degree\'s specialization.',
            },
            {
                max: 50,
                message: 'Degree\'s specialization must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder="Interpretation - Translation" />,
        $width: '100%',
    },
]