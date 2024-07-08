import { TableColumnsType } from "antd";
import { Certificate, Education } from "../../TutorProfile.type";

export const EducationColumns: TableColumnsType<Education> = [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'index',
        render: (_, __, index) => index + 1,
    },
    {
        title: 'Degree Type',
        dataIndex: 'degreeType',
        sorter: (a, b) => a.degreeType.localeCompare(b.degreeType),
    },
    {
        title: 'University',
        dataIndex: 'universityName',
        sorter: (a, b) => a.universityName.localeCompare(b.universityName),
    },
    {
        title: 'Major',
        dataIndex: 'majorName',
        sorter: (a, b) => a.majorName.localeCompare(b.majorName),
    },
    {
        title: 'Specialization',
        dataIndex: 'specialization',
        sorter: (a, b) => a.specialization.localeCompare(b.specialization),
    },
    {
        title: 'Academic Year',
        dataIndex: 'academicYear',
    },
    {
        title: 'Is Verified',
        dataIndex: 'verified',
        sorter: (a, b) => a.verified.localeCompare(b.verified),
    },
];

export const CertColumns: TableColumnsType<Certificate> = [
    {
        title: 'No',
        dataIndex: 'id',
        key: 'index',
        render: (_,__,index) => index + 1
    },
    {
        title: 'Certificate Name',
        dataIndex: 'certificateName',
        sorter: (a, b) => a.certificateName.localeCompare(b.certificateName),
    },
    {
        title: 'Related Subject',
        dataIndex: 'subject',
        sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
        title: 'Issued By',
        dataIndex: 'issuedBy',
        sorter: (a, b) => a.issuedBy.localeCompare(b.issuedBy),
    },
    {
        title: 'Issued Year',
        dataIndex: 'issuedYear',
        sorter: (a, b) => a.issuedYear - b.issuedYear,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Description',
        dataIndex: 'description',
        sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
        title: 'Is Verified',
        dataIndex: 'verified',
        sorter: (a, b) => a.verified.localeCompare(b.verified),
    },
];

export interface TableData {
    dataType: string;
    EducationData?: Education[];
    CertificateData?: Certificate[];
}
