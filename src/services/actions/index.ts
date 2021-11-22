import {burgerUrl} from "../../components/App/App";
import {AppThunk} from "../../types/types";
import {AppDispatch} from "../../types/types";

export const GET_FEED: 'GET_FEED' = 'GET_FEED';
export const GET_FEED_SUCCESS: 'GET_FEED_SUCCESS' = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILED: 'GET_FEED_FAILED' = 'GET_FEED_FAILED';
export const SHOW_INFO: 'SHOW_INFO' = 'SHOW_INFO';
export const ITEM_MODAL_CLOSE: 'ITEM_MODAL_CLOSE' = 'ITEM_MODAL_CLOSE';
export const SET_TOTAL_PRICE: 'SET_TOTAL_PRICE' = 'SET_TOTAL_PRICE';
export interface IGetFeed {
    readonly type: typeof GET_FEED;
}
export interface IGetFeedSuccess {
    readonly type: typeof GET_FEED_SUCCESS;
    readonly items: any;
}
export interface IGetFeedFailed {
    readonly type: typeof GET_FEED_FAILED;
}
export interface IShowInfo {
    readonly type: typeof SHOW_INFO;
}
export interface IItemModalClose {
    readonly type: typeof ITEM_MODAL_CLOSE;
}
export interface ISetTotalPrice {
    readonly type: typeof SET_TOTAL_PRICE;
}

export type TActions =
    | IGetFeed | IGetFeedSuccess | IGetFeedFailed | IShowInfo | IItemModalClose | ISetTotalPrice;
export const getFeed: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_FEED
        })
        fetch(`${burgerUrl}/ingredients`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((data) =>
                dispatch({
                            type: GET_FEED_SUCCESS,
                            items: data.data
                            })
            )
            .catch((error) => {
                    dispatch({
                        type: GET_FEED_FAILED
                    })
            });
    }
}
