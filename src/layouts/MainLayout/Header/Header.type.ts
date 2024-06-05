import { ItemType } from 'antd/es/menu/interface';

export type MenuType = {
    key: string;
    icon?: JSX.Element;
    label: JSX.Element;
};

// Personal Identifiable Information
export type PIIProps = {
    avatar?: string;
    fullName: string;
};

export type HeaderProps = {
    role: string | null;
    navbar: MenuType[];
    menu: ItemType[];
    avatar?: string;
};
