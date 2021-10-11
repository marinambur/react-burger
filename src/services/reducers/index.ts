import { combineReducers } from 'redux';
import {burgerCartReducer} from './burgerCart';
export const rootReducer = combineReducers({
    burgerCartReducer,
})