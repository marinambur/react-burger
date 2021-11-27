import {wsReducer} from "./wsReducer";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
} from "../actions/wsActions";
const state = {
    wsConnected: false,
    messages: []
}
describe("Websocket User Reducer", () => {
    it("should return initial state", () => {
        expect(wsReducer(undefined, {})).toEqual(state);
    });
    it("should set wsConnected to false", () => {
        expect(wsReducer(state, {type: WS_CONNECTION_ERROR})).toEqual(
            expect.objectContaining({
                wsConnected: false,
                messages: []
            })
        );
    });
    it("should set wsConnected to true", () => {
        expect(wsReducer(state, {type: WS_CONNECTION_SUCCESS})).toEqual(
            expect.objectContaining({
                wsConnected: true,
                messages: []
            })
        );
    });
    it("should set wsConnected to true", () => {
        expect(wsReducer(state, {type: WS_CONNECTION_CLOSED})).toEqual(
            expect.objectContaining({
                wsConnected: false,
                messages: []
            })
        );
    });
})