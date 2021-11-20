import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from './services/actions/wsActions';
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {
    WS_MY_CONNECTION_CLOSED, WS_MY_CONNECTION_ERROR,
    WS_MY_CONNECTION_START,
    WS_MY_CONNECTION_SUCCESS, WS_MY_GET_MESSAGE,
    WS_MY_SEND_MESSAGE
} from "./services/actions/wsMyActions";
import {userSocketMiddleware} from "./services/middleware/userSocketMiddleware";
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsMyUrl = 'wss://norma.nomoreparties.space/orders';
export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};
export const wsMyActions = {
    wsInit: WS_MY_CONNECTION_START,
    wsSendMessage: WS_MY_SEND_MESSAGE,
    onOpen: WS_MY_CONNECTION_SUCCESS,
    onClose:
    WS_MY_CONNECTION_CLOSED,
    onError: WS_MY_CONNECTION_ERROR,
    onMessage: WS_MY_GET_MESSAGE
};
export const store = createStore(rootReducer, applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), userSocketMiddleware(wsMyUrl, wsMyActions)));



ReactDOM.render(
  <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
                <App />

          </Provider>
      </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
