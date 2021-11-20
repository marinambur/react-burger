import {getCookie} from "../../components/utils";

export const socketMiddleware = (wsUrl: any, wsActions: { wsInit: any; wsSendMessage: any; onOpen: any; onClose: any; onError: any; onMessage: any; }) => {
    return (store: { dispatch: any; getState: any; }) => {
        let socket: WebSocket | null = null;

        return (next: (arg0: any) => void) => (action: { type: any; payload: any; }) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const token = getCookie('accessToken')?.replace('Bearer ', '');
            if (type === wsInit && token) {
                socket = new WebSocket(`${wsUrl}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    socket.send(JSON.stringify({
                        ...payload,
                        token: token
                    }));
                }
            }

            next(action);
        };
    };
};