import { MenuProps } from 'antd';

export type ToolbarProps = {
    menu: MenuProps['items'];
    avatar?: string;
    userId?: number;
};
