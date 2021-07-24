import React, {useState} from 'react';
import styles from './Login.module.scss';
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {signIn, signUp} from '../../redux/actions';

const Login = ({signUp, signIn}) => {
    const {register, handleSubmit, formState} = useForm({
        mode: 'onBlur'
    });
    const [action, setAction] = useState(null);

    const preSubmit = (name) => {
        const error = Object.keys(formState.errors).length
        if (error > 0) return;
        setAction(name);
        onSubmit()
    }

    const onSubmit = (userData) => {
        if (!userData) return;
        switch (action) {
            case 'signUp':
                signUp(userData)
                break;
            case 'signIn':
                signIn(userData)
                break;
            default:
                return
        }
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
                    <button name={'signIn'} onClick={(e) => preSubmit(e.target.name)} type={'submit'}>Sign In</button>
                    <button name={'signUp'} onClick={(e) => preSubmit(e.target.name)} type={'submit'}>Sign Up</button>
                </div>
            </form>
        </div>
    )
};

export default connect(null, {
    signUp,
    signIn
})(Login);
