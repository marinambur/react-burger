import {burgerCartReducer} from "./burgerCart";
import {GET_FEED, GET_FEED_FAILED, GET_FEED_SUCCESS, ITEM_MODAL_CLOSE, SET_TOTAL_PRICE, SHOW_INFO} from "../actions";

const state = {
    allItems: {    allItemsRequest: false,
        allItemsRequestFailed: false,
        items: []},
    itemModal: false,
    totalPrice: 0,
}
describe("Burger Cart reducer", () => {
    it("should return initial state", () => {
        expect(burgerCartReducer(undefined, {})).toEqual(state);
    });
    it("should set itemModal to true", () => {
        expect(burgerCartReducer(state, { type: SHOW_INFO })).toEqual(
            expect.objectContaining({
                allItems: {    allItemsRequest: false,
                    allItemsRequestFailed: false,
                    items: []},
                itemModal: true,
                totalPrice: 0,
            })
        );
    });
    it("should set allItemsRequest to true", () => {
        expect(burgerCartReducer(state, { type: GET_FEED })).toEqual(
            expect.objectContaining({
                allItems: {    allItemsRequest: true,
                    allItemsRequestFailed: false,
                    items: []},
                itemModal: false,
                totalPrice: 0,
            })
        );
    });
    it("should show feed items", () => {
        expect(burgerCartReducer(state, { type: GET_FEED_SUCCESS })).toEqual(
            expect.objectContaining({
                allItems: {    allItemsRequest: false,
                    allItemsRequestFailed: false},
                itemModal: false,
                totalPrice: 0,
            })
        );
    });
    it("should set allItemsRequestFailed to true", () => {
        expect(burgerCartReducer(state, { type: GET_FEED_FAILED })).toEqual(
            expect.objectContaining({
                allItems: {    allItemsRequest: false,
                    allItemsRequestFailed: true,
                    items: []},
                itemModal: false,
                totalPrice: 0
            })
        );
    });
    it("should set itemModal to false", () => {
        expect(burgerCartReducer(state, { type: ITEM_MODAL_CLOSE })).toEqual(
            expect.objectContaining({
                allItems: {    allItemsRequest: false,
                    allItemsRequestFailed: false,
                    items: []},
                itemModal: false,
                totalPrice: 0
            })
        );
    });
    it("should set totalPrice", () => {
        expect(burgerCartReducer(state, { type: SET_TOTAL_PRICE })).toEqual(
            expect.objectContaining({
                allItems: {    allItemsRequest: false,
                    allItemsRequestFailed: false,
                    items: []},
                itemModal: false
            })
        );
    });
})