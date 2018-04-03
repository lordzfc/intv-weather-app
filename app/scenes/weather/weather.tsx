import * as React from "react";
import {observer} from 'mobx-react';
import {AppState} from '../../store/Store';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const dataSourceConfig = {
  text: 'name',
  value: 'id',
};

@observer
export class WeatherForecast extends React.Component<{state: AppState}, {}> {

  render() {
    return (
      <MuiThemeProvider>
      <AutoComplete
          hintText="Type anything"
          dataSource={this.props.state.entriesList}
          onUpdateInput={value => this.props.state.updateSearchInputVal(value)}
          dataSourceConfig={dataSourceConfig}
      />

      </MuiThemeProvider>
      
    )
  }
  componentDidMount() {
    this.props.state.fetchCities();
  }
}