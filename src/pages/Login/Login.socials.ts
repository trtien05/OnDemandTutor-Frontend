import { theme } from '@/themes';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsApple } from 'react-icons/bs';

const socials = [
    {
        key: 1,
        href: '/',
        icon: FcGoogle,
        size: 44,
        color: 'unset',
    },
    {
        key: 2,
        href: '/',
        icon: BsFacebook,
        size: 44,
        color: theme.colors.facebook,
    },
    {
        key: 3,
        href: '/',
        icon: BsApple,
        size: 44,
        color: theme.colors.black,
    },
];

export default socials;
