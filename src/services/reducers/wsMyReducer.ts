
import {
    WS_MY_CONNECTION_CLOSED, WS_MY_CONNECTION_ERROR,
    WS_MY_CONNECTION_START,
    WS_MY_CONNECTION_SUCCESS, WS_MY_GET_MESSAGE,
    WS_MY_SEND_MESSAGE, WS_MY_USER_NAME_UPDATE
} from '../actions/wsMyActions';

const initialState = {
    wsMyConnected: false,
    messages: []
};

export const wsMyReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case WS_MY_CONNECTION_SUCCESS:
            return {
                ...state,
                wsMyConnected: true
            };

        case WS_MY_CONNECTION_ERROR:
            return {
                ...state,
                wsMyConnected: false
            };

        case WS_MY_CONNECTION_CLOSED:
            return {
                ...state,
                wsMyConnected: false
            };

        case WS_MY_GET_MESSAGE:
            return {
                ...state,
                myMessages: state.messages.length
                    ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
                    : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
            };
        case WS_MY_USER_NAME_UPDATE:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
};