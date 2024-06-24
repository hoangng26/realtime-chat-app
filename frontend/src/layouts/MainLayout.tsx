import SiderActionMenuComponent from '@/components/SiderActionMenuComponent';
import { CHANNEL_EVENTS, USER_EVENTS } from '@/core/constants/socketEvents';
import { Channel } from '@/core/models/Channel';
import { User } from '@/core/models/User';
import { SET_CHANNEL, SET_LIST_CHANNEL, SET_USER, useAppDispatch, useAppState } from '@/core/redux/action';
import { socket } from '@/core/socket';
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

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    let channelId = localStorage.getItem('channelId');

    if (!userName && !userId) {
      console.log('true');
      navigate('/auth');
      return;
    }
    socket.emit(USER_EVENTS.FIND_ONE, userId);
    socket.on(USER_EVENTS.FIND_ONE, (data: User) => {
      dispatch(SET_USER(data));
    });
    socket.emit(CHANNEL_EVENTS.FIND_USER_CHANNELS, userName);
    socket.on(CHANNEL_EVENTS.FIND_USER_CHANNELS, (response: { channelId: number; channel: Channel }[]) => {
      const channels = response.map((item) => item.channel);
      const selectedChannel = channels.find((item) => item.id.toString() === channelId);

      dispatch(SET_LIST_CHANNEL(channels));
      if (channelId && selectedChannel) {
        dispatch(SET_CHANNEL(selectedChannel));
        setSelectedChannelId(channelId);
      } else {
        channelId = channels[0].id.toString();
        dispatch(SET_CHANNEL(channels[0]));
        setSelectedChannelId(channels[0].id.toString());
      }
    });
    socket.emit(CHANNEL_EVENTS.JOIN, {
      userName,
      channelId,
    });
  }, [dispatch, navigate]);

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
    socket.on(CHANNEL_EVENTS.FIND_ONE, (channel: Channel) => {
      dispatch(SET_CHANNEL(channel));
      navigate(`/chat/${key}`);
    });
  };

  return (
    <Layout className="h-screen" hasSider>
      <Sider collapsible trigger={<MenuUnfoldOutlined />}>
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
        <Divider className="bg-white" />
        <SiderActionMenuComponent />
      </Sider>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
