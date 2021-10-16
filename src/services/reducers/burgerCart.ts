import {
    DELETE_ITEM,
    ADD_BUN,
    ADD_MAIN,
    GET_FEED,
    GET_FEED_SUCCESS,
    GET_FEED_FAILED,
    SHOW_INFO,
    ITEM_MODAL_CLOSE,
    SET_ORDER,
    SET_ORDER_SUCCESS,
    SET_ORDER_FAILED,
    SET_REGISTER_REQUEST,
    SET_REGISTER_REQUEST_SUCCESS,
    ORDER_MODAL_CLOSE,
    DRAG_SORT,
    SET_TOTAL_PRICE,
    SET_LOGOUT_SUCCESS, SET_LOGIN_REQUEST,
    SET_CHECK_REQUEST, SET_LOGIN_REQUEST_FAILED, SET_FORGOT_REQUEST, SET_RESET_REQUEST

} from '../actions';

const initialState = {
    allItems: {    allItemsRequest: false,
        allItemsRequestFailed: false,
        items: []},
    allCartItems: {bun: [],
        main: []},
    item: {},
    itemModal: false,
    order: {    orderRequest: false,
        orderRequestFailed: false,
        order: {}},
    reg: {    regRequest: false, isChecked: false,
        regRequestFailed: false,
        user: {}, authorization: false, login: false, loginRequest: false,
        loginRequestFailed: false, forgotSuccess: false, reset: false},
    orderModal: false,
    totalPrice: 0,

};


// @ts-ignore
export const burgerCartReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case SHOW_INFO: {
            // @ts-ignore
            return { ...state, itemModal: true };
        }
        case GET_FEED: {
            return {
                ...state,
                allItems: {...state.allItems, allItemsRequest: true, allItemsRequestFailed: false},
            };
        }
        case SET_ORDER: {
            return {
                ...state,
                order: {...state.order, orderRequest: true, orderRequestFailed: false},
            };
        }
        case SET_REGISTER_REQUEST: {
            return {
                ...state,
                reg: {...state.reg, regRequest: true, regRequestFailed: false},
            };
        }
        case SET_CHECK_REQUEST: {
            return {
                ...state,
                reg: {...state.reg},
            };
        }
        case SET_LOGIN_REQUEST: {
            return {
                ...state,
                reg: {...state.reg, loginRequest: true, loginRequestFailed: false, login: true, isChecked: true},
            };
        }
        case SET_ORDER_SUCCESS: {
            return {
                ...state,
                order: {...state.order, order: action.items, orderRequestFailed: false},
                orderModal: true,
            };
        }
        case SET_REGISTER_REQUEST_SUCCESS: {
            return {
                ...state,
                reg: {...state.reg, user: action.info, regRequestFailed: false, authorization: true, isChecked: true},
            };
        }
        case SET_LOGOUT_SUCCESS: {
            return {
                ...state,
                reg: {...state.reg, user: action.info, regRequestFailed: false, authorization: false, login: false},
            };
        }
        case SET_ORDER_FAILED: {
            return {
                ...state,
                order: {...state.order, orderRequestFailed: true, orderRequest: false},
                orderModal: false,
            };
        }
        case SET_LOGIN_REQUEST_FAILED: {
            return {
                ...state,
                reg: {...state.reg, regRequestFailed: true, regRequest: false, isChecked: true, authorization: false, login: false},
            };
        }
        case GET_FEED_SUCCESS: {
            return {
                ...state,
                allItems: {...state.allItems, items: action.items, allItemsRequest: false},
            };
        }
        case GET_FEED_FAILED: {
            return {
                ...state,
                allItems: {...state.allItems, allItemsRequestFailed: true, allItemsRequest: false},
            };
        }
        case ITEM_MODAL_CLOSE: {
            return {
                ...state,
                itemModal: false,
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
        case DRAG_SORT: {
            return {
                ...state,
                allCartItems: {
                    ...state.allCartItems,
                }
            };
        }
        case SET_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: action.total
            };
        }
        case SET_FORGOT_REQUEST: {
            return {
                ...state,
                reg: {...state.reg, forgotSuccess: true},
            }
        }
        case SET_RESET_REQUEST: {
            return {
                ...state,
                reg: {...state.reg, reset: true},
            }
        }
        default: {
            return state;
        }
    }
};