import { Avatar, Card, Flex, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';

interface MessageComponentProps {
  user: string;
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
  const loginUser = user === 'Me';
  const showInfo = !loginUser && isShowInfo;

  return (
    <Space className="items-start w-fit">
      <Avatar style={{ opacity: showInfo ? 1 : 0 }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Flex justify={loginUser ? 'flex-end' : 'flex-start'}>
        <Card
          size="small"
          className={`max-w-[90%] w-fit ${loginUser ? 'bg-sky-100' : 'bg-neutral-100'}`}
          bordered={false}
        >
          <Space direction="vertical">
            {showInfo && <Meta title={user} />}
            <div>{message}</div>
            {isShowTime && <Meta description={time} />}
          </Space>
        </Card>
      </Flex>
    </Space>
  );
};

export default MessageComponent;
