import {getCookie} from "../../components/utils";
import {WSActions} from "../../types/types";
import { AnyAction, MiddlewareAPI } from "redux";
export const socketMiddleware = (  wsUrl: string | (() => string),
                                   wsActions: WSActions) => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next: (arg0: any) => void) => (action: AnyAction ) => {
            const { dispatch} = store;
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