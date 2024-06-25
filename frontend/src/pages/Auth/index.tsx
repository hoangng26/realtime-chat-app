import { CHANNEL_EVENTS } from '@/core/constants/socketEvents';
import { Channel } from '@/core/models/Channel';
import { socket } from '@/core/socket';
import { Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const AuthPageComponent: React.FC = () => {
  const [listChannel, setListChannel] = useState<Channel[]>([]);
  const [inputValue, setInputValue] = useState({
    userName: '',
    channelId: undefined,
  });

  useEffect(() => {
    socket.emit(CHANNEL_EVENTS.FIND_ALL);
    const setListPublicChannel = (data: Channel[]) => {
      setListChannel(data);
    };

    socket.on(CHANNEL_EVENTS.FIND_ALL, setListPublicChannel);

    return () => {
      socket.off(CHANNEL_EVENTS.FIND_ALL, setListPublicChannel);
    };
  }, []);

  const okButtonHandler = async () => {
    const { userName, channelId } = inputValue;

    await socket.emitWithAck(CHANNEL_EVENTS.JOIN, {
      userName,
      channelId,
    });
    await socket.emitWithAck(CHANNEL_EVENTS.FIND_ONE, channelId);
  };

  return (
    <>
      <Modal
        open
        centered
        closable={false}
        onOk={okButtonHandler}
        cancelButtonProps={{ className: 'hidden' }}
        title="Real-time Chat Application"
      >
        <Input
          placeholder="Please input your username"
          value={inputValue.userName}
          onChange={(event) => setInputValue((prevState) => ({ ...prevState, userName: event.target.value }))}
        />
        <Select
          className="w-full mt-2"
          placeholder="Select channel to join"
          value={inputValue.channelId}
          options={listChannel.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(value) => setInputValue((prevState) => ({ ...prevState, channelId: value }))}
        />
      </Modal>
    </>
  );
};

export default AuthPageComponent;
