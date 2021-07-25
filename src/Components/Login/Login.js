import React, {useEffect, useState} from 'react';
import styles from './Login.module.scss';
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {auth, autoLogin} from '../../redux/actions';
import {Redirect} from 'react-router-dom';
import {isAuthSelector, requestAuthSelector} from '../../redux/selectors';

const Login = ({auth, isAuth, autoLogin, request}) => {
    const {register, handleSubmit, formState} = useForm({
        mode: 'onBlur'
    });
    const [isLogin, setIsLogin] = useState();

    useEffect(() => {
        autoLogin()
    }, []); //eslint-disable-line

    if (isAuth) {
        return <Redirect to={'/journal'}/>
    }

    const preSubmit = (bool) => {
        const error = Object.keys(formState.errors).length
        if (error > 0) return;
        setIsLogin(bool);
        onSubmit()
    }

    const onSubmit = (userData) => {
        if (!userData) return;
        auth(userData, isLogin)
    }

    return (
        <div className={styles.root}>
            <h1>Авторизация</h1>
            <form className={styles.head} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>
                    <span>{'Email'}</span>
                    <input type={'email'} {...register('email', {required: true, pattern: /^\S+@\S+\.\S+$/})} />
                    {formState.errors.email?.type === 'required' &&
                    <span className={styles.error}>Email is required</span>}
                    {formState.errors.email?.type === 'pattern' &&
                    <span className={styles.error}>Email is not valid</span>}
                </label>
                <label className={styles.label}>
                    <span>{'Password'}</span>
                    <input type={'password'} {...register('password', {required: true, minLength: 6})} />
                    {formState.errors.password?.type === 'required' &&
                    <span className={styles.error}>Password is required</span>}
                    {formState.errors.password?.type === 'minLength' &&
                    <span className={styles.error}>Password minimum 6 characters</span>}
                </label>
                <div className={styles.buttons}>
                    <button name={'signIn'} onClick={() => preSubmit(true)} type={'submit'} disabled={request}>Sign In</button>
                    <button name={'signUp'} onClick={() => preSubmit(false)} type={'submit'} disabled={request}>Sign Up</button>
                </div>
            </form>
        </div>
    )
};

export default connect(state => ({
    isAuth: isAuthSelector(state),
    request: requestAuthSelector(state),
}), {
    auth,
    autoLogin
})(Login);
