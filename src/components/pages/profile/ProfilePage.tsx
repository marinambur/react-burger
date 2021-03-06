import React, {useCallback, useState} from 'react';
import styles from './profile.module.css';
import {NavLink, Redirect, useHistory} from 'react-router-dom';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutRequest, userChangeRequest} from "../../../services/actions/auth";
import {useDispatch, useSelector} from "../../../types/types";
import {deleteCookie} from "../../utils";
function ProfilePage() {
    const inputRef = React.useRef(null);
    const [form, setFormValue] = useState({ email: '', password: '', name: '' });

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const auth = useSelector((store: any) => (store.authReducer.reg.login));
    const history = useHistory();

    const returnForm = () => {
        setFormValue({ email: '', password: '', name: '' })
    }
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


    const saveUser = useCallback(
        e => {
            e.preventDefault();
            dispatch(userChangeRequest(form)) ;

        },
        [ form, dispatch]
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
            <div className={styles.right}>
                <form onSubmit={saveUser}>
                <div className={'mb-6'}>
                    <Input
                        type={'text'}
                        placeholder={'??????'}
                        onChange={onChange}
                        value={form.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'????????????'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-6'}>
                    <Input
                        type={'text'}
                        placeholder={'??????????'}
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'????????????'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                <Button onClick={returnForm} type={'secondary'} size={'large'}
                >????????????</Button>
                <Button type={'primary'} size={'large'}
                >??????????????????</Button>
                </form>
            </div>
        </div>

    );
}

export default ProfilePage;