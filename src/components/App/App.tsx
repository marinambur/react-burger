import React from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import AppSwitch from "../AppSwitch/AppSwitch";
export const burgerUrl = 'https://norma.nomoreparties.space/api';
function App() {
    return (
          <Router>
            <AppSwitch/>
          </Router>
  );
}

export default App;
