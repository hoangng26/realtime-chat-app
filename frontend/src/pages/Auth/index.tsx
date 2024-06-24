import { CHANNEL_EVENTS } from '@/core/constants/socketEvents';
import { Channel } from '@/core/models/Channel';
import { SET_CHANNEL, SET_USER, useAppDispatch } from '@/core/redux/action';
import { socket } from '@/core/socket';
import { saveSessionInfo } from '@/core/utils/localStorage';
import { Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPageComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [listChannel, setListChannel] = useState<Channel[]>([]);
  const [inputValue, setInputValue] = useState({
    userName: '',
    channelId: undefined,
  });

  useEffect(() => {
    socket.emit(CHANNEL_EVENTS.FIND_ALL);
    socket.on(CHANNEL_EVENTS.FIND_ALL, (data: Channel[]) => {
      setListChannel(data);
    });
  }, []);

  const okButtonHandler = () => {
    const { userName, channelId } = inputValue;

    socket.emit(CHANNEL_EVENTS.JOIN, {
      userName,
      channelId,
    });
    socket.on(CHANNEL_EVENTS.JOIN, ({ data }) => {
      const { user } = data;
      dispatch(SET_USER(user));
      saveSessionInfo(userName, channelId);
    });
    socket.emit(CHANNEL_EVENTS.FIND_ONE, channelId);
    socket.on(CHANNEL_EVENTS.FIND_ONE, (channel: Channel) => {
      dispatch(SET_CHANNEL(channel));
      navigate(`/chat/${channelId}`);
    });
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
