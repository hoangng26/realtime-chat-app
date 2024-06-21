import { ConfigProvider, ConfigProviderProps } from 'antd';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';

function App() {
  const configProviderProps: ConfigProviderProps = {
    theme: {
      algorithm: [],
    },
    componentSize: 'large',
  };

  return (
    <ConfigProvider {...configProviderProps}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App;
