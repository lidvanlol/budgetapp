import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux';
import allReducers from './reducers/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist:'jwt'
};
import jwt from './reducers/jwtReducer';
const rootReducer = combineReducers({
  jwt: persistReducer(persistConfig, jwt),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
