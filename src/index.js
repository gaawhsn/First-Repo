import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App.js';
import { rootReducer } from './state';
import rootSaga from './state/saga';
import { saveState } from './localStorage';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const reduxMiddlewares = [
  sagaMiddleware
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...reduxMiddlewares)
));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
