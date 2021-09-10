import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../logo.svg';
import styles from'./App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";

function App() {
  return (
      <>
        <AppHeader />
          <AppMain/>
      </>
  );
}

export default App;
