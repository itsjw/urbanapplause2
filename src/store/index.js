import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import initialstate from './initialstate';

const store = applyMiddleware(thunk,logger)(createStore)(rootReducer,initialstate);

export default store;

