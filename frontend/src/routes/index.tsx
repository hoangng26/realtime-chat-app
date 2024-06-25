import MainLayout from '@/layouts/MainLayout';
import AuthPageComponent from '@/pages/Auth';
import ChatPageComponent from '@/pages/Chat';
import HomePageComponent from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePageComponent />,
      },
      {
        path: 'chat/:id',
        element: <ChatPageComponent />,
      },
      {
        path: '/auth',
        element: <AuthPageComponent />,
      },
    ],
  },
]);

export default routes;
