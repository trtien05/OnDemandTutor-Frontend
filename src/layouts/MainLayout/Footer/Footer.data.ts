import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';

import { BiLogoFacebook } from 'react-icons/bi';
import { IconType } from 'react-icons';
import config from '../../../config';

type DataType = {
    key: number;
    title?: string;
    to: string;
    target?: string;
    icon?: IconType | undefined;
    label?: string;
};

export const pages: DataType[] = [
    {
        key: 1,
        title: 'Home',
        to: config.routes.public.home,
    },

    {
        key: 2,
        title: 'Tutors',
        to: config.routes.public.searchTutors,
    },
    {
        key: 2,
        title: 'Questions',
        to: config.routes.public.searchQuestions,
    },
    {
        key: 3,
        title: 'Become a tutor',
        to: config.routes.student.registerTutor,
    },
];

export const aboutUs: DataType[] = [
    {
        key: 1,
        title: '028-7300-5588',
        to: 'tel:02873005588',
    },
    {
        key: 2,
        title: 'mytutor.main.official@gmail.com',
        to: 'mailto:mytutor.main.official@gmail.com',
    },
];

export const socials: DataType[] = [
    {
        key: 1,
        icon: BiLogoFacebook,
        to: config.routes.public.home,
        label: 'Facebook',
    },
    {
        key: 2,
        icon: AiOutlineTwitter,
        to: config.routes.public.home,
        label: 'Twitter',
    },
    {
        key: 3,
        icon: AiOutlineInstagram,
        to: config.routes.public.home,
        label: 'Instagram',
    },
];
