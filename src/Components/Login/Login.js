import React from 'react';
import styles from './Login.module.scss';

const Login = () => {
    return (
        <div>
            <h1>Авторизация</h1>
            <div className={styles.head}>
                <label>
                    <span>Email</span>
                    <input/>
                </label>
                <label>
                    <span>Password</span>
                    <input/>
                </label>
                <div className={styles.buttons}>
                    <button>Sign In</button>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    )
};

export default Login;
