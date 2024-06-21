import { ConfigProvider, ConfigProviderProps } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './redux/store';
import routes from './routes';

function App() {
  const configProviderProps: ConfigProviderProps = {
    theme: {
      algorithm: [],
    },
    componentSize: 'large',
  };

  return (
    <Provider store={store}>
      <ConfigProvider {...configProviderProps}>
        <RouterProvider router={routes} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
