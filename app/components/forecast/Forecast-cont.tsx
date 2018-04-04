import * as React from "react";
import {observer} from 'mobx-react';
import {WeatherFull, WeatherPeriod} from '../../store/Store.d';

export interface ForecastContProps { weather: WeatherFull }

export class ForecastCont extends React.Component<ForecastContProps, {}> {
    render() {
        return <div>Test</div>
    }
}