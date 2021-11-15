import {burgerUrl} from "../../components/App/App";
import {deleteCookie, getCookie, setCookie} from "../../components/utils";


export const SET_REGISTER_REQUEST_SUCCESS: 'SET_REGISTER_REQUEST_SUCCESS'='SET_REGISTER_REQUEST_SUCCESS';
export const SET_REGISTER_REQUEST_FAILED: 'SET_REGISTER_REQUEST_FAILED' = 'SET_REGISTER_REQUEST_FAILED';
export const SET_REGISTER_REQUEST: 'SET_REGISTER_REQUEST' = 'SET_REGISTER_REQUEST';
export const SET_LOGIN_REQUEST: 'SET_LOGIN_REQUEST'='SET_LOGIN_REQUEST';
export const SET_LOGIN_REQUEST_FAILED: 'SET_LOGIN_REQUEST_FAILED' = 'SET_LOGIN_REQUEST_FAILED';
export const SET_LOGOUT_SUCCESS: 'SET_LOGOUT_SUCCESS' = 'SET_LOGOUT_SUCCESS';
export const SET_CHECK_REQUEST: 'SET_CHECK_REQUEST' = 'SET_CHECK_REQUEST';
export const SET_FORGOT_REQUEST: 'SET_FORGOT_REQUEST' = 'SET_FORGOT_REQUEST';
export const SET_RESET_REQUEST: 'SET_RESET_REQUEST' = 'SET_RESET_REQUEST';

export type TUser = {
    name?: string, email?: string, password?: string
}
export interface ISetRegisterRequestSuccess {
    readonly type: typeof SET_REGISTER_REQUEST_SUCCESS;
    readonly info: TUser;
}
export interface ISetRegisterRequestFailed {
    readonly type: typeof SET_REGISTER_REQUEST_FAILED;
}
export interface ISetRegisterRequest {
    readonly type: typeof SET_REGISTER_REQUEST;
}
export interface ISetLoginRequest {
    readonly type: typeof SET_LOGIN_REQUEST;
}
export interface ISetLoginRequestFailed {
    readonly type: typeof SET_LOGIN_REQUEST_FAILED;
}
export interface ISetLogoutSuccess {
    readonly type: typeof SET_LOGOUT_SUCCESS;
    readonly info: TUser;
}
export interface ISetCheckRequest {
    readonly type: typeof SET_CHECK_REQUEST;
}
export interface ISetForgotRequest {
    readonly type: typeof SET_FORGOT_REQUEST;
}
export interface ISetResetRequest {
    readonly type: typeof SET_RESET_REQUEST;
}
// Объединяем в Union
export type TAuthActions =
    | ISetRegisterRequestSuccess | ISetResetRequest | ISetForgotRequest | ISetCheckRequest | ISetLogoutSuccess | ISetLoginRequestFailed | ISetLoginRequest | ISetRegisterRequest | ISetRegisterRequestFailed
// @ts-ignore
export function registerRequest(form) {
    // @ts-ignore
    return function(dispatch) {
        fetch(`${burgerUrl}/auth/register`, {
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
        fetch(`${burgerUrl}/auth/login`, {
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
        fetch(`${burgerUrl}/auth/logout`, {
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

        fetch(`${burgerUrl}/auth/user`, {
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
        fetch(`${burgerUrl}/auth/user`, {
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
        fetch(`${burgerUrl}/auth/token`, {
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
        fetch(`${burgerUrl}/password-reset`, {
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
        fetch(`${burgerUrl}/password-reset/reset`, {
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
                        localStorage.setItem('email', 'false');
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


