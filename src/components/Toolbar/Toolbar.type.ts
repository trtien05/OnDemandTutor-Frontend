import { UserType } from '@/hooks/useAuth';
import { MenuProps } from 'antd';

export type DataType = {
    taskId: number;
    serviceId: number;
    serviceName: string;
    label: string;
    isRead: boolean;
};

export type NotificationType = {
    notificationId: number;
    userId: number;
    createdAt: string;
    read: boolean;
    message: string;
    title: string;
    entityId: number;
    user: UserType;
};

export type ToolbarProps = {
    menu: MenuProps['items'];
    notifications: NotificationType[];
    cartItems?: number;
    avatar?: string;
    userId?: number;
    handleReadAll: () => Promise<void>;
    handleReadOne: (notificationId: number) => Promise<void>;
};
