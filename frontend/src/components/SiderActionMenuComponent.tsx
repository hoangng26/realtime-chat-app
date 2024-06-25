import { CHANNEL_EVENTS } from '@/core/constants/socketEvents';
import { Channel } from '@/core/models/Channel';
import { LOG_OUT, useAppDispatch, useAppState } from '@/core/redux/action';
import { socket } from '@/core/socket';
import { clearSessionInfo } from '@/core/utils/localStorage';
import { socketEndSession } from '@/core/utils/socket';
import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Input, Menu, Modal, Select } from 'antd';
import { MenuClickEventHandler } from 'node_modules/rc-menu/lib/interface';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

enum ACTION {
  ADD_CHANNEL = 'ADD_CHANNEL',
  JOIN_CHANNEL = 'JOIN_CHANNEL',
  LOG_OUT = 'LOG_OUT',
}

const SiderActionMenuComponent: React.FC = () => {
  const appState = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [channelInput, setChannelInput] = useState('');

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [channelSelection, setChannelSelection] = useState();
  const [listChannelSelection, setListChannelSelection] = useState<Channel[]>([]);

  const menuClickHandler: MenuClickEventHandler = ({ key }) => {
    switch (key) {
      case ACTION.ADD_CHANNEL:
        addChannelHandler();
        break;
      case ACTION.JOIN_CHANNEL:
        joinChannelHandler();
        break;
      case ACTION.LOG_OUT:
        logoutHandler();
        break;
      default:
        break;
    }
  };

  const logoutHandler = () => {
    clearSessionInfo();
    dispatch(LOG_OUT());
    socketEndSession();
    navigate('/auth');
  };

  const addChannelHandler = () => {
    setShowAddModal(true);
  };

  const joinChannelHandler = () => {
    setShowJoinModal(true);
  };

  const onAddModalOkHandler = () => {
    if (!channelInput.trim()) {
      return;
    }
    socket.emit(CHANNEL_EVENTS.CREATE, {
      name: channelInput,
      type: 'PUBLIC',
    });
    setShowAddModal(false);
    setChannelInput('');
  };

  const onJoinModalOkHandler = () => {
    if (!channelSelection) {
      return;
    }
    socket.emit(CHANNEL_EVENTS.JOIN, {
      userName: appState.user.userName,
      channelId: channelSelection,
    });
    setShowJoinModal(false);
    setChannelSelection(undefined);

    window.location.reload();
  };

  useEffect(() => {
    socket.emit(CHANNEL_EVENTS.FIND_ALL);
    const setListPublicChannel = (data: Channel[]) => {
      const filteredChannel = data.filter((item) => !appState.channel.find((c) => c.id === item.id));
      setListChannelSelection(filteredChannel);
    };

    socket.on(CHANNEL_EVENTS.FIND_ALL, setListPublicChannel);

    return () => {
      socket.off(CHANNEL_EVENTS.FIND_ALL, setListPublicChannel);
    };
  }, [appState.channel]);

  return (
    <>
      <Menu
        mode="vertical"
        theme="dark"
        selectable={false}
        onClick={menuClickHandler}
        items={[
          {
            key: '',
            label: appState.user ? `Hello, ${appState.user.userName}!` : 'Please login',
            icon: <Avatar size="small" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />,
          },
          {
            key: ACTION.ADD_CHANNEL,
            label: 'Add Channel',
            icon: <PlusOutlined />,
          },
          {
            key: ACTION.JOIN_CHANNEL,
            label: 'Join Exist Channel',
            icon: <PlusOutlined />,
          },
          {
            key: ACTION.LOG_OUT,
            label: 'Log Out',
            icon: <LogoutOutlined />,
          },
        ]}
      />
      <Modal
        open={showAddModal}
        centered
        closable={false}
        onOk={onAddModalOkHandler}
        onCancel={() => setShowAddModal(false)}
        title="Add channel"
      >
        <Input
          placeholder="Please input your username"
          value={channelInput}
          onChange={(event) => setChannelInput(event.currentTarget.value)}
        />
      </Modal>
      <Modal
        open={showJoinModal}
        centered
        closable={false}
        onOk={onJoinModalOkHandler}
        onCancel={() => setShowJoinModal(false)}
        title="Join exist channel"
      >
        <Select
          className="w-full mt-2"
          placeholder="Select channel to join"
          value={channelSelection}
          options={listChannelSelection.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(value) => setChannelSelection(value)}
        />
      </Modal>
    </>
  );
};

export default SiderActionMenuComponent;
