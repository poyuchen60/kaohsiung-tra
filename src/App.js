import React, { Component } from 'react';
import './App.css';
import TRAApi from './TRAApi';

import RouteSelector from './components/RouteSelector';
import StationInfo from './components/StationInfo';
import TrainDetail from './components/TrainDetail';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = ({
  dialog: {
    margin: '48px',
    height: 'calc(100% - 96px)'
  },
  fullScreen: {
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '高雄',
      destination: '',
      routes: [],
      loading: false,
      trainInfoOpen: false,
      train: undefined
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
    const { classes, fullScreen } = this.props;
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
          classes={{paper: classes[fullScreen?'fullScreen':'dialog']}}
          fullWidth
          fullScreen={fullScreen}
          open={trainInfoOpen}
          onClose={handleTrainInfoClose}
          aria-labelledby="train-info"
        >
          { train ? <TrainDetail
            key={train.TrainNo}
            start={start}
            id={train.TrainNo}
            type={train.TrainTypeName}
            onClose={handleTrainInfoClose}
          /> : <div>Nothing</div> }
        </Dialog>
      </div>      
    );
  }
}

export default withStyles(styles)(withMobileDialog()(App));
