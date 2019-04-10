import React, { Component } from 'react';
import TRAApi from '../TRAApi';

import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
import WheelIcon from '@material-ui/icons/Accessible';
import DailyIcon from '@material-ui/icons/Train';
import FeedingIcon from '@material-ui/icons/PregnantWoman';


const styles = ({
  container: {
    position: 'relative',
  },
  loadingHolder: {
    position: 'absolute',
    zIndex: 5,
    backgroundColor: '#eaeaea',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stations: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '& li': {
      height: '30px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr'
    },
    '& .title': {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white'
    }
  }
})

class TrainDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      train: {},
    }
  }
  
  componentDidMount = async () => {
    const { id } = this.props;
    const train = await TRAApi.getTrainDetailById(id);
    this.setState({loading: false, train});
  }

  render() {
    const { classes, id } = this.props;
    const {
      train: {
        StartingStationName, EndingStationName,
        WheelchairFlag, BreastFeedingFlag, DailyFlag,
        TripLine, Note,
        StopTimes, DelayTime, LastStationName,
      }, loading
    } = this.state;
    const lastIndex = LastStationName
      ? StopTimes.findIndex( s => s.StationName === LastStationName)
      : -2;
    console.log(lastIndex, StopTimes, LastStationName);
    return <>
      {
        loading && 
          <div className={classes.loadingHolder}>{'Loading'}</div>
      }
      <DialogTitle id="train-info-title">
        <div>{`${id}`}</div>
        {
          !loading && <div className={classes.header}>
            <Typography variant="h6" gutterBottom>
              {`${StartingStationName}  >>  ${EndingStationName}`}
            </Typography>
            <div>
              { DailyFlag && <DailyIcon /> }
              { WheelchairFlag && <WheelIcon /> }
              { BreastFeedingFlag && <FeedingIcon /> }
            </div>
          </div>
        }
      </DialogTitle>
      <DialogContent className={classes.container}>
        { 
          !loading && <ul className={classes.stations}>
            <li className='title'>
              <div>站名</div>
              <div>到站</div>
              <div>離站</div>
              <div>狀態</div>
            </li>
            { StopTimes.map( (s,i) => <li key={i}>
                <div>{s.StationName}</div>
                <div>{s.ArrivalTime}</div>
                <div>{s.DepartureTime}</div>
                <div>{
                  i <= lastIndex
                    ? '已過站'
                    : i === lastIndex + 1 ? (DelayTime === 0 ? '準點' : `晚${DelayTime}分`) : ''
                }</div>
              </li>
            )}
          </ul>
        }
      </DialogContent>
    </>
  }
}

export default withStyles(styles)(TrainDetail);