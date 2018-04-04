import * as React from "react";
import {observer} from 'mobx-react';
import {AppState} from '../../store/Store';
import * as styles from './Weather.css';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import {ForecastCont} from '../../components/forecast/forecast-cont';


const dataSourceConfig = {
  text: 'name',
  value: 'id',
};

@observer
export class WeatherForecast extends React.Component<{state: AppState}, {}> {

  render() {
    return (
      <div className={styles.weather}>
        <AppBar title="" />
        <div className={styles.contentCont}>
          <AutoComplete
              hintText="Type city, i.e. Warszawa"
              dataSource={this.props.state.entriesList}
              onUpdateInput={value => this.props.state.updateSearchInputVal(value)}
              dataSourceConfig={dataSourceConfig}
              onNewRequest={(value, idx) => this.props.state.fetchWeather(value.id)}
              fullWidth={true}
          />
          <ForecastCont weather={this.props.state.weather} /> 
        </div>

      </div>
      
    )
  }
  componentDidMount() {
    this.props.state.fetchCities();
  }
}