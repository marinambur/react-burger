
import React from 'react';
import styles from './forgot-password.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

export function ForgotPasswordPage() {
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef(null);
    // @ts-ignore
    const auth = useSelector(store => (store.burgerCartReducer.reg.login));
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
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'name'}
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