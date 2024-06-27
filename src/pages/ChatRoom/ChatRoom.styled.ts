import styled from 'styled-components';
interface MessageProps {
    self: boolean;
}
export const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 600px;
    width: 100%;

    border-left: 1px solid #e8e8e8;
`;

export const ChatMessages = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    background: #fff;
`;

export const Message = styled.div<MessageProps>`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    flex-direction: ${(props) => (props.self ? 'row-reverse' : 'row')};
`;

export const MessageData = styled.div<MessageProps>`
    margin: 0 10px;
    display: flex;

    align-items: center;
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
