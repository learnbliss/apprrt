import React from 'react';
import styles from './App.module.scss'
// import Login from '../Login/Login';
import Journal from '../Journal/Journal';
import Head from '../Head/Head';
import {Switch, Route} from 'react-router-dom';
import Weather from '../Weather/Weather';
import NotFound404 from '../NotFound404/NotFound404';

const App = () => {
    return (
        <div className={styles.app}>
            <div className={styles.wrapp}>
                <Head><title>App</title></Head>
                {/*<Login/>*/}
                <Switch>
                    <Route exact path={'/'} component={Journal}/>
                    <Route path={'/weather'} component={Weather}/>
                    <Route path='/' component={NotFound404}/>
                </Switch>
            </div>
        </div>
    )
}

export default App;
