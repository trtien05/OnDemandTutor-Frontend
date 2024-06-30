import { Input, DatePicker, Select, GetProps, UploadFile } from 'antd';
import { Rule, RuleObject } from 'antd/es/form';
import locale from 'antd/es/date-picker/locale/vi_VN'
import * as Enum from '../../utils/enums';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { DatePickerProps } from 'antd';
import { validateFileSize } from '../../utils/UploadImg';

// import 'moment/locale/vi';
// import locale from 'antd/es/locale/vi_VN';


const { RangePicker } = DatePicker;
const { TextArea } = Input;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);



export type FieldType = {
    key: string;
    label: string;
    name: string;
    rules: Rule[];
    children: JSX.Element;
    initialValue?: any;
    $width?: string;
};

const validateWhitespace = (_: unknown, value: string) => {
    if (value && value.trim() === "") {
        return Promise.reject("Please enter a valid value");
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
        return Promise.reject("You must be over 18 years old to be a tutor.");
    }

    return Promise.resolve();
};

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days after today and today
    const fourYearsFromToday = dayjs().add(4, 'year').endOf('day');
    return current && current > fourYearsFromToday;
};

const certDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days after today and today
    return current && current > dayjs().endOf('day');
};

const validateFileType = (_: RuleObject, fileList: UploadFile[]) => {
    if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

        if (file.type && !allowedTypes.includes(file.type)) {
            return Promise.reject("File type must be png, pdf, jpeg, or jpg");
        }
    }
    return Promise.resolve();
}

const validateSize = (_: RuleObject, fileList: UploadFile[]) => {
    if (fileList && fileList.length > 0) {
        const file = fileList[0];
        
        if (validateFileSize(file, 5)===false) {
            return Promise.reject("File type must not exceed 5MB");
        }
    }
    return Promise.resolve();
}

export const aboutForm: FieldType[] = [
    {
        key: '1',
        label: 'Full name',
        name: 'fullName',
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
        children: <Input placeholder='Nguyen Van An' />,
    },
    {
        key: '2',
        label: 'Phone number',
        name: 'phoneNumber',
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
        children: <Input placeholder='0908777777' />,
        $width: '40%',
    },
    {
        key: '3',
        label: 'Email',
        name: 'email',
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
        children: <Input placeholder='email' readOnly />,
        $width: '55%',
    },
    {
        key: '4',
        label: 'Date of Birth',
        name: 'dayOfBirth',
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
        key: '5',
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
                <Select.Option value={false}>Male</Select.Option>
                <Select.Option value={true}>Female</Select.Option>
            </Select>
        ),
        $width: '30%',
    },
    {
        key: '6',
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
        children: <Input name='address' placeholder="Phuong 7, Ho Van Hue, Phu Nhuan" />,
    },
];

export const educationForm: FieldType[] = [
    {
        key: '1',
        label: 'University',
        name: 'universityName',
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
        key: '2',
        label: 'Degree',
        name: 'degreeType',
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
        key: '3',
        label: 'Major',
        name: 'majorName',
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
        children: <Input name='majorName' placeholder="English Language" />,
        $width: '55%',
    },
    {
        key: '4',
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
        key: '5',
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
                placeholder={['Start year', 'End year']}

                style={{ width: `100%` }}
            />
        ),
    },
    {
        key: '6',
        label: `Diploma Verification`,
        name: 'diplomaVerification',
        rules: [
            {
                required: true,
                message: 'Please upload your diploma verification.',
            },
            {
                validator: validateFileType,
                message: 'File type must be png, pdf, jpeg, or jpg',
            },
            {
                validator: validateSize,
                message: 'File type must not exceed 5MB',
            },
        ],
        children: (
            <></>
        ),
    },
]

export const certificateForm: FieldType[] = [
    {
        key: '1',
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
        key: '2',
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
        key: '3',
        label: 'Description',
        name: 'description',
        rules: [
            {
                max: 100,
                message: 'Description must not exceed 100 characters.',
            },
        ],
        children: <TextArea rows={3}
            style={{    resize: 'none' }}
            name='description'
            placeholder="This field is optional" />,
    },
    {
        key: '4',
        label: 'Issued by',
        name: 'issuedBy',
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
        children: <Input name='issuedBy' placeholder="Trinity College London" />,
        $width: '70%',
    },
    {
        key: '5',
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
                placeholder="Year"
                disabledDate={certDate}
                style={{ width: `100%` }}
            />
        ),
        $width: '25%',
    },
    {
        key: '6',
        label: `Certificate Verification`,
        name: 'certificateVerification',
        rules: [
            {
                required: true,
                message: 'Please upload your certificate verification. It should be an image or .pdf file with a maximum size of 5MB.',
            },
            {
                validator: validateFileType,
                message: 'File type must be png, pdf, jpeg, or jpg',
            },
            {
                validator: validateSize,
                message: 'File type must not exceed 5MB',
            },
        ],
        children: (
            <></>
        ),
    },
]

