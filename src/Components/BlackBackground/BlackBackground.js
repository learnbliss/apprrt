import React from 'react';
import styles from './BlackBackground.module.scss'

const BlackBackground = ({dark = false}) => {
    return (
        <>
            {dark ? <div className={styles.dark}/> : null}
        </>
    );
};

export default BlackBackground;
