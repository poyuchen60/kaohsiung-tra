import React, { Component } from 'react';
import TrainInfo from './TrainInfo';
import CountdownButton from './CountdownButton';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import ShareIcon from '@material-ui/icons/Share';

const styles = ({
  container: {
    padding: '7px'
  },
  main: {
    position: 'relative',
    '& .trains': {
      backgroundColor: '#eaeaea',
      borderRadius: '5px'
    },
    '& .share': {
      position: 'absolute',
      right: '5px',
      top: '5px'
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

  constructor(props) {
    super(props);
    this.timeout = undefined;
    this.state = {
      open: false
    }
  }

  handleTooltipClose = () => this.setState({open: false});
  handleShareClick = () => {
    this.props.onCopy();
    this.setState({open: true}, () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.handleTooltipClose, 1000);
    });
  }

  render() {
    const { open } = this.state;
    const { handleShareClick, handleTooltipClose } = this;
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
        { loading
          && <div className={classes.loadingHolder}>Loading...</div>
        }
        <div className="trains">
        { routes.length > 0
          && <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            placement="left"
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="已複製連結"
          >
            <Button onClick={handleShareClick} className='share'>
              <ShareIcon fontSize='small'/>
            </Button>
          </Tooltip>
        }
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