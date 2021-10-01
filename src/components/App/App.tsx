import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
export const url = 'https://norma.nomoreparties.space/api/ingredients';
function App() {
    return (
      <>
        <AppHeader />
          <AppMain/>
      </>
  );
}

export default App;
