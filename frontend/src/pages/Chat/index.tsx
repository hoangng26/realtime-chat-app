import MessageComponent from '@/components/MessageComponent';
import { MESSAGE_EVENTS } from '@/core/constants/socketEvents';
import { Message } from '@/core/models/Message';
import { useAppState } from '@/core/redux/action';
import { socket } from '@/core/socket';
import { SendOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Layout, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useRef, useState } from 'react';

const ChatPageComponent: React.FC = () => {
  const appState = useAppState();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [listMessage, setListMessage] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const contentRef = useRef<HTMLDivElement | null>(null);

  const messageSendHandler = () => {
    socket.emit(MESSAGE_EVENTS.SEND, {
      content: messageInput,
      userId: appState.user.id,
      channelId: appState.selectedChannel?.id,
    });

    clearMessageInput();
  };

  const inputPressEnterHandler: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === 13 && messageInput.trim()) {
      messageSendHandler();
    }
  };

  const clearMessageInput = () => {
    setMessageInput('');
  };

  useEffect(() => {
    socket.emit(MESSAGE_EVENTS.GET_ALL_CHANNEL_MESSAGE, appState.selectedChannel?.id);
    socket.on(MESSAGE_EVENTS.GET_ALL_CHANNEL_MESSAGE, (data: Message[]) => {
      setListMessage(data);
    });
  }, [appState.selectedChannel?.id]);

  useEffect(() => {
    if (contentRef.current && contentRef.current.lastElementChild) {
      contentRef.current.lastElementChild.scrollIntoView();
    }
  }, [listMessage.length]);

  useEffect(() => {
    const receiveMessage = (data: Message) => {
      setListMessage((prevState) => [...prevState, data]);
    };

    socket.on(MESSAGE_EVENTS.RECEIVE, receiveMessage);

    return () => {
      socket.off(MESSAGE_EVENTS.RECEIVE, receiveMessage);
    };
  }, []);

  return (
    <Layout className="m-6 overflow-hidden" style={{ borderRadius: borderRadiusLG }}>
      <Header className={`px-6 border-b`} style={{ background: colorBgContainer }}>
        <span className="font-bold text-xl">{appState.selectedChannel?.name}</span>
      </Header>

      <Content>
        <div
          ref={contentRef}
          style={{ background: colorBgContainer }}
          className=" flex flex-col gap-2 h-full w-full p-6 overflow-auto"
        >
          {listMessage.map((item, index) => (
            <MessageComponent
              key={index}
              user={item.user!}
              message={item.content}
              time={item.createdAt.toString()}
              isShowTime={false}
            />
          ))}
        </div>
      </Content>

      <Footer className={`px-6 border-t`} style={{ background: colorBgContainer }}>
        <Flex gap="small">
          <Input
            variant="filled"
            placeholder="Please input message"
            allowClear
            value={messageInput}
            onChange={(event) => setMessageInput(event.currentTarget.value)}
            onKeyUp={inputPressEnterHandler}
          />
          <Button type="primary" icon={<SendOutlined />} iconPosition="end" onClick={messageSendHandler}>
            Send
          </Button>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default ChatPageComponent;
