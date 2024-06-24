import { User } from '@/core/models/User';
import { useAppState } from '@/core/redux/action';
import { Avatar, Card, Flex, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';

interface MessageComponentProps {
  user: User;
  message: string;
  time: string;
  isShowInfo?: boolean;
  isShowTime?: boolean;
}

const MessageComponent: React.FC<MessageComponentProps> = ({
  user,
  message,
  time,
  isShowInfo = true,
  isShowTime = true,
}) => {
  const appState = useAppState();
  const loginUser = user && user.userName === appState.user.userName;
  const showInfo = !loginUser && isShowInfo;

  return (
    <Flex justify={loginUser ? 'flex-end' : 'flex-start'} gap={4}>
      <Avatar style={{ opacity: showInfo ? 1 : 0 }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Card
        size="small"
        className={`max-w-[80%] w-fit ${loginUser ? 'bg-sky-100' : 'bg-neutral-100'}`}
        bordered={false}
      >
        <Space direction="vertical">
          {showInfo && <Meta title={user.userName} />}
          <div>{message}</div>
          {isShowTime && <Meta description={time} />}
        </Space>
      </Card>
    </Flex>
  );
};

export default MessageComponent;
