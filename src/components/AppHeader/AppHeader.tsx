import React from 'react';
import styles from'./AppHeader.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <header className={`${styles.header} mb-10`}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <a href="#" className={styles.menuButton}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default pl-2">
                         Конструктор
                        </p>
                    </a>
                    <a href="#" className={styles.menuButton}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default pl-2 text_color_inactive">
                            Лента заказов
                        </p>
                    </a>
                </nav>
                <a href="#">
                    <Logo />
                </a>
                <a href="#" className={styles.menuButton}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default pl-2 text_color_inactive">
                        Личный кабинет
                    </p>
                </a>
            </div>


        </header>

    );
}

export default AppHeader;