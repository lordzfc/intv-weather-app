import * as React from "react";
import DevTools from 'mobx-react-devtools';
import { Hello } from "./components/hello/hello";
import {AppState} from './store/Store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {WeatherForecast} from './scenes/weather/weather';
const state = new AppState()

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component<{}> {
    render() {
        return <MuiThemeProvider>
            <WeatherForecast state={state} />
        </MuiThemeProvider>;
    }
}