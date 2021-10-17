
import React, {useCallback, useEffect, useState} from 'react';
import styles from './login.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {loginRequest, registerRequest} from "../../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
export function LoginPage() {
    const [form, setFormValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();
    // @ts-ignore
    const auth = useSelector(store => (store.authReducer.reg.login));
    // @ts-ignore
    const checking = useSelector(store => (store.authReducer.reg.isChecked));
    const onChange = (e: { target: { name: any; value: any; }; }) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };
    const inputRef = React.useRef(null)

    const login = useCallback(
        e => {
            e.preventDefault();
            dispatch(loginRequest(form)) ;
            if (!auth) {
                return
            }
            if(auth) {
                history.replace({ pathname: '/' });
            }


        },
        [ form, loginRequest]
    );

    if (auth) {
        // @ts-ignore
        return (
            <Redirect
                // @ts-ignore
                to={location.state?.from || '/'}
            />
        );
    }
    return (


        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={login}>
                <h1  className={`${styles.heading} mb-6`}>Вход</h1>
                <div className={'mb-6'}>
                    <EmailInput onChange={onChange} value={form.email} name={'email'} />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                <div className={'mb-20'}>
                    <Button type="primary" size="large">
                        Войти
                    </Button>
                </div>
            </form>
                <p className="text text_type_main-default text_color_inactive mb-4">Вы — новый пользователь?
                    <Link className={`${styles.span} text text_type_main-default`} to='/register'>
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                    <Link className={`${styles.span} text text_type_main-default`} to='/forgot-password'>
                    Восстановить пароль
                    </Link>
                </p>
        </div>
    );
}