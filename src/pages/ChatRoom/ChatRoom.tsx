import React, { useEffect, useState, ChangeEvent } from 'react';
import { over, Client } from 'stompjs';
import SockJS from 'sockjs-client';
import './style.css'
import * as Styled from './ChatRoom.styled.ts';
import { Avatar, Button, Input, Layout, List, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import TextArea from 'antd/es/input/TextArea';
import { SendOutlined } from '@ant-design/icons';
import Container from '../../components/Container/Container.tsx';
const { Text } = Typography;

type ChatMessage = {
  senderName: string;
  receiverName?: string;
  message: string;
  status: string;
};

type UserData = {
  username: string;
  receivername: string;
  connected: boolean;
  message: string;
};

type PublicChatMessage = {
  senderName: string;
  message: string;
  status: string;
};

let stompClient: Client | null = null;

const ChatRoom: React.FC = () => {
  const [privateChats, setPrivateChats] = useState<Map<string, ChatMessage[]>>(new Map());
  const [publicChats, setPublicChats] = useState<PublicChatMessage[]>([]);
  const [tab, setTab] = useState<string>("CHATROOM");
  const [userData, setUserData] = useState<UserData>({
    username: '',
    receivername: '',
    connected: false,
    message: ''
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    if (userData.connected) {
      fetchUsers();
      fetchMessages();
    }
  }, [userData.connected]);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient?.subscribe('/chatroom/public', onMessageReceived);
    stompClient?.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
      message: ""
    };
    stompClient?.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/users`);
      const data: { username: string }[] = await response.json();

      data.forEach(user => {
        if (!privateChats.has(user.username)) {
          privateChats.set(user.username, []);
        }
      });
      setPrivateChats(new Map(privateChats));

    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${userData.username}`);
      const data: ChatMessage[] = await response.json();

      const publicMsgs = data.filter(msg => !msg.receiverName) as PublicChatMessage[];
      const privateMsgs = data.filter(msg => msg.receiverName);

      setPublicChats(publicMsgs);

      privateMsgs.forEach(msg => {
        const isSelfMessage = msg.senderName === msg.receiverName;
        const chatKey = isSelfMessage ? userData.username : (msg.senderName === userData.username ? msg.receiverName! : msg.senderName);

        if (!privateChats.has(chatKey)) {
          privateChats.set(chatKey, []);
        }
        privateChats.get(chatKey)!.push(msg);
      });
      setPrivateChats(new Map(privateChats));
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };

  const onMessageReceived = (payload: { body: string }) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload: { body: string }) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName)!.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list: ChatMessage[] = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
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

  const sendValue = () => {
    if (stompClient) {
      var chatMessage: PublicChatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE"
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage: ChatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE"
      };

      if (userData.username !== tab) {
        privateChats.get(tab)!.push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <Layout>
      {userData.connected ? (
        <>
          <Sider width={300} style={{ background: '#fff', height: '600px', padding: '0 20px' }}>
            <List
              itemLayout="horizontal"
              dataSource={[...privateChats.keys()]}
              renderItem={name => (
                <List.Item onClick={() => setTab(name)} style={{ cursor: 'pointer', background: tab === name ? '#F4D1F3' : '#fff', padding: '20px', borderRadius: '25px' }}>
                  <List.Item.Meta
                    avatar={<Avatar size={50} style={{ backgroundColor: '#87d068' }}>{name.charAt(0).toUpperCase()}</Avatar>}
                    title={name}
                    description="Lastest message..."
                  />
                </List.Item>
              )}
            />
          </Sider>

          <Content style={{ minHeight: 280 }}>
            <Styled.ChatBox>
              <Styled.ChatMessages>
                {(tab === 'CHATROOM' ? publicChats : (privateChats.get(tab) ?? [])).map((chat, index) => {
                  const isSelfMessage = chat.senderName === userData.username;
                  return (
                    <Styled.Message self={isSelfMessage} key={index}>
                      {!isSelfMessage && <Avatar size={40} style={{ backgroundColor: '#87d068' }}>{chat.senderName[0].toUpperCase()}</Avatar>}
                      <Styled.MessageData self={isSelfMessage}>
                        <Text strong>{chat.senderName}</Text>
                        <p>{chat.message}</p>
                      </Styled.MessageData>
                      {isSelfMessage && <Avatar size={40} style={{ backgroundColor: '#87d068' }}>{chat.senderName[0].toUpperCase()}</Avatar>}
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
                  onClick={tab === 'CHATROOM' ? sendValue : sendPrivateValue} />

              </Styled.SendMessage>
            </Styled.ChatBox>
          </Content>
        </>
      ) : (
        <Styled.Register>
          <Input id="user-name" placeholder="Enter your name" value={userData.username} onChange={handleUsername} />
          <Button type="primary" onClick={registerUser}>Connect</Button>
        </Styled.Register>
      )}
    </Layout>

  );
};

export default ChatRoom;
