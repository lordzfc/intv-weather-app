import * as React from "react";
import {observer} from 'mobx-react';
import * as styles from './Forecast.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {WeatherPeriod} from '../../store/Store.d';

export interface ForecastTileProps { weatherPeriod: WeatherPeriod, city: string }

export class ForecastTile extends React.Component<ForecastTileProps, {}> {
    render() {
       let rain;
        return (
          <Card style={{padding: "30px", marginTop:"20px", marginBottom:"20px"}}>
            <CardTitle title={this.props.weatherPeriod.dt_txt} subtitle={this.props.weatherPeriod.weather[0].description} />
            <CardText>
              <img src={`https://openweathermap.org/img/w/${this.props.weatherPeriod.weather[0].icon}.png`} />
              <p><span className={styles.weatherLabel}> Temperature:</span> {this.props.weatherPeriod.main.temp} ℃</p>
              <p><span className={styles.weatherLabel}> Min Temperature:</span> {this.props.weatherPeriod.main.temp_min} ℃</p>
              <p><span className={styles.weatherLabel}> Max Temperature:</span> {this.props.weatherPeriod.main.temp_max} ℃</p>
              <p><span className={styles.weatherLabel}> Humidity:</span> {this.props.weatherPeriod.main.humidity} %</p>
              <p><span className={styles.weatherLabel}> Pressure:</span> {this.props.weatherPeriod.main.pressure} hPa</p>
              <p><span className={styles.weatherLabel}> Wind Speed: </span> {this.props.weatherPeriod.wind.speed} km/h</p>
            </CardText>
          </Card>);
    }
}