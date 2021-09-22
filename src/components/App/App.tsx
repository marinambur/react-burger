import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { TotalPriceContext, IngredientsContext } from '../../services/appContext';

function App() {
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [ingredients, setIngredients] = React.useState([])
    return (
      <>
          <IngredientsContext.Provider value={{ingredients, setIngredients}}>
          <TotalPriceContext.Provider value={{totalPrice, setTotalPrice}}>
          <div id="modals"></div>
        <AppHeader />
          <AppMain/>
          </TotalPriceContext.Provider>
          </IngredientsContext.Provider>
      </>
  );
}

export default App;
