import AuthPageComponent from '@/pages/Auth';
import HomePageComponent from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePageComponent />,
  },
  {
    path: '/auth',
    element: <AuthPageComponent />,
  },
]);

export default routes;
