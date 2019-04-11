import React, { Component } from 'react';
import TRAApi from '../TRAApi';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import WheelIcon from '@material-ui/icons/Accessible';
import DailyIcon from '@material-ui/icons/Train';
import FeedingIcon from '@material-ui/icons/PregnantWoman';
import CloseIcon from '@material-ui/icons/Close';


const styles = ({
  content: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3px 0',
    padding: '0 10px'
  },
  loadingHolder: {
    position: 'absolute',
    zIndex: 5,
    backgroundColor: '#eaeaea',
    top: 0,
    left: 0,
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    borderRadius: '5px'
  },
  header: {
    padding: '0 10px'
  },
  stations: {
    flex: 1,
    overflow: 'auto',
    margin: 0,
    padding: '0',
    listStyle: 'none',
    '& li': {
      height: '30px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      alignItems: 'center',
      padding: '0 10px'
    },
    '& .title': {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white'
    },
    '& .passed': {
      color: '#a0a0a0'
    },
    '& #train-start': {
      backgroundColor: 'rgb(210, 247, 211)'
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
    this.setState({loading: false, train}, this.scrollToView);
  }

  scrollToView = () => {
    document.getElementById('train-start').scrollIntoView(false);
  }

  render() {
    const { classes, id, type, onClose, start } = this.props;
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
    return <>
      <div className={classes.title}>
        <Typography variant="h5">
          {`${id} ${type}`}
        </Typography>
        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </div>
      
      <div className={classes.content}>
        { loading
          ? <div className={classes.loadingHolder}>{'Loading'}</div>
          : <>
            <div className={classes.header}>
              <Typography variant="h6" gutterBottom>
                {`${StartingStationName}  >>  ${EndingStationName} ~ ${TripLine}`}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {`${Note}`}
              </Typography>
              <div>
                { DailyFlag  && <DailyIcon /> }
                { WheelchairFlag && <WheelIcon /> }
                { BreastFeedingFlag && <FeedingIcon /> }
              </div>
            </div>
            <ul className={classes.stations}>
              <li className='title'>
                <div>站名</div>
                <div>到站</div>
                <div>離站</div>
                <div>狀態</div>
              </li>
              { StopTimes.map( (s,i) => {
                  const isStart = s.StationName === start;
                  const passed = i <= lastIndex;
                  const delayText = i === lastIndex + 1
                    ? (DelayTime === 0 ? '準點' : `晚${DelayTime}分`) : ''
                  return <li
                    key={i}
                    id={isStart ? 'train-start' : undefined}
                    className={passed ? 'passed' : undefined}
                  >
                    <div>{s.StationName}</div>
                    <div>{s.ArrivalTime}</div>
                    <div>{s.DepartureTime}</div>
                    <div>{passed ? '已過站' : delayText}</div>
                  </li>
                }
              )}
            </ul>
          </>
        }
      </div>
    </>
  }
}

export default withStyles(styles)(TrainDetail);