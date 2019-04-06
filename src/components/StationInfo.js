import React, { Component } from 'react';
import TrainInfo from './TrainInfo';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = ({
  container: {
    padding: '7px'
  },
  loadingHolder: {
    height: '288px',
    backgroundColor: '#eaeaea',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class StationInfo extends Component {


  render() {
    const { classes, routes, start, destination, loading } = this.props;

    return <Paper elevation={1} className={classes.container}>
      <Typography variant="h5" gutterBottom align='left'>
        { `從 ${start} 出發` }
      </Typography>
      { loading
        ? <div className={classes.loadingHolder}>Loading...</div>
        : routes.map( ({title, trains}) =>
        <TrainInfo
          key={`${start}#${title}`}
          title={title}
          trains={trains}
          destination={destination}
        />)
      }
    </Paper>
  }
}


export default withStyles(styles)(StationInfo);