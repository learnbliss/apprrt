import React from 'react';
import styles from './Head.module.scss'
import {Link} from 'react-router-dom';

const Head = () => {
    return (
        <div className={styles.root}>
            <Link to={'/'}>Журнал</Link>
            <Link to={'/weather'}>Погода</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    );
};

export default Head;
