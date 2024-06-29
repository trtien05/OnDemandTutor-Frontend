import { List } from 'antd';
import styled from 'styled-components';
interface MessageProps {
    self: boolean;
}
export const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 600px;
    width: 100%;
    overflow-y: auto;
    border-left: 1px solid #e8e8e8;
`;

export const ChatMessages = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 24px;
    background: #fff;
`;

export const Message = styled.div<MessageProps>`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    flex-direction: ${(props) => (props.self ? 'row-reverse' : 'row')};
    padding: 10px;
    border-radius: 10px;
`;
interface CustomListItemMetaProps {
    unread?: boolean;
}
export const CustomListItemMeta = styled(List.Item.Meta)<CustomListItemMetaProps>`
    .message-content {
        font-size: 15px;
        font-style: normal;
        ${(props) =>
            props.unread &&
            ` color: black;
              font-weight: 700;
        `}
    }
`;
export const MessageData = styled.div<MessageProps>`
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;
export const NameMessage = styled.p<MessageProps>`
    display: ${(props) => (props.self ? 'none' : 'block')};
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    color: #b94ab7;
`;
export const MessageTime = styled.p<MessageProps>`
    font-size: 0.8em;
    text-align: ${(props) => (props.self ? 'right' : 'left')};
    color: gray;
    margin-left: 10px;
`;
export const MessageContent = styled.p<MessageProps>`
    text-align: ${(props) => (props.self ? 'right' : 'left')};
    background-color: #e1dfdf;
    padding: 5px 10px;
    border-radius: 18px;
`;
export const SendMessage = styled.div`
    display: flex;
    align-items: end;

    padding: 16px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
`;

export const Register = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
`;
