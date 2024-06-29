import React, { useEffect, useState, useRef } from 'react';
import { over, Client } from 'stompjs';
import SockJS from 'sockjs-client';
import './style.css';
import * as Styled from './ChatRoom.styled';
import { Avatar, Button, Layout, List } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth.ts';
import useDocumentTitle from '../../hooks/useDocumentTitle.ts';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

type ChatMessage = {
  senderId: number;
  receiverId?: number;
  message: string;
  status: string;
  receiverAvatarUrl?: string;
  receiverFullName?: string;
  senderAvatarUrl?: string;
  senderFullName?: string;
  createdAt: string;
  isRead: boolean; // Thêm trường isRead vào đây
};

type UserData = {
  id: number;
  avatarUrl: string;
  receiverId: number;
  connected: boolean;
  message: string;
  name?: string;
};

type Account = {
  fullName: string;
  avatarUrl: string;
};

let stompClient: Client | null = null;

const ChatRoom: React.FC = () => {
  useDocumentTitle("Chat Room | MyTutor");
  const [account, setAccount] = useState<Map<number, Account>>(new Map());
  const { user } = useAuth();
  const location = useLocation();
  const { id, fullName, avatar } = location.state || {};
  console.log(id, fullName, avatar)

  const [privateChats, setPrivateChats] = useState<Map<number, ChatMessage[]>>(new Map());
  const [tab, setTab] = useState<string>("CHATROOM");
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    avatarUrl: '',
    receiverId: 0,
    connected: false,
    message: '',
    name: ''
  });

  console.log(privateChats);
  useEffect(() => {
    if (user && !userData.connected) {
      setUserData({ ...userData, id: user.id, avatarUrl: user.avatarUrl, name: user.fullName });
      connect();
    }
  }, [user]);

  useEffect(() => {
    if (userData.connected) {
      fetchMessages();
    }
  }, [userData.connected]);

  useEffect(() => {
    if (privateChats.size > 0 && tab === "CHATROOM") {
      setTab([...privateChats.keys()][0].toString());
    }
  }, [privateChats]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [privateChats, tab]);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient?.subscribe(`/user/${user?.id}/private`, onPrivateMessage);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/messages/accounts/${user?.id}`);
      const data: ChatMessage[] = await response.json();
      const chats = new Map(privateChats);
      const accounts = new Map(account);

      data.forEach(msg => {
        const chatKey = msg.senderId === user?.id ? msg.receiverId! : msg.senderId;

        if (chatKey === user?.id) {
          return;
        }

        const defaultName = 'Unknown';
        const defaultAvatarUrl = 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg';
        const fullName = msg.senderId === user?.id ? (msg.receiverFullName || defaultName) : (msg.senderFullName || defaultName);
        const avatarUrl = msg.senderId === user?.id ? (msg.receiverAvatarUrl || defaultAvatarUrl) : (msg.senderAvatarUrl || defaultAvatarUrl);

        if (!chats.has(chatKey)) {
          chats.set(chatKey, []);
        }
        chats.get(chatKey)!.push(msg);

        if (!accounts.has(chatKey)) {
          accounts.set(chatKey, {
            fullName: fullName,
            avatarUrl: avatarUrl
          });
        }
      });

      setAccount(accounts);
      setPrivateChats(new Map([...chats.entries()].sort((a, b) => {
        const aLastMessage = a[1][a[1].length - 1];
        const bLastMessage = b[1][b[1].length - 1];
        return new Date(bLastMessage.createdAt).getTime() - new Date(aLastMessage.createdAt).getTime();
      })));
      if (id && fullName && avatar) {
        setAccount(prev => new Map(prev.set(id, { fullName, avatarUrl: avatar })));
        setPrivateChats(prev => {
          if (!prev.has(id)) {
            const newChats = new Map(prev);
            newChats.set(id, []);
            return newChats;
          }
          return prev;
        });
        setTab(id.toString());
      }
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };

  const onPrivateMessage = (payload: { body: string }) => {
    const payloadData = JSON.parse(payload.body);
    const chatKey = payloadData.senderId;
    // const defaultName = 'Unknown';
    // const defaultAvatarUrl = 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg';
    // const fullName = payloadData.senderFullName || defaultName;
    // const avatarUrl = payloadData.senderAvatarUrl || defaultAvatarUrl;

    // const accounts = new Map(account);
    // if (!accounts.has(chatKey)) {
    //   accounts.set(chatKey, {
    //     fullName: fullName,
    //     avatarUrl: avatarUrl
    //   });
    // }
    // setAccount(accounts);
    setPrivateChats(prevChats => {
      const updatedChats = new Map(prevChats);
      if (updatedChats.has(chatKey)) {
        const chatMessages = updatedChats.get(chatKey)!;
        const isDuplicate = chatMessages.some(msg => msg.createdAt === payloadData.createdAt && msg.message === payloadData.message);
        if (!isDuplicate) {
          chatMessages.push(payloadData);
        }
      } else {
        updatedChats.set(chatKey, [payloadData]);
      }
      return new Map([...updatedChats.entries()].sort((a, b) => {
        const aLastMessage = a[1][a[1].length - 1];
        const bLastMessage = b[1][b[1].length - 1];
        return new Date(bLastMessage.createdAt).getTime() - new Date(aLastMessage.createdAt).getTime();
      }));
    });
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const handleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendPrivateValue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (stompClient && tab && userData.message.trim() !== "") {
      const currentDate = new Date();
      const chatMessage: ChatMessage = {
        senderId: user?.id || 0,
        receiverId: parseInt(tab),
        message: userData.message.trim(),
        status: "MESSAGE",
        createdAt: currentDate.toISOString(),
        isRead: false
      };

      setPrivateChats(prevChats => {
        const updatedChats = new Map(prevChats);
        if (updatedChats.has(parseInt(tab))) {
          updatedChats.get(parseInt(tab))!.push(chatMessage);
        } else {
          updatedChats.set(parseInt(tab), [chatMessage]);
        }
        return new Map([...updatedChats.entries()].sort((a, b) => {
          const aLastMessage = a[1][a[1].length - 1];
          const bLastMessage = b[1][b[1].length - 1];
          return new Date(bLastMessage.createdAt).getTime() - new Date(aLastMessage.createdAt).getTime();
        }));
      });

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return new Date();
    }
    return date;
  };
  const getLatestMessage = (messages: ChatMessage[] | undefined): string => {
    if (!messages || messages.length === 0) {
      return 'No messages yet';
    }

    const latestMessage = messages[messages.length - 1];
    const senderName = latestMessage.senderId === user?.id ? 'You:' : '';
    return `${senderName} ${latestMessage.message}`;
  };
  return (
    <Layout>
      {userData.connected ? (
        <>
          <Sider width={300} style={{ background: '#fff', height: '600px', padding: '0 20px' }}>
            <List
              itemLayout="horizontal"
              dataSource={[...privateChats.keys()]}
              renderItem={(id) => {
                return (
                  <List.Item onClick={() => setTab(id.toString())} style={{ cursor: 'pointer', background: tab === id.toString() ? '#F4D1F3' : '#fff', padding: '20px', borderRadius: '25px' }}>
                    <List.Item.Meta
                      avatar={<Avatar size={50} src={account.get(id)?.avatarUrl} />}
                      title={account.get(id)?.fullName}
                      description={getLatestMessage(privateChats.get(id))}
                    />
                  </List.Item>
                )
              }}
            />
          </Sider>

          <Content style={{ minHeight: 280 }}>
            <Styled.ChatBox>
              <Styled.ChatMessages ref={chatMessagesRef}>
                {(privateChats.get(parseInt(tab)) ?? []).map((chat, index) => {
                  const isSelf = chat.senderId === user?.id;
                  const messageTime = chat.createdAt ? format(parseDate(chat.createdAt), 'HH:mm') : 'Invalid Date';

                  return (
                    <Styled.Message self={isSelf} isRead={chat.isRead} key={index}>
                      {!isSelf && <Avatar size={45} src={chat.senderAvatarUrl} />}
                      <Styled.MessageData isRead={chat.isRead} self={isSelf}>
                        <Styled.MessageTime isRead={chat.isRead} self={isSelf}>
                          {messageTime}
                        </Styled.MessageTime>
                        <Styled.MessageContent isRead={chat.isRead} self={isSelf}>{chat.message}</Styled.MessageContent>
                      </Styled.MessageData>
                    </Styled.Message>
                  )
                })}
              </Styled.ChatMessages>
              <Styled.SendMessage>
                <TextArea
                  required
                  maxLength={100}
                  rows={2}
                  value={userData.message}
                  style={{ height: 120, resize: 'none', marginRight: '10px' }}
                  onChange={handleMessage}
                  placeholder="Your message..."
                />
                <Button
                  type="primary"
                  shape="circle"
                  disabled={!userData.message.trim()}
                  icon={<SendOutlined />}
                  onClick={sendPrivateValue}
                />
              </Styled.SendMessage>
            </Styled.ChatBox>
          </Content>
        </>
      ) : null}
    </Layout>
  );
};

export default ChatRoom;
