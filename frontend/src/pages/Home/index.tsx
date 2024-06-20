import { SendOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Layout, Menu, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React from 'react';

const HomePageComponent: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen" hasSider>
      <Sider>
        <Menu
          defaultSelectedKeys={['room-0']}
          mode="inline"
          className="h-full"
          theme="dark"
          items={Array.from(Array(10).keys()).map((item) => ({
            key: `room-${item}`,
            label: `Room ${item}`,
            icon: <span>#</span>,
          }))}
        />
      </Sider>
      <Layout className="m-6 overflow-hidden" style={{ borderRadius: borderRadiusLG }}>
        <Header className={`px-6 border-b bg-[${colorBgContainer}]`}>Header</Header>
        <Content>
          <div style={{ background: colorBgContainer }} className="h-full p-6">
            Content
          </div>
        </Content>
        <Footer style={{ background: colorBgContainer }}>
          <Flex gap="small">
            <Input placeholder="Please input message" allowClear />
            <Button type="primary" icon={<SendOutlined />} iconPosition="end">
              Send
            </Button>
          </Flex>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePageComponent;
