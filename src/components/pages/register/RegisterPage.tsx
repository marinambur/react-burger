
import React, {useCallback, useRef, useState} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styles from './register.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {registerRequest} from "../../../services/actions/auth";



export function RegisterPage() {

    const inputRef = useRef(null);
    const [form, setFormValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((store: any) => (store.authReducer.reg.login));

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };

    const register = useCallback(
        e => {
            e.preventDefault();
            dispatch(registerRequest(form)) ;
            history.replace({ pathname: '/login' });

        },
        [ form, registerRequest]
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
            <form onSubmit={register} className={styles.form}>
                <h1  className={`${styles.heading} mb-6`}>Регистрация</h1>
                <div className={'mb-6'}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        value={form.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-6'}>
                    <EmailInput onChange={onChange} value={form.email} name={'email'} />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                <div className={'mb-20'}>
                    <Button type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Уже зарегистрированы?
                    <Link className={`${styles.span} text text_type_main-default`} to='/login'>
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
}