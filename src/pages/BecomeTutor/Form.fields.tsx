import { Input, DatePicker, Select, GetProps } from 'antd';
import { Rule } from 'antd/es/form';
import locale from 'antd/es/date-picker/locale/vi_VN'
import { NamePath } from 'antd/es/form/interface';
import * as Enum from '../../utils/enums';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import FileUpload from '../../components/UploadImg';

const { RangePicker } = DatePicker;
const { TextArea } = Input
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);

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

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days after today and today
    return current && current > dayjs().endOf('day');
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
                validator: validateWhitespace,
                message: 'Please input your full name.',
            },
            {
                max: 50,
                message: 'Full name must not exceed 50 characters.',
            },
        ],
        children: <Input placeholder=" " />,
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
                
                message: 'Please input your email.',
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
            <Select size="large" placeholder="Select gender">
                <Select.Option value={Enum.Gender.MALE}>Male</Select.Option>
                <Select.Option value={Enum.Gender.FEMALE}>Female</Select.Option>
                <Select.Option value={Enum.Gender.OTHER}>Other</Select.Option>
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
                message: 'Please input your address.',
            },
            {
                validator: validateWhitespace,
                message: 'Please input your address.',
            },
            {
                max: 50,
                message: 'Address must not exceed 50 characters.',
            },
        ],
        children: <Input name='address' placeholder="Phuong 7, Quan Phu Nhuan, TP.HCM" />,
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
                validator: validateWhitespace,
                message: 'Please input your university name.',
            },
            {
                max: 50,
                message: 'University name must not exceed 50 characters.',
            },
        ],
        children: <Input name='university' placeholder="Ho Chi Minh City University of Education" />,
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
        children: (<Select size="large" placeholder="Select degree type" >
            <Select.Option value={Enum.Degree.ASSOCIATE}>{Enum.Degree.ASSOCIATE}</Select.Option>
            <Select.Option value={Enum.Degree.BACHELOR}>{Enum.Degree.BACHELOR}</Select.Option>
            <Select.Option value={Enum.Degree.MASTER}>{Enum.Degree.MASTER}</Select.Option>
            <Select.Option value={Enum.Degree.DOCTORAL}>{Enum.Degree.DOCTORAL}</Select.Option>
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
                validator: validateWhitespace,
                message: 'Please input your major.',
            },
            {
                max: 50,
                message: 'Major name must not exceed 50 characters.',
            },
        ],
        children: <Input name='major' placeholder="English Language" />,
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
                validator: validateWhitespace,
                message: 'Please input your degree\'s specialization.',
            },
            {
                max: 50,
                message: 'Degree\'s specialization must not exceed 50 characters.',
            },
        ],
        children: <Input name='specialization' placeholder="Interpretation - Translation" />,
        $width: '100%',
    },
    {
        key: 5,
        label: 'Academic year',
        name: 'academicYear',
        rules: [
            {
                required: true,
                message: 'Please select your academic year.',
            },
        ],
        children: (
            <RangePicker
                size='large'
                picker="year"
                disabledDate={disabledDate}
                id={{
                    start: 'startYear',
                    end: 'endYear',
                }}
                style={{ width: `100%` }}
            />
        ),
    },
    {
        key: 6,
        label: `Diploma Verification`,
        name: 'educationVerification',
        rules: [
            {
                required: false,
                message: 'Please upload your diploma verification.',
            },
        ],
        children: (
            <FileUpload />
        ),
    },
]

export const certificateForm: FieldType[] = [
    {
        key: 1,
        label: 'Subject',
        name: 'subject',
        rules: [
            {
                required: true,
                message: 'Please select a subject for your certificate.',
            },
        ],
        children: (
            <Select size="large" placeholder="Select Subject">
                {Object.values(Enum.Subject).map((subject) => (
                    <Select.Option key={subject} value={subject}>
                        {subject}
                    </Select.Option>
                ))}
            </Select>
        ),
    },
    {
        key: 2,
        label: 'Certificate name',
        name: 'certificateName',
        rules: [
            {
                required: true,
                message: 'Please input your certificate name.',
                
            },
            {
                validator: validateWhitespace,
                message: 'Please input your certificate name.',
            },
            {
                max: 50,
                message: 'Certificate name must not exceed 50 characters.',
            },
        ],
        children: <Input name='certificateName' placeholder='TESOL' />,
    },
    {
        key: 3,
        label: 'Description',
        name: 'description',
        rules: [
            {
                max: 100,
                message: 'Description must not exceed 100 characters.',
            },
        ],
        children: <TextArea rows={3} name='description' placeholder="Teaching English as a second or foreign language" />,
    },
    {
        key: 4,
        label: 'Issued by',
        name: 'issuedOrganization',
        rules: [
            {
                required: true,
                message: 'Please input your certificate\'s issued organization.',
                
            },
            {
                validator: validateWhitespace,
                message: 'Please input your certificate\'s issued organization.',
            },
            {
                max: 50,
                message: 'Certificate\'s issued organization name must not exceed 50 characters.',
            },
        ],
        children: <Input name='issuedOrganization' placeholder="Trinity College London" />,
        $width: '70%',
    },
    {
        key: 5,
        label: 'Issued year',
        name: 'issuedYear',
        rules: [
            {
                required: true,
                message: 'Please select your certificate\'s issued year.',
            },
        ],
        children: (
            <DatePicker
                size='large'
                picker="year"
                disabledDate={disabledDate}
                style={{ width: `100%` }}
            />
        ),
        $width: '25%',
    },
    {
        key: 6,
        label: `Certificate Verification`,
        name: 'certificateVerification',
        rules: [
            {
                required: false,
                message: 'Please upload your certificate verification.',
            },
        ],
        children: (
            <FileUpload />
        ),
    },
]