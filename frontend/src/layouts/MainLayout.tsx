import SiderActionMenuComponent from '@/components/SiderActionMenuComponent';
import { CHANNEL_EVENTS, USER_EVENTS } from '@/core/constants/socketEvents';
import { Channel } from '@/core/models/Channel';
import { User } from '@/core/models/User';
import { SET_CHANNEL, SET_LIST_CHANNEL, SET_USER, useAppDispatch, useAppState } from '@/core/redux/action';
import { socket } from '@/core/socket';
import { saveSessionInfo } from '@/core/utils/localStorage';
import { socketEndSession } from '@/core/utils/socket';
import { ApartmentOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { SelectEventHandler } from 'node_modules/rc-menu/lib/interface';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const appState = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedChannelId, setSelectedChannelId] = useState(localStorage.getItem('channelId') || '');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const channelId = localStorage.getItem('channelId');

  useEffect(() => {
    if (!userName && !userId) {
      navigate('/auth');
      return;
    }
    socket.emit(USER_EVENTS.FIND_ONE, userId);
    socket.emit(CHANNEL_EVENTS.FIND_USER_CHANNELS, userName);
    socket.emit(CHANNEL_EVENTS.JOIN, {
      userName,
      channelId,
    });
  }, [channelId, dispatch, navigate, userId, userName]);

  useEffect(() => {
    const setUser = (data: User) => {
      dispatch(SET_USER(data));
    };

    const setListChannel = (response: { channelId: number; channel: Channel }[]) => {
      const channels = response.map((item) => item.channel);
      const selectedChannel = channels.find((item) => item.id.toString() === channelId);

      dispatch(SET_LIST_CHANNEL(channels));
      if (channelId && selectedChannel) {
        dispatch(SET_CHANNEL(selectedChannel));
        setSelectedChannelId(channelId);
      } else {
        dispatch(SET_CHANNEL(channels[0]));
        setSelectedChannelId(channels[0].id.toString());
      }
    };

    const userJoinChannel = ({ data }: { data: { user: User; channel: Channel } }) => {
      const { user, channel } = data;
      if (appState.user.id && user.id != appState.user.id) {
        return;
      }
      dispatch(SET_CHANNEL(channel));
      saveSessionInfo(user, channel.id.toString());
      navigate(`/chat/${channel.id}`);
    };

    const setSelectedChannel = (channel: Channel) => {
      dispatch(SET_CHANNEL(channel));
      navigate(`/chat/${channel.id}`);
    };

    const createChannel = (data: Channel) => {
      const { id } = data;
      socket.emit(CHANNEL_EVENTS.JOIN, {
        userName: appState.user.userName,
        channelId: id,
      });
      window.location.reload();
    };

    socket.on(USER_EVENTS.FIND_ONE, setUser);

    socket.on(CHANNEL_EVENTS.FIND_USER_CHANNELS, setListChannel);
    socket.on(CHANNEL_EVENTS.JOIN, userJoinChannel);
    socket.on(CHANNEL_EVENTS.FIND_ONE, setSelectedChannel);
    socket.on(CHANNEL_EVENTS.CREATE, createChannel);

    return () => {
      socket.off(USER_EVENTS.FIND_ONE, setUser);

      socket.off(CHANNEL_EVENTS.FIND_USER_CHANNELS, setListChannel);
      socket.off(CHANNEL_EVENTS.JOIN, userJoinChannel);
      socket.off(CHANNEL_EVENTS.FIND_ONE, setSelectedChannel);
      socket.off(CHANNEL_EVENTS.CREATE, createChannel);
    };
  }, [appState.user, channelId, dispatch, navigate]);

  const MenuSelectHandler: SelectEventHandler = ({ key }) => {
    if (!selectedChannelId) {
      return;
    }
    setSelectedChannelId(key);
    socketEndSession();
    socket.emit(CHANNEL_EVENTS.JOIN, {
      userName: appState.user.userName,
      channelId: key,
    });
    socket.emit(CHANNEL_EVENTS.FIND_ONE, key);
    saveSessionInfo(appState.user, key);
  };

  return (
    <Layout className="h-screen" hasSider>
      <Sider collapsible trigger={<MenuUnfoldOutlined />}>
        <SiderActionMenuComponent />
        <Divider className="bg-white" />
        <Menu
          defaultSelectedKeys={[selectedChannelId]}
          mode="inline"
          theme="dark"
          onSelect={MenuSelectHandler}
          items={appState.channel.map((item) => ({
            key: item.id,
            label: item.name,
            icon: <ApartmentOutlined />,
          }))}
        />
      </Sider>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
