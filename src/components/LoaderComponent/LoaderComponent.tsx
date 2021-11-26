import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./LoaderComponent.module.css"
import Loader from "react-loader-spinner";
export const LoaderComponent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <Loader
                    type="Puff"
                    color="#4c4cff"
                    height={300}
                    width={300}
                    timeout={90000} //90 secs
                />
            </div>

        </div>
    );
};
