import React from "react";

interface TotalPriceContextInterface {
    totalPrice: number;
    setTotalPrice: (value: number) => void ;
}
interface IngredientsContextInterface {
    ingredients: Array<any>;
    setIngredients: any;
}
interface responseInterface {
    success: boolean;
    order: {number: number|''};
    name: string;
}
interface OrderContextInterface {
    response: responseInterface;
    setResponse: any;
}
export const TotalPriceContext = React.createContext<TotalPriceContextInterface >({totalPrice: 0, setTotalPrice: () => {}});
export const IngredientsContext = React.createContext<IngredientsContextInterface >({ingredients: [], setIngredients: ()=> {}});
export const OrderContext = React.createContext<OrderContextInterface >({response: {success: true, order: {number: ''}, name: 'name'}, setResponse: ()=> {}});