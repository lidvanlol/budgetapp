import { createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import thunk from "redux-thunk";
import allReducers from './reducers/index';






export const store = createStore(allReducers, applyMiddleware(thunk));
