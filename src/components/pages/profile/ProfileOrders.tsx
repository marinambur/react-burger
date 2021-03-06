import React, {useCallback, useEffect} from 'react';
import styles from './profile.module.css';
import {NavLink, Redirect, useHistory} from 'react-router-dom';
import { logoutRequest} from "../../../services/actions/auth";
import {useDispatch, useSelector} from "../../../types/types";
import {deleteCookie} from "../../utils";
import { UserFeed } from '../../UserFeed/UserFeed';
import {wsMyActions} from "../../../services/actions/wsMyActions";
import {LoaderComponent} from "../../LoaderComponent/LoaderComponent";



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
    }, [dispatch]);
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
        [ auth, dispatch, history]
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
            return (
                <>
                    <LoaderComponent/>
                </>
            );
        }
    return (
        <div className={styles.container}>
            <div className={`${styles.left} mr-15`}>
                <NavLink
                    to={{ pathname: `/profile` }} exact
                    className={`${styles.navLink} text text_type_main-medium`}
                    activeClassName={styles.activeLink}
                >??????????????</NavLink>
                <NavLink
                    to={{ pathname: `/profile/orders` }} exact
                    className={`${styles.navLink} text text_type_main-medium`}
                    activeClassName={styles.activeLink}
                >?????????????? ??????????????</NavLink>
                <a onClick={logout}  className={`${styles.navLink} text text_type_main-medium mb-20`}
                >??????????</a>
                <p className="text text_type_main-default text_color_inactive">?? ???????? ?????????????? ???? ????????????
                    ???????????????? ???????? ???????????????????????? ????????????</p>
            </div>
            <UserFeed></UserFeed>
        </div>

    );
}
