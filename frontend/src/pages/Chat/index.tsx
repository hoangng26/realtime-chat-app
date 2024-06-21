import MessageComponent from '@/components/MessageComponent';
import { SendOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Layout, Space, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React from 'react';

const ChatPageComponent: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="m-6 overflow-hidden" style={{ borderRadius: borderRadiusLG }}>
      <Header className={`px-6 border-b`} style={{ background: colorBgContainer }}>
        <span className="font-bold text-xl">Room 01</span>
      </Header>

      <Content>
        <Space
          direction="vertical"
          size="small"
          style={{ background: colorBgContainer }}
          className="h-full w-full p-6 justify-end"
        >
          <MessageComponent
            user="User 01"
            message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus totam id culpa assumenda ut reprehenderit
      dolore quam quisquam, perspiciatis impedit aliquid atque voluptates veniam minima nihil delectus commodi
      reiciendis mollitia."
            time="11:38 AM"
            isShowTime={false}
          />

          <MessageComponent
            user="User 01"
            message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus totam id culpa assumenda ut reprehenderit
      dolore quam quisquam, perspiciatis impedit aliquid atque voluptates veniam minima nihil delectus commodi
      reiciendis mollitia."
            time="11:38 AM"
            isShowInfo={false}
          />

          <MessageComponent
            user="Me"
            message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus totam id culpa assumenda ut reprehenderit
      dolore quam quisquam, perspiciatis impedit aliquid atque voluptates veniam minima nihil delectus commodi
      reiciendis mollitia."
            time="11:38 AM"
          />

          <MessageComponent
            user="User 01"
            message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus totam id culpa assumenda ut reprehenderit
      dolore quam quisquam, perspiciatis impedit aliquid atque voluptates veniam minima nihil delectus commodi
      reiciendis mollitia."
            time="11:38 AM"
          />
        </Space>
      </Content>

      <Footer className={`px-6 border-t`} style={{ background: colorBgContainer }}>
        <Flex gap="small">
          <Input variant="filled" placeholder="Please input message" allowClear />
          <Button type="primary" icon={<SendOutlined />} iconPosition="end">
            Send
          </Button>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default ChatPageComponent;
