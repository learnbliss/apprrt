import React from 'react';
import styles from './App.module.scss'
import Login from '../Login/Login';

const App = () => {
  return (
      <div className={styles.app}>
        <Login/>
      </div>
  )
}

export default App;
