
import React, {useCallback, useEffect, useState} from 'react';
import styles from './login.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from 'react-router-dom';
import {loginRequest, registerRequest} from "../../../services/actions";
import {useDispatch, useSelector} from "react-redux";
export function LoginPage() {
    const [value, setValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [isUserLoaded, setUserLoaded] = useState(false);
    const [form, setFormValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const history = useHistory();
    // @ts-ignore
    const auth = useSelector(store => (store.burgerCartReducer.reg.login));
    // @ts-ignore
    const checking = useSelector(store => (store.burgerCartReducer.reg.isChecked));
    const onChange = (e: { target: { name: any; value: any; }; }) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };
    const inputRef = React.useRef(null)

    let login = useCallback(
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
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }
    return (


        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1  className={`${styles.heading} mb-6`}>Вход</h1>
                <div className={'mb-6'}>
                    <EmailInput onChange={onChange} value={form.email} name={'email'} />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                <div className={'mb-20'}>
                    <Button type="primary" size="large" onClick={login}>
                        Войти
                    </Button>
                </div>
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
            </form>
        </div>
    );
}