import {burgerUrl} from "../../components/App/App";
export const GET_FEED = 'GET_FEED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILED = 'GET_FEED_FAILED';
export const SHOW_INFO = 'SHOW_INFO';
export const ITEM_MODAL_CLOSE = 'ITEM_MODAL_CLOSE';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';


export function getFeed() {
    // @ts-ignore
    return function(dispatch) {
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
