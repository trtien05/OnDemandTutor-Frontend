import { Avatar, Typography } from 'antd';
import { NotificationItemContent, NotificationItemWrapper } from './NotifyItem.styled';

type NotifyItemProps = {
    to: string;
    image: string;
    title: JSX.Element;
    time: string;
    isRead: boolean;
    notificationId: number;
    handleReadOne: (notificationId: number) => void;
};

const { Text } = Typography;

const NotifyItem = ({
    // to,
    image,
    title,
    // time,
    isRead,
    notificationId,
    handleReadOne,
}: NotifyItemProps) => {
    return (
        <NotificationItemWrapper
            // to={to}
            $isRead={isRead}
            onClick={() => handleReadOne(notificationId)}
        >
            {/* <Avatar src={image} alt={time} size={56} /> */}

            <NotificationItemContent>
                {title}
                {/* <Text>{time}</Text> */}
            </NotificationItemContent>
        </NotificationItemWrapper>
    );
};

export default NotifyItem;
