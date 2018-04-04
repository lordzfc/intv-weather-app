import * as React from "react";
import {observer} from 'mobx-react';
import {WeatherFull, WeatherPeriod} from '../../store/Store.d';
import {ForecastTile} from './Forecast-tile';
import * as styles from './Forecast.css';

export interface ForecastContProps { weather: WeatherFull }

export class ForecastCont extends React.Component<ForecastContProps, {}> {
  render() {
    let weather; 
    if(this.props.weather) {
      weather = (
        <React.Fragment>
          <h3 className={styles.componentsTitle}> Forecast </h3>
          {this.props.weather.list.map(
            (e)=><ForecastTile key={e.dt} weatherPeriod={e}/>
          )}
        </React.Fragment>
      )
    }
    return <div>
      {weather}
    </div>
  }
}