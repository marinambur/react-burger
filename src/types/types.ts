import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import {store} from "../index";
import {TAuthActions} from "../services/actions/auth";
import {TBurgerOrdersActions} from "../services/actions/burgerOrder";
import {TActions} from "../services/actions";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface IBurgerItem {
    _id: string,
    price: number,
    name: string,
    image: string,
    type?: 'bun'|'main'|'sauce',
    uniqueId: string,
    index: string|number,
}
export type IngredientType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
    count?: number;
};

export type OrderType = {
    createdAt: string;
    ingredients: Array<string>;
    name: string;
    number: number;
    status: "done" | "pending" | "cancel";
    updatedAt: string;
    _id: string;
};
export type WSDataType = {
    success: boolean;
    orders: OrderType[];
    total: number;
    totalToday: number;
};
type ApplicationActions =
    | TAuthActions
    | TBurgerOrdersActions
    | TActions
export type TIngredientsIds = {ingredients: string[]};
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, ApplicationActions>
    >;
export type WSActions = {
    wsInit: string;
    wsClose: string;
    wsSendMessage: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
};
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
