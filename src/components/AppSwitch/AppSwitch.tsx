import React, {useEffect, useState} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { Route, Switch, useHistory, useLocation} from 'react-router-dom';
import { LoginPage } from '../pages/login/LoginPage';
import {RegisterPage} from "../pages/register/RegisterPage";
import {ResetPasswordPage} from "../pages/reset-password/ResetPasswordPage";
import {ForgotPasswordPage} from "../pages/forgot-password/ForgotPasswordPage";
import ProfilePage from "../pages/profile/ProfilePage";
import Modal from "../Modal/Modal";
import {userRequest} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientPage from "../pages/ingredient/IngredientPage";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {Location} from "history";

export const url = 'https://norma.nomoreparties.space/api/ingredients';
function AppSwitch() {
    const history = useHistory();
    const action = history.action ==='PUSH' || history.action ==='REPLACE';

    type TLocationState={
    background: Location
    }
    const location = useLocation<TLocationState>();
    let background = action && location.state && location.state.background;

    const checking = useSelector((store: any) => (store.authReducer.reg.isChecked));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(userRequest());
    }, []);
    const back = () => {
        history.goBack();
    };

    return (
        <> {checking &&    <>
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
        </> }


        </>


    );
}

export default AppSwitch;