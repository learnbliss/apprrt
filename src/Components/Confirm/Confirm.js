import React from 'react';
import styles from './Confirm.module.scss'
import KeyDownEscape from '../KeyDownEscape/KeyDownEscape';

const Confirm = ({positiveFn, negativeFn, condition}) => {
    return (
        <div className={styles.root}>
            <span>Вы точно хотите удалить запись?</span>
            <div className={styles.buttons}>
                <button onClick={positiveFn} disabled={condition}>Да</button>
                <button onClick={negativeFn} disabled={condition}>Нет</button>
            </div>
            <KeyDownEscape doIt={negativeFn}/>
        </div>
    );
};

export default Confirm;
