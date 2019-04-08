import React, { Component } from 'react';
import './App.css';
import TRAApi from './TRAApi';

import RouteSelector from './components/RouteSelector';
import StationInfo from './components/StationInfo';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '高雄',
      destination: '',
      routes: [],
      loading: false,
      trainInfoOpen: false,
      train: {}
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
  handleUpdate = () =>
    this.setState({loading: true}, this.handleStationDataLoad);

  handleTrainInfoClose = () => this.setState({trainInfoOpen: false});
  handleTrainInfoOpen = (train) => () => this.setState({trainInfoOpen: true, train});

  render() {
    const {
      start, destination,
      routes, loading,
      trainInfoOpen, train
    } = this.state;
    const {
      handleSelectorChange,
      handleSwap,
      handleTrainInfoClose,
      handleTrainInfoOpen,
      handleUpdate
    } = this;
    return (
      <div className="App">
        <RouteSelector
          start={start} destination={destination}
          onChange={handleSelectorChange}
          onSwap={handleSwap}
        />
        <StationInfo
          onUpdate={handleUpdate}
          loading={loading}
          start={start} destination={destination}
          routes={routes}
          onOpenTrainInfo={handleTrainInfoOpen}
        />
        <Dialog
          open={trainInfoOpen}
          onClose={handleTrainInfoClose}
          aria-labelledby="train-info"
        >
          <DialogTitle id="train-info-title">{train.TrainNo}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>      
    );
  }
}

export default App;
