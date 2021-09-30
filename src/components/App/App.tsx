import React, {useEffect} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { useSelector } from 'react-redux';
import { TotalPriceContext, IngredientsContext, BurgerIngredientsContext, } from '../../services/appContext';
export const url = 'https://norma.nomoreparties.space/api/ingredients';
function App() {
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [ingredients, setIngredients] = React.useState([]);
    const [burgerIngredients, setBurgerIngredients] = React.useState([]);
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const initialState = useSelector(store => (store));

    const getData = () => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((data) =>
                setBurgerIngredients(data.data),
            )
            .catch((error) => {
                console.log(error)
            });
    };
    useEffect(getData, []);
    return (
      <>
          <BurgerIngredientsContext.Provider value={{burgerIngredients, setBurgerIngredients}}>
          <IngredientsContext.Provider value={{ingredients, setIngredients}}>
          <TotalPriceContext.Provider value={{totalPrice, setTotalPrice}}>
        <AppHeader />
          <AppMain/>
          </TotalPriceContext.Provider>
          </IngredientsContext.Provider>
          </BurgerIngredientsContext.Provider>
      </>
  );
}

export default App;
