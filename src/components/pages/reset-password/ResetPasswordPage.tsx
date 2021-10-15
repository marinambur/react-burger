
import React from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

export function ResetPasswordPage() {
    const [value, setValue] = React.useState('');
    const [newPasswordValue, setNewPasswordValue] = React.useState('');
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
                        placeholder={'Введите новый пароль'}
                        onChange={e => setNewPasswordValue(e.target.value)}
                        value={newPasswordValue}
                        name={'name'}
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