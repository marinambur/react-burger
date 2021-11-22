import {burgerUrl} from "../../components/App/App";
import {deleteCookie, getCookie, setCookie} from "../../components/utils";
import {AppThunk} from "../../types/types";
import {AppDispatch} from "../../types/types";

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

export type TAuthActions =
    | ISetRegisterRequestSuccess | ISetResetRequest | ISetForgotRequest | ISetCheckRequest | ISetLogoutSuccess | ISetLoginRequestFailed | ISetLoginRequest | ISetRegisterRequest | ISetRegisterRequestFailed

export const registerRequest : AppThunk = (form: TUser) => {
    return function(dispatch: AppDispatch) {
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

export const loginRequest: AppThunk = (form: TUser) => {
    return function(dispatch: AppDispatch) {
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

export const logoutRequest: AppThunk = () => {
    return function(dispatch: AppDispatch) {
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


export const userRequest: AppThunk = () => {
    return function(dispatch: AppDispatch) {
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

export const userChangeRequest = (form: TUser) => {
    return function(dispatch: AppDispatch) {
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

export const refreshToken: AppThunk = () => {
    return function(dispatch: AppDispatch) {
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


export const forgotPasswordRequest: AppThunk = (form: TUser) => {
    return function(dispatch: AppDispatch) {
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


export const resetPasswordRequest: AppThunk = (form: TUser) => {
    return function(dispatch: AppDispatch) {
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


