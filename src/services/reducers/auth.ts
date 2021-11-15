import {
    SET_REGISTER_REQUEST_SUCCESS, SET_REGISTER_REQUEST,
    SET_LOGOUT_SUCCESS, SET_LOGIN_REQUEST,
    SET_CHECK_REQUEST, SET_LOGIN_REQUEST_FAILED, SET_FORGOT_REQUEST, SET_RESET_REQUEST

} from '../actions/auth';

import type { TAuthActions } from '../actions/auth';
const initialState = {
    reg: {    regRequest: false, isChecked: false,
        regRequestFailed: false,
        user: {}, authorization: false, login: false, loginRequest: false,
        loginRequestFailed: false, forgotSuccess: false, reset: false},
};

export const authReducer = (state = initialState, action: TAuthActions) => {
    switch (action.type) {
        case SET_REGISTER_REQUEST: {
            return {
                ...state,
                reg: {...state.reg, regRequest: true, regRequestFailed: false},
            };
        }
        case SET_CHECK_REQUEST: {
            return {
                ...state,
                reg: {...state.reg},
            };
        }
        case SET_LOGIN_REQUEST: {
            return {
                ...state,
                reg: {...state.reg, loginRequest: true, loginRequestFailed: false, login: true, isChecked: true},
            };
        }
        case SET_REGISTER_REQUEST_SUCCESS: {
            return {
                ...state,
                reg: {...state.reg, user: action.info, regRequestFailed: false, authorization: true, isChecked: true},
            };
        }
        case SET_LOGOUT_SUCCESS: {
            return {
                ...state,
                reg: {...state.reg, user: action.info, regRequestFailed: false, authorization: false, login: false},
            };
        }
        case SET_LOGIN_REQUEST_FAILED: {
            return {
                ...state,
                reg: {
                    ...state.reg,
                    regRequestFailed: true,
                    regRequest: false,
                    isChecked: true,
                    authorization: false,
                    login: false
                },
            };
        }
        case SET_FORGOT_REQUEST: {
            return {
                ...state,
                reg: {...state.reg, forgotSuccess: true},
            }
        }


        case
            SET_RESET_REQUEST: {
                return {
                    ...state,
                    reg: {...state.reg, reset: true},
                };
        }
        default: {
            return state;
        }
    }
}