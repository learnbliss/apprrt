import React from 'react';
import styles from './Login.module.scss';
import {useForm} from 'react-hook-form';

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div>
            <h1>Авторизация</h1>
            <form className={styles.head} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>
                    <span>{'Email'}</span>
                    <input type={'email'} {...register('email', {required: true, pattern: /^\S+@\S+\.\S+$/})} />
                    {errors.email?.type === 'required' && <span className={styles.error}>Email is required</span>}
                    {errors.email?.type === 'pattern' && <span className={styles.error}>Email is not valid</span>}
                </label>
                <label className={styles.label}>
                    <span>{'Password'}</span>
                    <input type={'password'} {...register('password', {required: true, minLength: 6})} />
                    {errors.password?.type === 'required' && <span className={styles.error}>Password is required</span>}
                    {errors.password?.type === 'minLength' && <span className={styles.error}>Password minimum 6 characters</span>}
                </label>
                <div className={styles.buttons}>
                    <button type={'submit'}>Sign In</button>
                    <button type={'submit'}>Sign Up</button>
                </div>
            </form>
        </div>
    )
};

export default Login;
