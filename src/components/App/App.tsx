import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import { LoginPage } from '../pages/login/LoginPage';
import {RegisterPage} from "../pages/register/RegisterPage";
import {ResetPasswordPage} from "../pages/reset-password/ResetPasswordPage";
import {ForgotPasswordPage} from "../pages/forgot-password/ForgotPasswordPage";
import ProfilePage from "../pages/profile/ProfilePage";
import Modal from "../Modal/Modal";
import {ITEM_MODAL_CLOSE} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppSwitch from "../AppSwitch/AppSwitch";
export const url = 'https://norma.nomoreparties.space/api/ingredients';
function App() {
    return (
          <Router>
            <AppSwitch/>
          </Router>
  );
}

export default App;
