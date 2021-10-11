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
    ORDER_MODAL_CLOSE,
    DRAG_SORT,
    SET_TOTAL_PRICE,

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
            return { ...state, item: action.item, itemModal: true };
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
        case SET_ORDER_SUCCESS: {
            return {
                ...state,
                order: {...state.order, order: action.items, orderRequestFailed: false},
                orderModal: true,
            };
        }
        case SET_ORDER_FAILED: {
            return {
                ...state,
                order: {...state.order, orderRequestFailed: true, orderRequest: false},
                orderModal: false,
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
                item: [],
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
        default: {
            return state;
        }
    }
};