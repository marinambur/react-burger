
import React, {useCallback, useState} from 'react';
import styles from './forgot-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "../../../types/types";
import {forgotPasswordRequest} from "../../../services/actions/auth";

export function ForgotPasswordPage() {
    const [form, setFormValue] = useState({ email: '' });
    const inputRef = React.useRef(null);
    const dispatch = useDispatch();
    const auth = useSelector((store: any) => (store.authReducer.reg.login));
    const email = useSelector((store: any) => (store.authReducer.reg.forgotSuccess));
    const history = useHistory();
    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };
    const sendEmail = useCallback(
        e => {
            e.preventDefault();
            dispatch(forgotPasswordRequest(form)) ;
            if(!email) {
                history.replace({ pathname: '/reset-password' });
            }
        },
        [ form, dispatch, email, history]
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
            <form className={styles.form} onSubmit={sendEmail}>
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
                    <Button type="primary" size="large">
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