import {url} from "../../components/App/App";
import {postUrl} from '../../components/BurgerConstructor/BurgerConstructor'
import {deleteCookie, getCookie, setCookie} from "../../components/utils";
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
export const SET_REGISTER_REQUEST='SET_REGISTER_REQUEST';
export const SET_REGISTER_REQUEST_SUCCESS='SET_REGISTER_REQUEST_SUCCESS';
export const SET_REGISTER_REQUEST_FAILED = 'SET_REGISTER_REQUEST_FAILED';
export const SET_LOGIN_REQUEST='SET_LOGIN_REQUEST';
export const SET_LOGIN_REQUEST_SUCCESS='SET_LOGIN_REQUEST_SUCCESS';
export const SET_LOGIN_REQUEST_FAILED = 'SET_LOGIN_REQUEST_FAILED';
export const SET_LOGOUT_SUCCESS = 'SET_LOGOUT_SUCCESS';
export const SET_CHECK_REQUEST = 'SET_CHECK_REQUEST';
export const SET_FORGOT_REQUEST = 'SET_FORGOT_REQUEST';
export const SET_RESET_REQUEST = 'SET_RESET_REQUEST';


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
// @ts-ignore
export function registerRequest(form) {
    // @ts-ignore
    return function(dispatch) {
        fetch('https://norma.nomoreparties.space/api/auth/register', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(res => {
                if (!res.ok && res.status >= 500) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: SET_REGISTER_REQUEST_SUCCESS,
                        // @ts-ignore
                        info: data.user
                    })
                    setCookie('accessToken', data.accessToken, { path: '/' });
                    setCookie('refreshToken', data.refreshToken, { path: '/' });
                }})
            .catch((error) => {
                dispatch({
                    type: SET_REGISTER_REQUEST_FAILED
                })
            });
    }
}

// @ts-ignore
export function loginRequest(form) {
    // @ts-ignore
    return function(dispatch) {
        fetch('https://norma.nomoreparties.space/api/auth/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(res => {
                if (!res.ok && res.status >= 500) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: SET_LOGIN_REQUEST,
                        info: data.user
                    })
                    setCookie('accessToken', data.accessToken, { path: '/' });
                    setCookie('refreshToken', data.refreshToken, { path: '/' });
                }
                if (!data.success) {
                    alert(data.message)
                    dispatch({
                        type: SET_LOGIN_REQUEST_FAILED
                    })
                }
            }
            )
            .catch((error) => {
                alert(error)
            });
    }
}

// @ts-ignore
export function logoutRequest() {
    // @ts-ignore
    return function(dispatch) {
        fetch('https://norma.nomoreparties.space/api/auth/logout', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: getCookie('refreshToken')}),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(res => {
                if (!res.ok && res.status >= 500) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: SET_LOGOUT_SUCCESS,
                        info: {}
                    })
                    localStorage.setItem('email', 'false');
                    deleteCookie('refreshToken');
                    deleteCookie('accessToken');
                }})
            .catch((error) => {
              console.log(error)
            });
    }
}


export function userRequest() {
    // @ts-ignore
    return function(dispatch) {
        dispatch({
            type: SET_CHECK_REQUEST
        })

        fetch('https://norma.nomoreparties.space/api/auth/user', {
            method: 'GET',
            // @ts-ignore
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken'),
            }
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                if (!data.success) {
                    dispatch(refreshToken())
                }
                if (data.success) {
                    dispatch({
                        type: SET_LOGIN_REQUEST,
                    })
                }})
            .catch((error) => {
              console.log(error.message)
            });
    }
}

export function userChangeRequest(form: any) {
    // @ts-ignore
    return function(dispatch) {
        // @ts-ignore
        // @ts-ignore
        fetch('https://norma.nomoreparties.space/api/auth/user', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            // @ts-ignore
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken'),
            },
            body: JSON.stringify(form),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data)
                if (!data.success) {
                    alert(data.message)
                }
                if (data.success) {
                    dispatch({
                        type: SET_LOGIN_REQUEST,
                        info: data.user
                    })
                }})
            .catch((error) => {
                console.log(error.message)
            });
    }
}

export function refreshToken() {
    // @ts-ignore
    return function(dispatch) {
        // @ts-ignore
        fetch(`https://norma.nomoreparties.space/api/auth/token`, {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            // @ts-ignore
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            }),
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: SET_LOGIN_REQUEST,
                        // @ts-ignore
                        info: data.user
                    })
                    setCookie('accessToken', data.accessToken, { path: '/' });
                    setCookie('refreshToken', data.refreshToken, { path: '/' });
                    dispatch(userRequest())
                }
                if (!data.success) {
                    dispatch({
                        type: SET_LOGIN_REQUEST_FAILED,
                    })
                }
            })
            .catch((error) => {
                console.log(error.message)
                dispatch({
                    type: SET_LOGIN_REQUEST_FAILED
                })
            });
    }
}

// @ts-ignore
export function forgotPasswordRequest(form) {
    // @ts-ignore
    return function(dispatch) {
        fetch('https://norma.nomoreparties.space/api/password-reset', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(res => {
                if (!res.ok && res.status >= 500) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                    if (data.success) {
                        localStorage.setItem('email', 'true');
                        dispatch({
                            type: SET_FORGOT_REQUEST,
                        })
                    }
                    if (!data.success) {
                        alert(data.message)
                    }
                }
            )
            .catch((error) => {
                console.log(error)
            });
    }
}

// @ts-ignore
export function resetPasswordRequest(form) {
    // @ts-ignore
    return function(dispatch) {
        fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(res => {
                if (!res.ok && res.status >= 500) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                    if (data.success) {
                        dispatch({
                            type: SET_RESET_REQUEST,
                        })
                    }
                    if (!data.success) {
                        alert(data.message)
                    }
                }
            )
            .catch((error) => {
                console.log(error)
            });
    }
}


