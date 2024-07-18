import { ItemType } from 'antd/es/menu/interface';

export type MenuType = {
    key: string;
    icon?: JSX.Element;
    label: JSX.Element;
};

// Personal Identifiable Information
export type PIIProps = {
    avatarUrl?: string;
    fullName: string;
    role: string;
    status: string;
};

export type HeaderProps = {
    role: string | null;
    status:string|null;
    navbar: MenuType[];
    menu: ItemType[];
    avatarUrl?: string;
};
