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
        title: 'Classes',
        to: config.routes.public.searchClasses,
    },
    {
        key: 3,
        title: 'Tutor',
        to: config.routes.public.searchTutors,
    },
    {
        key: 4,
        title: 'Contact',
        to: config.routes.public.contact,
    },
    {
        key: 5,
        title: 'Become a tutor',
        to: config.routes.public.regiterTutor,
    },
];

export const aboutUs: DataType[] = [
    {
        key: 1,
        title: '091-123-4567',
        to: 'tel:0949442727',
    },
    {
        key: 2,
        title: 'info@gmail.com',
        to: 'mailto:info@gmail.com',
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
