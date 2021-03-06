import React from 'react';
import styles from'./AppHeader.module.css';
import { useRouteMatch } from 'react-router-dom';
import {BurgerIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import classNames from "classnames";

function AppHeader() {
    const isConstructor = !!useRouteMatch({ path: '/', exact: true});
    const isFeed = !!useRouteMatch('/feed');
    const isProfile = !!useRouteMatch('/profile');
    return (
        <header className={`${styles.header} mb-10`}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.menuButton}>
                        <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
                        <p className={classNames('text text_type_main-default pl-2', {'text_color_inactive' : !isConstructor})}>
                            Конструктор
                        </p>
                    </Link>
                    <Link to="/feed" className={styles.menuButton}>
                        <ProfileIcon type={isFeed ? 'primary' : 'secondary'} />
                        <p className={classNames('text text_type_main-default pl-2', {'text_color_inactive' : !isFeed})}>
                            Лента заказов
                        </p>
                    </Link>
                </nav>
                <Link to="/">
                    <Logo />
                </Link>
                <Link to="/profile" className={styles.menuButton}>
                    <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
                    <p className={classNames('text text_type_main-default pl-2', {'text_color_inactive' : !isProfile})}>
                        Личный кабинет
                    </p>
                </Link>
            </div>


        </header>

    );
}

export default AppHeader;