import { WSDataType} from "../../types/types";
import { PayloadAction } from "@reduxjs/toolkit";
export const WS_MY_CONNECTION_START = 'WS_MY_CONNECTION_START' as const;
export const WS_MY_CONNECTION_SUCCESS = 'WS_MY_CONNECTION_SUCCESS' as const;
export const WS_MY_CONNECTION_ERROR = 'WS_MY_CONNECTION_ERROR' as const;
export const WS_MY_CONNECTION_CLOSED = 'WS_MY_CONNECTION_CLOSED' as const;
export const WS_MY_GET_MESSAGE = 'WS_MY_GET_MESSAGE' as const;
export const WS_MY_SEND_MESSAGE = 'WS_MY_SEND_MESSAGE' as const;
export const WS_MY_INIT_CONNECTION = 'WS_INIT_CONNECTION' as const;
export const WS_MY_CLOSE_CONNECTION = 'WS_CLOSE_CONNECTION' as const;

export const wsMyActions = {
    wsInit: WS_MY_INIT_CONNECTION,
    wsClose: WS_MY_CLOSE_CONNECTION,
    wsSendMessage: "",
    onOpen: WS_MY_CONNECTION_SUCCESS,
    onClose: WS_MY_CONNECTION_CLOSED,
    onError: WS_MY_CONNECTION_ERROR,
    onMessage: WS_MY_GET_MESSAGE,
};

export interface IWSMyInitConnection {
    readonly type: typeof WS_MY_INIT_CONNECTION;
}
export interface IWSMyCloseConnection {
    readonly type: typeof WS_MY_CLOSE_CONNECTION;
}
export interface IWSMyConnectionSuccess {
    readonly type: typeof WS_MY_CONNECTION_SUCCESS;
    payload: PayloadAction;
}
export interface IWSMyConnectionError {
    readonly type: typeof WS_MY_CONNECTION_ERROR;
    payload: PayloadAction;
}
export interface IWSMyConnectionClosed {
    readonly type: typeof WS_MY_CONNECTION_CLOSED;
    payload: PayloadAction;
}
export interface IWSMyGetMessage {
    readonly type: typeof WS_MY_GET_MESSAGE;
    payload: WSDataType;
}

export type WSMyActionsType =
    | IWSMyInitConnection
    | IWSMyCloseConnection
    | IWSMyConnectionSuccess
    | IWSMyConnectionError
    | IWSMyConnectionClosed
    | IWSMyGetMessage;
export const wsMyConnectionSuccess = () => {
    return {
        type: WS_MY_CONNECTION_SUCCESS
    };
};

export const wsMyConnectionError = () => {
    return {
        type: WS_MY_CONNECTION_ERROR
    };
};

export const wsMyConnectionClosed = () => {
    return {
        type: WS_MY_CONNECTION_CLOSED
    };
};

export const wsMyGetMessage = (message: any) => {
    return {
        type: WS_MY_GET_MESSAGE,
        payload: message
    };
};

export const wsMySendMessage = (message: any) => {
    return {
        type: WS_MY_SEND_MESSAGE,
        payload: message
    };
};
