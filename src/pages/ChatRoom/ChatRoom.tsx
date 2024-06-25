import React, { useEffect, useState, ChangeEvent } from 'react';
import { over, Client } from 'stompjs';
import SockJS from 'sockjs-client';
import './style.css';
import * as Styled from './ChatRoom.styled';
import { Avatar, Button, Input, Layout, List, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';
import Container from '../../components/Container/Container';
import useAuth from '../../hooks/useAuth.ts';
import { useParams } from 'react-router-dom';
const { Text } = Typography;

type ChatMessage = {
  senderId: number;
  receiverId?: number;
  message: string;
  status: string;
  receiverAvatarUrl?: string;
  receiverFullName?: string;
};

type UserData = {
  id: number;
  avatarUrl: string;
  receiverId: number;
  connected: boolean;
  message: string;
  name?: string; // Add name to UserData type if not already included

};


let stompClient: Client | null = null;

const ChatRoom: React.FC = () => {
  const { user } = useAuth();
  const [privateChats, setPrivateChats] = useState<Map<number, ChatMessage[]>>(new Map());
  const [tab, setTab] = useState<string>("CHATROOM");
  const [userData, setUserData] = useState<UserData>({
    id: user?.id || 0,
    avatarUrl: user?.avatarUrl || '',
    receiverId: 0,
    connected: false,
    message: '',
    name: user?.fullName || ''
  });

  useEffect(() => {
    if (user && !userData.connected) {
      setUserData({ ...userData, id: user.id, avatarUrl: user.avatarUrl, name: user.fullName });
      connect();
    }
  }, [user]);


  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient?.subscribe(`/user/${userData.id}/private`, onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderId: userData.id,
      status: "JOIN",
      message: "",
      avatarUrl: userData.avatarUrl
    };
    stompClient?.send("/app/message", {}, JSON.stringify(chatMessage));
  };


  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/messages/accounts/${user?.id}`);
      console.log(response);
      const data: ChatMessage[] = await response.json();
      // console.log(data);
      const newPrivateChats = new Map(privateChats);
      data.forEach(msg => {
        if (msg.senderId === userData.id) {
          const chatKey = msg.senderId === userData.id ? msg.receiverId! : msg.senderId;
          if (!newPrivateChats.has(chatKey)) {
            newPrivateChats.set(chatKey, []);
          }
          newPrivateChats.get(chatKey)!.push(msg);
        }
      });
      setPrivateChats(new Map(newPrivateChats));
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };
  useEffect(() => {
    if (userData.connected) {
      fetchMessages();

    }
  }, [userData.connected]);

  const onPrivateMessage = (payload: { body: string }) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderId)) {
      privateChats.get(payloadData.senderId)!.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list: ChatMessage[] = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderId, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };


  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage: ChatMessage = {
        senderId: userData.id,
        receiverId: parseInt(tab),
        message: userData.message,
        status: "MESSAGE",
        receiverAvatarUrl: userData.avatarUrl,
        receiverFullName: userData.name
      };
      console.log(chatMessage);

      if (userData.id !== parseInt(tab)) {
        privateChats.get(parseInt(tab))!.push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  console.log(privateChats);

  return (
    <Layout>
      {userData.connected ? (
        <>
          <Sider width={300} style={{ background: '#fff', height: '600px', padding: '0 20px' }}>
            <List
              itemLayout="horizontal"
              dataSource={[...privateChats.keys()]}
              renderItem={(id) => (
                <List.Item onClick={() => setTab(id.toString())} style={{ cursor: 'pointer', background: tab === id.toString() ? '#F4D1F3' : '#fff', padding: '20px', borderRadius: '25px' }}>
                  <List.Item.Meta
                    avatar={<Avatar size={50} src={privateChats.get(id)?.[0]?.receiverAvatarUrl || ''} />}
                    title={privateChats.get(id)?.[0]?.receiverFullName || ``}
                    description="Lastest message..."
                  />
                </List.Item>
              )}
            />
          </Sider>

          <Content style={{ minHeight: 280 }}>
            <Styled.ChatBox>
              <Styled.ChatMessages>
                {(privateChats.get(parseInt(tab)) ?? []).map((chat, index) => {
                  const isSelfMessage = chat.senderId === userData.id;
                  return (
                    <Styled.Message self={isSelfMessage} key={index}>
                      {!isSelfMessage && <Avatar size={40} src={chat.receiverAvatarUrl || ''}>{chat.senderId}</Avatar>}
                      <Styled.MessageData self={isSelfMessage}>
                        {!isSelfMessage && <Avatar size={40} src={chat.receiverAvatarUrl || ''}>{chat.senderId}</Avatar>}
                        <Text strong>{!isSelfMessage && chat.senderId}</Text>
                        <p>{chat.message}</p>
                      </Styled.MessageData>
                      {isSelfMessage && <Avatar size={40} src={chat.receiverAvatarUrl || ''}>{chat.senderId}</Avatar>}
                    </Styled.Message>
                  );
                })}
              </Styled.ChatMessages>
              <Styled.SendMessage>
                <TextArea
                  required
                  maxLength={100} rows={2}
                  value={userData.message}
                  style={{ height: 120, resize: 'none', marginRight: '10px' }}
                  onChange={handleMessage}
                  placeholder="Your message..." />
                <Button
                  type="primary"
                  shape="circle"
                  disabled={!userData.message}
                  icon={<SendOutlined />}
                  onClick={sendPrivateValue} />
              </Styled.SendMessage>
            </Styled.ChatBox>
          </Content>
        </>
      ) : (null
      )}
    </Layout>
  );
};

export default ChatRoom;
