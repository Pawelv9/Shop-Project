import { createStore, applyMiddleware } from "redux";
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../shop/root.saga";
import rootReducer from './root-reducer'
// import { fetchCollectionsStart } from '../shop/shop.sagas'


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store);

export { store, persistor };
