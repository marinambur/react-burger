import React from 'react';
import styles from'./AppHeader.module.css';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import classNames from "classnames";

function AppHeader() {
    const isConstructor = !!useRouteMatch({ path: '/', exact: true});
    // const isFeed = !!useRouteMatch('/feed');
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
                    <a href="#" className={styles.menuButton}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default pl-2 text_color_inactive">
                            Лента заказов
                        </p>
                    </a>
                </nav>
                <a href="/">
                    <Logo />
                </a>
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