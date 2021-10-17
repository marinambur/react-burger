
import React, {useCallback, useState} from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordRequest, resetPasswordRequest} from "../../../services/actions/auth";

export function ResetPasswordPage() {
    const [form, setFormValue] = useState({ password: '', token: ''});
    const inputRef = React.useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    // @ts-ignore
    const reset = useSelector(store => (store.authReducer.reg.reset));
    // @ts-ignore
    const auth = useSelector(store => (store.authReducer.reg.login));
    const onChange = (e: { target: { name: any; value: any; }; }) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };
    const isEmail = localStorage.getItem('email');
    const resetPassword = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPasswordRequest(form)) ;
        },
        [ form, resetPasswordRequest]
    );
    if (isEmail==='false') {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
        );
    }
    if (reset) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }
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
            <form className={styles.form} onSubmit={resetPassword}>
                <h1  className={`${styles.heading} mb-6`}>Восстановление пароля</h1>
                <div className={'mb-6'}>
                    <Input
                        type={'text'}
                        placeholder={'Введите новый пароль'}
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-6'}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChange}
                        value={form.token}
                        name={'token'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-20'}>
                    <Button type="primary" size="large">
                        Сохранить
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Вспомнили пароль?
                    <Link className={`${styles.span} text text_type_main-default`} to='/login'>
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
}