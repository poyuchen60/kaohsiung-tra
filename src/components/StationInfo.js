import React, { Component } from 'react';
import TrainInfo from './TrainInfo';
import CountdownButton from './CountdownButton';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = ({
  container: {
    padding: '7px'
  },
  main: {
    position: 'relative',
    '& .trains': {
      backgroundColor: '#eaeaea',
      borderRadius: '5px'
    }
  },
  loadingHolder: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(234,234,234,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px'
  }
})

class StationInfo extends Component {


  render() {
    const {
      classes, routes, start, destination, loading,
      onOpenTrainInfo, onUpdate
    } = this.props;

    return <Paper elevation={1} className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h5" align='left'>
          { `從 ${start} 出發` }
        </Typography>
        <CountdownButton
          loading={loading}
          key={`${start}&${destination}`}
          onClick={onUpdate}
        />
      </div>
      <div className={classes.main}>
        { loading &&
          <div className={classes.loadingHolder}>Loading...</div>
        }
        <div className="trains">
        { routes.map( ({title, trains}) =>
          <TrainInfo
            key={`${start}#${title}`}
            title={title}
            trains={trains}
            destination={destination || ''}
            onOpenTrainInfo={onOpenTrainInfo}
          />)
        }
        </div>
      </div>
    </Paper>
  }
}


export default withStyles(styles)(StationInfo);