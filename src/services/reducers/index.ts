import { combineReducers } from 'redux';
import {burgerCartReducer} from './burgerCart';
import {burgerOrderReducer} from "./burgerOrder";
import {authReducer} from "./auth";
export const rootReducer = combineReducers({
    burgerCartReducer, burgerOrderReducer, authReducer
})