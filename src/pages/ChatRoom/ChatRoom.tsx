import { over, Client } from 'stompjs';
import SockJS from 'sockjs-client';
import * as Styled from './ChatRoom.styled';
import { Avatar, Button, Layout, List, Skeleton } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth.ts';
import useDocumentTitle from '../../hooks/useDocumentTitle.ts';
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import config from '../../config/index.ts';

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
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const { id, fullName, avatar } = location.state || {};

  const [privateChats, setPrivateChats] = useState<Map<number, ChatMessage[]>>(new Map());
  const [loadingPrivateChats, setLoadingPrivateChats] = useState<boolean>(true);
  const [tab, setTab] = useState<string>("CHATROOM");
  const [unreadTabs, setUnreadTabs] = useState<Set<number>>(new Set());
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    avatarUrl: '',
    receiverId: 0,
    connected: false,
    message: '',
    name: ''
  });
  const [hasChats, setHasChats] = useState<boolean>(false);

  useEffect(() => {
    if (user && !userData.connected) {
      setUserData({ ...userData, id: user.id, avatarUrl: user.avatarUrl, name: user.fullName });
      connect();
    }
  }, [user]);

  useEffect(() => {
    if (userData.connected) {
      fetchMessages();
      setLoading(false);
    }
  }, [userData.connected]);

  useEffect(() => {
    if (privateChats.size > 0 && tab === "CHATROOM") {
      setTab([...privateChats.keys()][0].toString());
      setLoadingPrivateChats(false);
    }
  }, [privateChats]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [privateChats, tab]);

  const connect = () => {
    let Sock = new SockJS(`${config.publicRuntime.API_URL}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient?.subscribe(`/user/${user?.id}/private`, onPrivateMessage);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${config.publicRuntime.API_URL}/api/messages/accounts/${user?.id}`);
      const data: ChatMessage[] = await response.json();
      if (data.length > 0) {
        setHasChats(true);
      } else {
        setHasChats(false);
      }
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
        chats.get(chatKey)!.push({ ...msg });

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
        setHasChats(true);
        setPrivateChats(prev => {
          if (!prev.has(id)) {
            const newChats = new Map(prev);
            newChats.set(id, []);
            return newChats;
          }
          return prev;
        });
        setTab(id.toString());
        setLoadingPrivateChats(false);

      }
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };

  const onPrivateMessage = (payload: { body: string }) => {
    const payloadData = JSON.parse(payload.body);
    const chatKey = payloadData.senderId;

    const defaultName = 'Unknown';
    const defaultAvatarUrl = 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg';
    const fullName = payloadData.senderFullName || defaultName;
    const avatarUrl = payloadData.senderAvatarUrl || defaultAvatarUrl;

    setAccount(a => {
      const accounts = new Map(a);
      if (!accounts.has(chatKey)) {
        accounts.set(chatKey, {
          fullName: fullName,
          avatarUrl: avatarUrl
        });
      }
      return new Map(accounts);
    });

    setPrivateChats(prevChats => {
      const updatedChats = new Map(prevChats);
      if (updatedChats.has(chatKey)) {
        const chatMessages = updatedChats.get(chatKey)!;
        const isDuplicate = chatMessages.some(msg => msg.createdAt === payloadData.createdAt && msg.message === payloadData.message);
        if (!isDuplicate) {
          chatMessages.push({ ...payloadData });
          if (tab !== chatKey.toString()) {
            setUnreadTabs(prev => new Set([...prev, chatKey]));
          }
        }
      } else {
        updatedChats.set(chatKey, [{ ...payloadData }]);
        if (tab !== chatKey.toString()) {
          setUnreadTabs(prev => new Set([...prev, chatKey]));
        }
      }
      return new Map([...updatedChats.entries()].sort((a, b) => {
        const aLastMessage = a[1][a[1].length - 1];
        const bLastMessage = b[1][b[1].length - 1];
        return new Date(bLastMessage.createdAt).getTime() - new Date(aLastMessage.createdAt).getTime();
      }));
    });
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
      };

      setPrivateChats(prevChats => {
        const updatedChats = new Map(prevChats);
        if (updatedChats.has(parseInt(tab))) {
          updatedChats.get(parseInt(tab))!.push({ ...chatMessage });
        } else {
          updatedChats.set(parseInt(tab), [{ ...chatMessage }]);
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

    const messageContent = latestMessage.message.slice(0, 20);

    return `${senderName} ${messageContent}`;
  };

  const truncateText = (text?: string): string | undefined => {
    if (!text) return undefined;
    return text.length > 20 ? `${text.slice(0, 20)}...` : text;
  };
  return (
    <Layout>
      <>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Sider width={350} style={{ background: '#fff', height: '600px', padding: '0 20px', overflowY: 'auto' }}>
            <Skeleton style={{ padding: '20px', backgroundColor: '#F4D1F3', borderRadius: '25px', }} avatar loading={loading} paragraph={{ rows: 2 }} active>
              <List
                loading={loadingPrivateChats}
                itemLayout="horizontal"
                dataSource={[...privateChats.keys()]}
                renderItem={(id) => {
                  const isCurrentTab = tab === id.toString();
                  return (
                    <List.Item onClick={() => {
                      setTab(id.toString());
                      if (unreadTabs.has(id)) {
                        setUnreadTabs(prev => {
                          const newUnreadTabs = new Set(prev);
                          newUnreadTabs.delete(id);
                          return newUnreadTabs;
                        });
                      }
                    }}
                      style={{
                        cursor: 'pointer',
                        padding: '20px', borderRadius: '25px',
                        backgroundColor: isCurrentTab ? '#F4D1F3' : ''
                      }}
                    >
                      <Styled.CustomListItemMeta
                        avatar={<Avatar size={50} src={account.get(id)?.avatarUrl} />}
                        title={truncateText(account.get(id)?.fullName) || 'Unknown'}
                        unread={unreadTabs.has(id)}
                        description={
                          <span className="message-content">
                            {truncateText(getLatestMessage(privateChats.get(id)))}
                          </span>
                        }
                        as={List.Item.Meta}
                      />
                    </List.Item>
                  )
                }}
              />
            </Skeleton>
          </Sider>

          <Skeleton style={{ padding: '0 50px', backgroundColor: '#fff' }} paragraph={{ rows: 6 }} avatar loading={loading} active>
            <Content style={{ minHeight: 280 }}>
              <Styled.ChatBox>
                {hasChats ? (
                  <Styled.ChatMessages ref={chatMessagesRef}>
                    {(privateChats.get(parseInt(tab)) ?? []).map((chat, index) => {
                      const isSelf = chat.senderId === user?.id;
                      const messageTime = chat.createdAt ? format(parseDate(chat.createdAt), 'HH:mm') : 'Invalid Date';

                      return (
                        <Styled.Message self={isSelf} key={index}>
                          {!isSelf && (
                            user?.role === "TUTOR" ? (
                              <Link to={`${config.routes.public.searchTutors}/${chat.senderId}`}>
                                <Avatar size={45} src={chat.senderAvatarUrl} />
                              </Link>
                            ) : (
                              user?.role === "STUDENT" && (
                                <Avatar size={45} src={chat.senderAvatarUrl} />
                              )
                            )
                          )}
                          <Styled.MessageData self={isSelf}>
                            <Styled.MessageTime self={isSelf}>
                              {messageTime}
                            </Styled.MessageTime>
                            <Styled.MessageContent self={isSelf}>{chat.message}</Styled.MessageContent>
                          </Styled.MessageData>
                        </Styled.Message>
                      )
                    })}
                  </Styled.ChatMessages>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', height: '600px', backgroundColor: '#fff', color: '#b8b8b8' }}>
                    <p>No conversations yet. Start a new chat!</p>
                    <p>You can schedule with our teachers and send messages to them in the tutor details section</p>
                    <p>or if you don't have any teachers yet</p> <Link to={config.routes.public.searchTutors}>Click Here</Link>
                  </div>
                )}
                <Styled.SendMessage>
                  <TextArea
                    required
                    maxLength={100}
                    rows={2}
                    value={userData.message}
                    style={{ height: 120, resize: 'none', margin: '0 10px' }}
                    onChange={handleMessage}
                    placeholder="Your message..."
                    disabled={!hasChats}
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    disabled={!userData.message.trim() || !hasChats}
                    icon={<SendOutlined />}
                    onClick={sendPrivateValue}
                  />
                </Styled.SendMessage>

              </Styled.ChatBox>

            </Content>
          </Skeleton>
        </div>
      </>
    </Layout>
  );
};

export default ChatRoom;
