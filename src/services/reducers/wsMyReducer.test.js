import {wsMyReducer} from "./wsMyReducer";
import {
    WS_MY_CONNECTION_CLOSED,
    WS_MY_CONNECTION_ERROR,
    WS_MY_CONNECTION_SUCCESS,
} from "../actions/wsMyActions";
const state = {
    wsMyConnected: false,
    myMessages: []
}
describe("Websocket User Reducer", () => {
    it("should return initial state", () => {
        expect(wsMyReducer(undefined, {})).toEqual(state);
    });
    it("should set wsMyConnected to false", () => {
        expect(wsMyReducer(state, {type: WS_MY_CONNECTION_ERROR})).toEqual(
            expect.objectContaining({
                wsMyConnected: false,
                myMessages: []
            })
        );
    });
    it("should set wsMyConnected to true", () => {
        expect(wsMyReducer(state, {type: WS_MY_CONNECTION_SUCCESS})).toEqual(
            expect.objectContaining({
                wsMyConnected: true,
                myMessages: []
            })
        );
    });
    it("should set wsMyConnected to false", () => {
        expect(wsMyReducer(state, {type: WS_MY_CONNECTION_CLOSED})).toEqual(
            expect.objectContaining({
                wsMyConnected: false,
                myMessages: []
            })
        );
    });
})