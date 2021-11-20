import {burgerUrl} from "../../components/App/App";
import {getCookie} from "../../components/utils";
import {store} from "../../index";
import {TIngredientsIds} from "../../types/types";
export type AppDispatch = typeof store.dispatch;
export const SET_ORDER: 'SET_ORDER' = 'SET_ORDER';
export const SET_ORDER_SUCCESS: 'SET_ORDER_SUCCESS' = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILED: 'SET_ORDER_FAILED' = 'SET_ORDER_FAILED';
export const ORDER_MODAL_CLOSE: 'ORDER_MODAL_CLOSE'='ORDER_MODAL_CLOSE';
export const DRAG_SORT: 'DRAG_SORT' = 'DRAG_SORT';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_MAIN: 'ADD_MAIN' = 'ADD_MAIN';

export interface ISetOrder {
    readonly type: typeof SET_ORDER;
}
export interface ISetOrderSuccess {
    readonly type: typeof SET_ORDER_SUCCESS;
    readonly items: any;
}
export interface ISetOrderFailed {
    readonly type: typeof SET_ORDER_FAILED;
}
export interface IOrderModalClose {
    readonly type: typeof ORDER_MODAL_CLOSE;
}
export interface IDragSort {
    readonly type: typeof DRAG_SORT;
}
export interface IDeleteItem {
    readonly type: typeof DELETE_ITEM;
}
export interface IAddBun {
    readonly type: typeof ADD_BUN;
}
export interface IAddMain {
    readonly type: typeof ADD_MAIN;
}


export type TBurgerOrdersActions =
    | ISetOrder | ISetOrderSuccess | ISetOrderFailed | IOrderModalClose | IDragSort | IDeleteItem | IAddBun | IAddMain;
export function postData(ingredients: TIngredientsIds) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: SET_ORDER
        })

        fetch(`${burgerUrl}/orders`, {
            method: 'POST',
            // @ts-ignore
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken')
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