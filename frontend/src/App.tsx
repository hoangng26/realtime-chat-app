import { ConfigProvider, ThemeConfig } from 'antd';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';

function App() {
  const themeConfig: ThemeConfig = {
    algorithm: [],
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App;
