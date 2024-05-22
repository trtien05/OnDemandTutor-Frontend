import { Button, Empty, MenuProps, Popover, Typography } from 'antd';
import { NotifyMenu, PopoverHeader } from './Notify.styled';

import dayjs from 'dayjs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { NotificationType } from '../../components/Toolbar/Toolbar.type';
import NotifyItem from '../../components/Notify/NotifyItem';
import { theme } from '../../themes';
import { useState } from 'react';
import config from '../../config';

const { Paragraph, Text } = Typography;

interface NotifyProps {
    size?: number;
    items: NotificationType[];
    handleReadAll: () => Promise<void>;
    handleReadOne: (notificationId: number) => Promise<void>;
}

const Notify = ({ size, items, handleReadAll, handleReadOne }: NotifyProps) => {
    const [open, setOpen] = useState(false);

    const handleClosePopover = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const notifies = items.map((item) => ({
        key: item.notificationId,
        // label: (
        //     <NotifyItem
        //         // to={`${config.routes.customer.schedule}/${item.entityId}`}
        //         image={item.user.avatar}
        //         title={
        //             <Paragraph>
        //                 <Text strong>{item.title}</Text>
        //                 {item.message} ({dayjs(item.createdAt).format('DD/MM/YYYY')})
        //             </Paragraph>
        //         }
        //         // time={dayjs(item.createdAt).fromNow()}
        //         isRead={item.read}
        //         notificationId={item.notificationId}
        //         handleReadOne={handleReadOne}
        //     />
        // ),
    }));

    return (
        <Popover
            content={
                notifies.length === 0 ? (
                    <Empty description="Không có thông báo nào" style={{ width: '380px' }} />
                ) : (
                    <NotifyMenu
                        items={notifies as MenuProps['items']}
                        title="Thông báo"
                        onClick={handleClosePopover}
                    />
                )
            }
            title={
                <PopoverHeader>
                    <Text>Thông báo</Text>
                    <Button onClick={handleReadAll}>Đánh dấu đã đọc</Button>
                </PopoverHeader>
            }
            trigger="click"
            overlayInnerStyle={{
                padding: '12px 0',
            }}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <>
                <IoMdNotificationsOutline
                    size={size || 28}
                    color={theme.colors.textPrimary}
                    cursor="pointer"
                />
            </>
        </Popover>
    );
};

export default Notify;
