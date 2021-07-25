import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {isAuthSelector} from '../redux/selectors';

export const withAuthRedirect = (Component) => {
    const HocComponent = (props) => {

        if (!props.isAuth) {
            return <Redirect to={'/login'}/>
        }

        return (
            <Component {...props}/>
        );
    };
    return connect(state => ({
        isAuth: isAuthSelector(state)
    }))(HocComponent);
};
