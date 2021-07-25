import React from 'react';
import styles from './App.module.scss'
// import Login from '../Login/Login';
import Journal from '../Journal/Journal';
import Head from '../Head/Head';
import {Switch, Route, Redirect} from 'react-router-dom';
import Weather from '../Weather/Weather';
import NotFound404 from '../NotFound404/NotFound404';
import Login from '../Login/Login';

const App = () => {
    return (
        <div className={styles.app}>
            <div className={styles.wrapp}>
                <Head><title>App</title></Head>
                <Switch>
                    <Redirect exact from="/" to="/journal" />
                    <Route exact path={'/journal'} component={Journal}/>
                    <Route exact path={'/weather'} component={Weather}/>
                    <Route exact path={'/login'} component={Login}/>
                    <Route path='*' component={NotFound404}/>
                </Switch>
            </div>
        </div>
    )
}

export default App;
