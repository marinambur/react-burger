import React, {useCallback, useEffect, useState} from 'react';
import styles from './profile.module.css';
import {NavLink, Redirect, useHistory} from 'react-router-dom';
import { logoutRequest, userChangeRequest} from "../../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {deleteCookie} from "../../utils";
import { UserFeed } from '../../UserFeed/UserFeed';
import {wsActions, wsMyActions} from "../../../index";


export function ProfileOrders() {

    const dispatch = useDispatch();
    const auth = useSelector((store: any) => (store.authReducer.reg.login));
    const history = useHistory();
    const myBurgers = useSelector((store: any) => store?.wsMyReducer?.myMessages);
    useEffect(() => {
        dispatch({ type: wsMyActions.wsInit });
        return () => {
            dispatch({ type: wsMyActions.onClose });
        };
    }, []);
    const logout = useCallback(
        e => {
            e.preventDefault();
            dispatch(logoutRequest());
            deleteCookie('refreshToken');
            if (auth) {
                return
            }
            if(!auth) {
                history.replace({ pathname: '/login' });
            }


        },
        [ logoutRequest]
    );


    if(!auth) {
        history.replace({ pathname: '/login' });
    }
    if (!auth) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }
    if (!myBurgers) {
        return null
    }
    return (
        <div className={styles.container}>
            <div className={`${styles.left} mr-15`}>
                <NavLink
                    to={{ pathname: `/profile` }} exact
                    className={`${styles.navLink} text text_type_main-medium`}
                    activeClassName={styles.activeLink}
                >Профиль</NavLink>
                <NavLink
                    to={{ pathname: `/profile/orders` }} exact
                    className={`${styles.navLink} text text_type_main-medium`}
                    activeClassName={styles.activeLink}
                >История заказов</NavLink>
                <a onClick={logout}  className={`${styles.navLink} text text_type_main-medium mb-20`}
                >Выход</a>
                <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            <UserFeed></UserFeed>
        </div>

    );
}
