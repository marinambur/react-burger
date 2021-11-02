import {
    SET_ORDER,
    SET_ORDER_SUCCESS,
    SET_ORDER_FAILED,
    ORDER_MODAL_CLOSE,
    DRAG_SORT,
    ADD_BUN, ADD_MAIN, DELETE_ITEM

} from '../actions/burgerOrder';
const initialState = {
    allCartItems: {bun: [],
        main: []},
    order: {    orderRequest: false,
        orderRequestFailed: false,
        order: {}},
    orderModal: false,

};

// @ts-ignore
export const burgerOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER: {
            return {
                ...state,
                order: {...state.order, orderRequest: true, orderRequestFailed: false},
            };
        }
        case SET_ORDER_SUCCESS: {
            console.log(state)
            return {
                ...state,
                order: {...state.order, order: action.items, orderRequestFailed: false},
                orderModal: true,
            };
        }
        case DRAG_SORT: {
            return {
                ...state,
                allCartItems: {
                    ...state.allCartItems,
                }
            };
        }
        case SET_ORDER_FAILED: {
            return {
                ...state,
                order: {...state.order, orderRequestFailed: true, orderRequest: false},
                orderModal: false,
            };
        }
        case ORDER_MODAL_CLOSE: {
            return {
                ...state,
                order: {},
                orderModal: false,
                allCartItems: { ...state.allCartItems, bun: [], main: [] },
            };
        }
        case DELETE_ITEM: {
            // @ts-ignore
            return { ...state, allCartItems: {...state.allCartItems, main: action.filteredArr }};
        }
        case ADD_BUN: {
            // @ts-ignore
            return { ...state, allCartItems: { ...state.allCartItems, bun: [action.item] }};
        }
        case ADD_MAIN: {
            // @ts-ignore
            return { ...state, allCartItems: { ...state.allCartItems, main: [...state.allCartItems.main, action.newItem] }};
        }
        default: {
            return state;
        }
    }
};