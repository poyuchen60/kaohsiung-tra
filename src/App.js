import React, { Component } from 'react';
import './App.css';
import TRAApi from './TRAApi';

import RouteSelector from './components/RouteSelector';
import StationInfo from './components/StationInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '高雄',
      destination: '',
      routes: [],
      loading: false
    }
  }

  componentDidMount = async () => {
    this.handleStationDataLoad();
  }

  handleSwap = () => {
    const { start, destination } = this.state;
    destination
    && this.setState(
      {start: destination, destination: start, loading: true},
      this.handleStationDataLoad
    );
  }

  handleSelectorChange = ({target: {name, value}}) =>
    this.setState(
      {[name]: value, loading: true},
      this.handleStationDataLoad
    );

  handleStationDataLoad = async () => {
    const { start, destination } = this.state;
    const routes = destination
      ? await TRAApi.getTrainsByRouteName(start, destination)
      : await TRAApi.getTrainsByStationName(start);
    this.setState({routes, loading: false});
  }

  render() {
    const { start, destination, routes, loading } = this.state;
    const { handleSelectorChange, handleSwap } = this;
    return (
      <div className="App">
        <RouteSelector
          start={start} destination={destination}
          onChange={handleSelectorChange}
          onSwap={handleSwap}
        />
        <StationInfo
          loading={loading}
          start={start} destination={destination}
          routes={routes}
        />
      </div>
    );
  }
}

export default App;
