import * as React from "react";
import {observer} from 'mobx-react';
import {WeatherPeriod} from '../../store/Store.d';

export interface ForecastTileProps { weatherPeriod: WeatherPeriod }

export class ForecastTile extends React.Component<ForecastTileProps, {}> {
    render() {
        return <div>Test</div>
    }
}