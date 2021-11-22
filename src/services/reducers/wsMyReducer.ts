
import {
    WS_MY_CONNECTION_CLOSED, WS_MY_CONNECTION_ERROR,
    WS_MY_CONNECTION_SUCCESS, WS_MY_GET_MESSAGE, WSMyActionsType
} from '../actions/wsMyActions';
import {WSDataType} from "../../types/types";


type wsdMyState = {
    wsMyConnected: boolean;
    myMessages: WSDataType[] | [];
};
const initialState: wsdMyState = {
    wsMyConnected: false,
    myMessages: []
};
export const wsMyReducer = (state = initialState, action: WSMyActionsType) => {
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
                myMessages: state.myMessages.length
                    ? [...state.myMessages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
                    : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
            };

        default:
            return state;
    }
};