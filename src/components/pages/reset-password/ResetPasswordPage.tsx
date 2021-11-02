
import React, {useCallback, useState} from 'react';
import styles from './reset-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { resetPasswordRequest} from "../../../services/actions/auth";

export function ResetPasswordPage() {
    const [form, setFormValue] = useState({ password: '', token: ''});
    const inputRef = React.useRef(null);
    const dispatch = useDispatch();
    const reset = useSelector((store: any) => (store.authReducer.reg.reset));
    const auth = useSelector((store: any) => (store.authReducer.reg.login));
    const onChange = (e: { target: { name: string; value: string; }; }) => {
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
    if (!isEmail || isEmail==='false') {
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