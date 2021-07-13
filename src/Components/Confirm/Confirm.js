import React from 'react';
import styles from './Confirm.module.scss'

const Confirm = ({positiveFn, negativeFn}) => {
    return (
        <div className={styles.root}>
            <span>Вы точно хотите удалить запись?</span>
            <div className={styles.buttons}>
                <button onClick={positiveFn}>Да</button>
                <button onClick={negativeFn}>Нет</button>
            </div>
        </div>
    );
};

export default Confirm;
