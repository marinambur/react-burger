import { combineReducers } from 'redux';
import {burgerCartReducer} from './burgerCart';
import {burgerOrderReducer} from "./burgerOrder";
import {authReducer} from "./auth";
import {wsReducer} from "./wsReducer";
import {wsMyReducer} from "./wsMyReducer";
export const rootReducer = combineReducers({
    burgerCartReducer, burgerOrderReducer, authReducer, wsReducer, wsMyReducer
})