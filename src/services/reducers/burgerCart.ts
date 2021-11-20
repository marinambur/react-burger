import {
    GET_FEED,
    GET_FEED_SUCCESS,
    GET_FEED_FAILED,
    SHOW_INFO,
    ITEM_MODAL_CLOSE,
    SET_TOTAL_PRICE, TActions,

} from '../actions';

const initialState = {
    allItems: {    allItemsRequest: false,
        allItemsRequestFailed: false,
        items: []},
    itemModal: false,
    totalPrice: 0,

};

export const burgerCartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SHOW_INFO: {
            return { ...state, itemModal: true };
        }
        case GET_FEED: {
            return {
                ...state,
                allItems: {...state.allItems, allItemsRequest: true, allItemsRequestFailed: false},
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