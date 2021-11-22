
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE, WSActionsType
} from '../actions/wsActions';
import {WSDataType} from "../../types/types";

type wsdState = {
    wsConnected: boolean;
    messages: WSDataType[] | [];
};
const initialState: wsdState = {
    wsConnected: false,
    messages: []
};

export const wsReducer = (state = initialState, action: WSActionsType) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                messages: state.messages?.length
                    ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
                    : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
            };

        default:
            return state;
    }
};