import {burgerOrderReducer} from "./burgerOrder";
import {
    ADD_BUN, ADD_MAIN,
    DELETE_ITEM,
    DRAG_SORT,
    ORDER_MODAL_CLOSE,
    SET_ORDER,
    SET_ORDER_FAILED,
    SET_ORDER_SUCCESS
} from "../actions/burgerOrder";
const state = {
    allCartItems: {bun: [],
        main: []},
    order: {    orderRequest: false,
        orderRequestFailed: false,
        order: []},
    orderModal: false,

}
describe("Burger Order reducer", () => {
    it("should return constructor to initial state", () => {
        expect(burgerOrderReducer(undefined, {})).toEqual(state);
    });
    it("should set orderRequest to true", () => {
        expect(burgerOrderReducer(state, { type: SET_ORDER })).toEqual(
            expect.objectContaining({    allCartItems: {bun: [],
                    main: []},
                order: {    orderRequest: true,
                    orderRequestFailed: false,
                    order: []},
                orderModal: false})
        );
    });
    it("should set orderModal to true", () => {
        expect(burgerOrderReducer(state, { type: SET_ORDER_SUCCESS })).toEqual(
            expect.objectContaining({    allCartItems: {bun: [],
                    main: []},
                order: {    orderRequest: false,
                    orderRequestFailed: false},
                orderModal: true})
        );
    });
    it("should return order array", () => {
        expect(burgerOrderReducer(state, { type: DRAG_SORT })).toEqual(
            expect.objectContaining({    allCartItems: {bun: [],
                    main: []},
                order: {      order: [],  orderRequest: false,
                    orderRequestFailed: false},
                orderModal: false})
        );
    });
    it("should set orderRequestFailed to true", () => {
        expect(burgerOrderReducer(state, { type: SET_ORDER_FAILED })).toEqual(
            expect.objectContaining({    allCartItems: {bun: [],
                    main: []},
                order: {      order: [],  orderRequest: false,
                    orderRequestFailed: true},
                orderModal: false})
        );
    });
    it("should set orderModal to false", () => {
        expect(burgerOrderReducer(state, { type: ORDER_MODAL_CLOSE })).toEqual(
            expect.objectContaining({    allCartItems: {bun: [],
                    main: []},
                order: {},
                orderModal: false})
        );
    });
    it("should return order array", () => {
        expect(burgerOrderReducer(state, { type: DELETE_ITEM })).toEqual(
            expect.objectContaining({    allCartItems: {bun: [],
                    },
                order: {      order: [],  orderRequest: false,
                    orderRequestFailed: false},
                orderModal: false})
        );
    });
    it("should return bun array", () => {
        expect(burgerOrderReducer(state, { type: ADD_BUN })).toEqual(
            expect.objectContaining({    allCartItems: {bun: [undefined], main: []
                },
                order: {      order: [],  orderRequest: false,
                    orderRequestFailed: false},
                orderModal: false})
        );
    });
    it("should return main array", () => {
        expect(burgerOrderReducer(state, { type: ADD_MAIN })).toEqual(
            expect.objectContaining({    allCartItems: {bun: [], main: [undefined]
                },
                order: {      order: [],  orderRequest: false,
                    orderRequestFailed: false},
                orderModal: false})
        );
    });
})