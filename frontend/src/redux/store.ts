import { configureStore, Tuple } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import { rootSaga, sagaMiddleWare } from './saga';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleWare) => <Tuple>[...getDefaultMiddleWare({ thunk: false }), sagaMiddleWare],
});
sagaMiddleWare.run(rootSaga);

export default store;
