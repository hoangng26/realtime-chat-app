import { createBrowserRouter, Link } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Link to="test">Test Page</Link>,
  },
  {
    path: '/test',
    element: <Link to="/">Back to Home</Link>,
  },
]);

export default routes;
