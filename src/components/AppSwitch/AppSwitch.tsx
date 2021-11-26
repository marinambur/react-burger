import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from "../../types/types";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientPage from "../pages/ingredient/IngredientPage";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {Location} from "history";
import {FeedPage} from "../pages/feed/FeedPage";
import {ProfileOrders} from "../pages/profile/ProfileOrders";
import {OrderIngredientPage} from "../pages/OrderIngredientPage/OrderIngredientPage";
import {NotFound} from "../pages/NotFound/NotFound";
import {getFeed} from "../../services/actions";
import {LoaderComponent} from "../LoaderComponent/LoaderComponent";

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
    }, [dispatch]);
    useEffect(()=> {
        dispatch(getFeed())
    }, [dispatch]);
    const back = () => {
        history.goBack();
    };
    if (!checking) {
        return (
      <>
          <AppHeader />
          <LoaderComponent/>
      </>
        );
    }

    return (
        <>  <AppHeader />{checking &&    <>
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
                <Route path="/feed" exact={true}>
                    <FeedPage />
                </Route>
                <ProtectedRoute path="/profile" exact={true}>
                    <ProfilePage />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders" exact={true}>
                    <ProfileOrders />
                </ProtectedRoute>
                <Route path="/ingredients/:id" children={<IngredientPage />} />
                <Route path="/feed/:id" children={<OrderIngredientPage />} />
                <Route path="/profile/orders/:id" children={<OrderIngredientPage />} />
                <Route path="/" exact={true}>
                    <AppMain/>
                </Route>
            </Switch>
            {background && <Route path="/ingredients/:id">
                <Modal onClose={back} >
                    <IngredientDetails ></IngredientDetails>
                </Modal>
            </Route>}
            {background && <Route path="/profile/orders/:id">
                <Modal onClose={back} >
                    <OrderIngredientPage ></OrderIngredientPage>
                </Modal>
            </Route>}
            {background && <Route path="/feed/:id">
                <Modal onClose={back} >
                    <OrderIngredientPage ></OrderIngredientPage>
                </Modal>
            </Route>}
        </> }


        </>


    );
}

export default AppSwitch;