import React, {useEffect, useState} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import { LoginPage } from '../pages/login/LoginPage';
import {RegisterPage} from "../pages/register/RegisterPage";
import {ResetPasswordPage} from "../pages/reset-password/ResetPasswordPage";
import {ForgotPasswordPage} from "../pages/forgot-password/ForgotPasswordPage";
import ProfilePage from "../pages/profile/ProfilePage";
import Modal from "../Modal/Modal";
import { getFeed, ITEM_MODAL_CLOSE, userRequest} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientPage from "../pages/ingredient/IngredientPage";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
export const url = 'https://norma.nomoreparties.space/api/ingredients';
function AppSwitch() {
    let location = useLocation();
    let history = useHistory();
    // @ts-ignore
    let background = location.state && location.state.background;

    // @ts-ignore
    const checking = useSelector(store => (store.burgerCartReducer.reg.isChecked));
    const dispatch = useDispatch();
    // @ts-ignore
    const auth = useSelector(store => (store.burgerCartReducer.reg.login));

    useEffect(()=> {
        dispatch(userRequest());
    }, []);




    let back = (e: any) => {
        history.goBack();
    };




    return (
        <>
                <AppHeader />
                <Switch location={background || location}>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordPage />
                    </Route>
                    <Route path="/reset-password">
                        <ResetPasswordPage />
                    </Route>
                    <ProtectedRoute path="/profile">
                        <ProfilePage />
                    </ProtectedRoute>
                    <Route path="/ingredients/:id" children={<IngredientPage />} />
                    <Route path="/" exact={true}>
                        <AppMain/>
                    </Route>
                </Switch>
                {background && <Route path="/ingredients/:id">
                    <Modal onClose={back} >
                        <IngredientDetails ></IngredientDetails>
                    </Modal>
                </Route>}
            </>


    );
}

export default AppSwitch;