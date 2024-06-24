import { LOG_OUT, useAppDispatch, useAppState } from '@/core/redux/action';
import { clearSessionInfo } from '@/core/utils/localStorage';
import { socketEndSession } from '@/core/utils/socket';
import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { MenuClickEventHandler } from 'node_modules/rc-menu/lib/interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';

enum ACTION {
  ADD_CHANNEL = 'ADD_CHANNEL',
  LOG_OUT = 'LOG_OUT',
}

const SiderActionMenuComponent: React.FC = () => {
  const appState = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuClickHandler: MenuClickEventHandler = ({ key }) => {
    switch (key) {
      case ACTION.ADD_CHANNEL:
        console.log(ACTION.ADD_CHANNEL);
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
            label: `Hello, ${appState.user.userName}!`,
            icon: <Avatar size="small" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />,
          },
          {
            key: ACTION.ADD_CHANNEL,
            label: 'Add Channel',
            icon: <PlusOutlined />,
          },
          {
            key: ACTION.LOG_OUT,
            label: 'Log Out',
            icon: <LogoutOutlined />,
          },
        ]}
      />
    </>
  );
};

export default SiderActionMenuComponent;
