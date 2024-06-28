import React, { useEffect, useState, useRef } from 'react';
import { over, Client } from 'stompjs';
import SockJS from 'sockjs-client';
import './style.css';
import * as Styled from './ChatRoom.styled';
import { Avatar, Button, Input, Layout, List, Typography, message } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth.ts';

const { Text } = Typography;

type ChatMessage = {
  senderId: number;
  receiverId?: number;
  message: string;
  status: string;
  receiverAvatarUrl?: string;
  receiverFullName?: string;
  senderAvatarUrl?: string;
  senderFullName?: string;
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
}

let stompClient: Client | null = null;

const ChatRoom: React.FC = () => {
  const [account, setAccount] = useState<Map<number, Account>>(new Map());
  const { user } = useAuth();
  const [privateChats, setPrivateChats] = useState<Map<number, ChatMessage[]>>(new Map());
  const [tab, setTab] = useState<string>("CHATROOM");
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    avatarUrl: '',
    receiverId: 0,
    connected: false,
    message: '',
    name: ''
  });

  const chatMessagesRef = useRef<HTMLDivElement>(null); // Ref to chat messages

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
    scrollToBottom(); // Scroll to bottom on private chat change
  }, [tab, privateChats]);

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
      data.forEach(msg => {
        const chatKey = msg.senderId === user?.id ? msg.receiverId! : msg.senderId;
        const defeaultName = 'Unknown';
        const defaultAvatarUrl = 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg';
        const fullName = msg.senderId === user?.id ? (msg.receiverFullName || defeaultName) : (msg.senderFullName || defeaultName);
        const avatarUrl = msg.senderId === user?.id ? (msg.receiverAvatarUrl || defaultAvatarUrl) : (msg.senderAvatarUrl || defaultAvatarUrl);
        if (!privateChats.has(chatKey)) {
          privateChats.set(chatKey, []);
        }
        privateChats.get(chatKey)!.push(msg);
        if (!account.has(chatKey)) {
          account.set(chatKey, {
            fullName: fullName,
            avatarUrl: avatarUrl
          });
          setAccount(account);
        }
      });
      setPrivateChats(new Map(privateChats));
      scrollToBottom(); // Scroll to bottom after fetching messages
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };

  // Log privateChats changes
  const onPrivateMessage = (payload: { body: string }) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.has(payloadData.senderId)) {
      privateChats.get(payloadData.senderId)!.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list: ChatMessage[] = [payloadData];
      privateChats.set(payloadData.senderId, list);
      setPrivateChats(new Map(privateChats));
    }
    scrollToBottom(); // Scroll to bottom after receiving new message
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const handleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendPrivateValue = () => {
    if (stompClient && tab && userData.message.trim() !== "") {
      var chatMessage: ChatMessage = {
        senderId: userData.id,
        receiverId: parseInt(tab),
        message: userData.message.trim(),
        status: "MESSAGE"
      };
      if (privateChats.has(parseInt(tab))) {
        privateChats.get(parseInt(tab))!.push(chatMessage);
      } else {
        privateChats.set(parseInt(tab), [chatMessage]);
      }
      setPrivateChats(privateChats);

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });

      scrollToBottom(); // Scroll to bottom after sending message
    }
  };

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
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
                      description="Lastest message..."
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
                  const isSelf = chat.senderId === userData.id;
                  return (
                      <Styled.Message self={isSelf} key={index}>
                        {!isSelf && <Avatar size={40} src={chat.senderAvatarUrl} />}
                        <Styled.MessageData self={chat.senderId === userData.id}>
                          <Text>{chat.message}</Text>
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
      ) : null
      }
    </Layout >
  );
};

export default ChatRoom;
