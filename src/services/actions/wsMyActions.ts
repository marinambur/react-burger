export const WS_MY_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_MY_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_MY_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_MY_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_MY_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_MY_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_MY_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';

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

export const wsMyUserNameUpdate = (userName: any) => {
    return {
        type: WS_MY_USER_NAME_UPDATE,
        payload: userName
    };
};