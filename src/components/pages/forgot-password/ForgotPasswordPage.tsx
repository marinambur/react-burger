
import React, {useCallback, useState} from 'react';
import styles from './forgot-password.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordRequest, userChangeRequest} from "../../../services/actions";

export function ForgotPasswordPage() {
    const [form, setFormValue] = useState({ email: '' });
    const inputRef = React.useRef(null);
    const dispatch = useDispatch();
    // @ts-ignore
    const auth = useSelector(store => (store.burgerCartReducer.reg.login));
    // @ts-ignore
    const email = useSelector(store => (store.burgerCartReducer.reg.forgotSuccess));
    const history = useHistory();
    const onChange = (e: { target: { name: any; value: any; }; }) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };
    let sendEmail = useCallback(
        e => {
            e.preventDefault();
            dispatch(forgotPasswordRequest(form)) ;
            if(!email) {
                history.replace({ pathname: '/reset-password' });
            }
        },
        [ form, forgotPasswordRequest]
    );
    if (email) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password'
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
            <form className={styles.form}>
                <h1  className={`${styles.heading} mb-6`}>Восстановление пароля</h1>

                <div className={'mb-6'}>
                    <Input
                        type={'text'}
                        placeholder={'Укажите e-mail'}
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-20'}>
                    <Button type="primary" size="large" onClick={sendEmail}>
                        Восстановить
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