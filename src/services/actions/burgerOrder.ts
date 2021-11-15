import {burgerUrl} from "../../components/App/App";
export const SET_ORDER: 'SET_ORDER' = 'SET_ORDER';
export const SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS' = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILED: 'SET_ORDER_FAILED' = 'SET_ORDER_FAILED';
export const ORDER_MODAL_CLOSE: 'ORDER_MODAL_CLOSE'='ORDER_MODAL_CLOSE';
export const DRAG_SORT: 'DRAG_SORT' = 'DRAG_SORT';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_MAIN: 'ADD_MAIN' = 'ADD_MAIN';
// @ts-ignore
export function postData(ingredients) {
    // @ts-ignore
    return function(dispatch) {
        dispatch({
            type: SET_ORDER
        })
        fetch(`${burgerUrl}/orders`, {
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