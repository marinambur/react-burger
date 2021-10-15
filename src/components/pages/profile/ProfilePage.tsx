import React, {useCallback, useState} from 'react';
import styles from './profile.module.css';
import {NavLink, useHistory} from 'react-router-dom';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {loginRequest, logoutRequest, registerRequest, userChangeRequest} from "../../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {deleteCookie, getCookie} from "../../utils";
function ProfilePage() {
    const inputRef = React.useRef(null);
    const [form, setFormValue] = useState({ name: '', login: '', password: '' });

    const onChange = (e: { target: { name: any; value: any; }; }) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const history = useHistory();
    const onIconClick = () => {
        // @ts-ignore
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    const signOut = async () => {
        dispatch(logoutRequest());
        deleteCookie('refreshToken');
    };
    const returnForm = () => {
        setFormValue({ name: '', login: '', password: '' })
    }
    let logout = useCallback(
        e => {
            e.preventDefault();
            signOut().then(() => {
                history.replace({ pathname: '/login' });
            });

        },
        [signOut, history]
    );
    let saveUser = useCallback(
        e => {
            e.preventDefault();
            dispatch(userChangeRequest(form)) ;

        },
        [ form, registerRequest]
    );

    return (
        <div className={styles.container}>
            <div className={`${styles.left} mr-15`}>
                <NavLink
                    to={{ pathname: `/profile` }} exact
                    className={`${styles.navLink} text text_type_main-medium`}
                    activeClassName={styles.activeLink}
                >Профиль</NavLink>
                <NavLink
                    to={{ pathname: `/profile/orders` }} exact
                    className={`${styles.navLink} text text_type_main-medium`}
                    activeClassName={styles.activeLink}
                >История заказов</NavLink>
                <Button onClick={logout} type={'secondary'} size={'large'}
                >Выход</Button>
            </div>
            <div className={styles.right}>
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
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={onChange}
                        value={form.login}
                        name={'login'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                <Button onClick={saveUser} type={'primary'} size={'large'}
                >Сохранить</Button>
                <Button onClick={returnForm} type={'primary'} size={'large'}
                >Отмена</Button>
            </div>
        </div>

    );
}

export default ProfilePage;