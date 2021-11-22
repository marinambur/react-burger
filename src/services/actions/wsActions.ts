
import { WSDataType} from "../../types/types";
import { PayloadAction } from "@reduxjs/toolkit";
export const WS_CONNECTION_START = 'WS_CONNECTION_START' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE' as const;
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE' as const;
export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE' as const;
export const WS_INIT_CONNECTION = 'WS_INIT_CONNECTION' as const;
export const WS_CLOSE_CONNECTION = 'WS_CLOSE_CONNECTION' as const;


export const wsActions = {
    wsInit: WS_INIT_CONNECTION,
    wsClose: WS_CLOSE_CONNECTION,
    wsSendMessage: "",
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
};

export interface IWSInitConnection {
    readonly type: typeof WS_INIT_CONNECTION;
}
export interface IWSCloseConnection {
    readonly type: typeof WS_CLOSE_CONNECTION;
}
export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    payload: PayloadAction;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: PayloadAction;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    payload: PayloadAction;
}
export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload: WSDataType;
}
export type WSActionsType =
    | IWSInitConnection
    | IWSCloseConnection
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSGetMessage;

export const wsConnectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = () => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const wsGetMessage = (message: any) => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export const wsSendMessage = (message: any) => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};

export const wsUserNameUpdate = (userName: string) => {
    return {
        type: WS_USER_NAME_UPDATE,
        payload: userName
    };
};



