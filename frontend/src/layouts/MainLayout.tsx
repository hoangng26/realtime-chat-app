import { ApartmentOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <Layout className="h-screen" hasSider>
      <Sider collapsible trigger={<MenuUnfoldOutlined />}>
        <Menu
          defaultSelectedKeys={['room-0']}
          mode="inline"
          className="h-full"
          theme="dark"
          items={Array.from(Array(10).keys()).map((item) => ({
            key: `room-${item}`,
            label: `Room ${item}`,
            icon: <ApartmentOutlined />,
          }))}
        />
      </Sider>

      <Outlet />
    </Layout>
  );
};

export default MainLayout;
