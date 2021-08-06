import React from 'react';
import styles from './Head.module.scss'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {isAuthSelector, userEmailSelector} from '../../redux/selectors';
import {logout} from '../../redux/actions';

const Head = ({isAuth, email, logout}) => {
    return (
        <div className={styles.root}>
            {isAuth && <Link to={'/'}>Журнал</Link>}
            {isAuth && <Link to={'/weather'}>Погода</Link>}
            {isAuth ? <div className={styles.auth}>
                    <span className={styles.name}>Привет <b>'{email}'</b></span><Link onClick={logout} to={'/login'}>Выйти</Link>
                </div>
                : <Link to={'/login'}>Необходимо войти в систему</Link>}
        </div>
    );
};

export default connect(state => ({
    isAuth: isAuthSelector(state),
    email: userEmailSelector(state)
}), {
    logout
})(Head);
