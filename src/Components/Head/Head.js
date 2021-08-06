import React from 'react';
import styles from './Head.module.scss'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {isAuthSelector, userEmailSelector} from '../../redux/selectors';
import {logout} from '../../redux/actions';

const Head = ({isAuth, email, logout}) => {
    return (
        <nav className={styles.root}>
            {isAuth &&
            <>
                <NavLink to={'/Journal'} activeClassName={styles.selected}>Журнал</NavLink>
                <NavLink to={'/weather'} activeClassName={styles.selected}>Погода</NavLink>
            </>}
            {isAuth ? <div className={styles.auth}>
                    <span className={styles.name}>Привет <b>'{email}'</b></span><NavLink onClick={logout}
                                                                                         to={'/login'}>Выйти</NavLink>
                </div>
                : <NavLink to={'/login'}>Необходимо войти в систему</NavLink>}
        </nav>
    );
};

export default connect(state => ({
    isAuth: isAuthSelector(state),
    email: userEmailSelector(state)
}), {
    logout
})(Head);
