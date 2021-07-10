import React from 'react';
import styles from './Loader.module.scss'

const Loader = (props) => {
    return (
        <div className={styles.root}>
            <div className={styles.ldsSpinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
