import React, {useEffect} from 'react';
import styles from './Weather.module.scss'
import {connect} from 'react-redux';
import {getCoordinates} from '../../redux/actions';
import {
    dataWeatherSelector,
    errorWeatherSelector,
    sunriseTimeSelector,
    sunsetTimeSelector
} from '../../redux/selectors';
import Loader from '../Loader/Loader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

const Weather = ({getCoordinates, errorWeather, dataWeather, sunriseTime, sunsetTime}) => {
    useEffect(() => {
        getCoordinates()
    }, []); //eslint-disable-line

    if (!errorWeather && !dataWeather) return <Loader/>

    return (
        <div>
            <h1>Погода</h1>
            <div className={styles.wrapLabel}>
                <label className={styles.label}>
                    <span><b>Введите название города</b></span>
                    <input type={'text'}/>
                </label>
            </div>
            <hr className={styles.hline}/>
            {errorWeather ?
                <div>Не удалось определить местоположение (
                    <span className={styles.error}>{errorWeather.message}</span>
                    )</div> : null}
            {dataWeather && <div className={styles.data}>
                <div className={styles.unit}><b>Ваше местоположение: </b>{dataWeather.name}</div>
                <div className={styles.unit}><b>Температура воздуха: </b>{(dataWeather.main.temp).toFixed()}℃
                    (ощущается {(dataWeather.main.feels_like).toFixed()}℃)
                </div>
                <div className={styles.unit}><b>Влажность: </b>{dataWeather.main.humidity}%</div>
                <div className={styles.unit}><b>Высота над уровнем моря: </b>{dataWeather.main.sea_level} метров</div>
                <div className={styles.sun}>
                    <div><b>Восход: </b>{sunriseTime}</div>
                    <div><b>Закат: </b>{sunsetTime}</div>
                </div>
            </div>}
        </div>
    );
};

export default withAuthRedirect(connect(state => ({
    errorWeather: errorWeatherSelector(state),
    dataWeather: dataWeatherSelector(state),
    sunriseTime: sunriseTimeSelector(state),
    sunsetTime: sunsetTimeSelector(state)
}), {getCoordinates})(Weather));
