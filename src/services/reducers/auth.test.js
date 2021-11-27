import {authReducer} from "./auth";
import {
    SET_CHECK_REQUEST, SET_FORGOT_REQUEST,
    SET_LOGIN_REQUEST,
    SET_LOGIN_REQUEST_FAILED,
    SET_LOGOUT_SUCCESS,
    SET_REGISTER_REQUEST, SET_REGISTER_REQUEST_SUCCESS, SET_RESET_REQUEST
} from "../actions/auth";

const state = {
    reg: {    regRequest: false, isChecked: false,
        regRequestFailed: false,
        user: {}, authorization: false, login: false, loginRequest: false,
        loginRequestFailed: false, forgotSuccess: false, reset: false},
};

const testUser = {
    email: "marina@gmail.com",
    name: "Marina"
};

describe("Auth reducer", () => {
    it("should return initial state", () => {
        expect(authReducer(undefined, {})).toEqual(state);
    });

    it("should set regRequest to true", () => {
        expect(authReducer(state, { type: SET_REGISTER_REQUEST })).toEqual(
            expect.objectContaining({ reg: {authorization: false, forgotSuccess: false, isChecked: false, login: false, loginRequest: false, loginRequestFailed: false, regRequest: true,  regRequestFailed: false, reset: false, user: {} }})
        );
    });

    it("should start checking", () => {
        expect(authReducer(state, { type: SET_CHECK_REQUEST })).toEqual(
            expect.objectContaining({ reg: {authorization: false, forgotSuccess: false, isChecked: false, login: false, loginRequest: false, loginRequestFailed: false, regRequest: false,  regRequestFailed: false, reset: false, user: {} }})
        );
    });

    it("should set isChecked, loginRequest and login to true", () => {
        expect(authReducer(state, { type: SET_LOGIN_REQUEST})).toEqual(
            expect.objectContaining({ reg: {authorization: false, forgotSuccess: false, isChecked: true, login: true, loginRequest: true, loginRequestFailed: false, regRequest: false,  regRequestFailed: false, reset: false, user: {} }})
        );
    });

    it("should set authorization, loginRequest and login  to true", () => {
        expect(authReducer(state, { type: SET_REGISTER_REQUEST_SUCCESS, payload: { user: testUser }})).toEqual(
            expect.objectContaining({ reg: {authorization: true, forgotSuccess: false, isChecked: true, login: false, loginRequest: false, loginRequestFailed: false, regRequest: false,  regRequestFailed: false, reset: false}})
        );
    });

    it("should set login request and login states to false", () => {
        expect(authReducer(state, { type: SET_LOGOUT_SUCCESS})).toEqual(
            expect.objectContaining({ reg: {authorization: false, forgotSuccess: false, isChecked: false, login: false, loginRequest: false, loginRequestFailed: false, regRequest: false,  regRequestFailed: false, reset: false}})
        );
    });
    it("should set isChecked to true and regRequestFailed to true", () => {
        expect(authReducer(state, { type: SET_LOGIN_REQUEST_FAILED})).toEqual(
            expect.objectContaining({ reg: {authorization: false, forgotSuccess: false, isChecked: true, login: false, loginRequest: false, loginRequestFailed: false, regRequest: false,  regRequestFailed: true, reset: false, user: {}}})
        );
    });
    it("should set forgotSuccess to true", () => {
        expect(authReducer(state, { type: SET_FORGOT_REQUEST})).toEqual(
            expect.objectContaining({ reg: {authorization: false, forgotSuccess: true, isChecked: false, login: false, loginRequest: false, loginRequestFailed: false, regRequest: false,  regRequestFailed: false, reset: false, user: {}}})
        );
    });
    it("should set reset to true", () => {
        expect(authReducer(state, { type: SET_RESET_REQUEST})).toEqual(
            expect.objectContaining({ reg: {authorization: false, forgotSuccess: false, isChecked: false, login: false, loginRequest: false, loginRequestFailed: false, regRequest: false,  regRequestFailed: false, reset: true, user: {}}})
        );
    });
});