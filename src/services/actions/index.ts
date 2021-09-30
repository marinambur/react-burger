import {url} from "../../components/App/App";
import {postUrl} from '../../components/BurgerConstructor/BurgerConstructor'
export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_BUN = 'ADD_BUN';
export const ADD_MAIN = 'ADD_MAIN';
export const GET_FEED = 'GET_FEED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILED = 'GET_FEED_FAILED';

export const SET_ORDER = 'SET_ORDER';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED';
export const SHOW_INFO = 'SHOW_INFO';
export const ITEM_MODAL_CLOSE = 'ITEM_MODAL_CLOSE';
export const ORDER_MODAL_CLOSE='ORDER_MODAL_CLOSE';
export const DRAG_SORT='DRAG_SORT';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';


export function getFeed() {
    // @ts-ignore
    return function(dispatch) {
        dispatch({
            type: GET_FEED
        })
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((data) =>
                dispatch({
                            type: GET_FEED_SUCCESS,
                            // @ts-ignore
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



// @ts-ignore
export function postData(ingredients) {
    // @ts-ignore
    return function(dispatch) {
        dispatch({
            type: SET_ORDER
        })
        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                ingredients
            )
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((data) =>
                dispatch({
                    type: SET_ORDER_SUCCESS,
                    // @ts-ignore
                    items: data
                })
            )
            .catch((error) => {
                dispatch({
                    type: SET_ORDER_FAILED
                })
            });
    }
}
