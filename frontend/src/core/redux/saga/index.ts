import createSagaMiddleware from 'redux-saga';

export const sagaMiddleWare = createSagaMiddleware();

export function* rootSaga() {
  yield console.log('Hello Saga');
}
