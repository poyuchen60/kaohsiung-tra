import React,{ Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ExpandIcon from '@material-ui/icons/ExpandMore';
import FoldIcon from '@material-ui/icons/ExpandLess';

const styles = ({
  constainer: {
    backgroundColor: '#eaeaea',
    padding: '5px'
  },
  trains: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '& li': {
      display: 'grid',
      gridTemplateColumns: '40px 60px 1fr 50px 60px',
      height: '30px'
    },
    '& li.title': {
      borderBottom: '1px solid gray',
      height: 'auto',
      paddingBottom: '5px',
      marginBottom: '5px',
    },
    '& li.folded': {
      display: 'none',
    },
    '& div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    '& div.center': {
      justifyContent: 'space-evenly'
    },
    '& div.left': {
      justifyContent: 'flex-start'
    },
    '& .clickable': {
      cursor: 'pointer'
    },
    '& button': {
      padding: 0,
      minWidth: 'auto'
    }
  }
})
const sort = function(){
  const trainTypeValue = ({
    "自強": 2, "太魯閣": 1, "普悠瑪": 0,
    "莒光": 3, "復興": 4, "區間快": 5, "區間車": 6, "普快車": 7
  })
  const sortByTrainType = (t1, t2) => 
    trainTypeValue[t1.TrainTypeName] - trainTypeValue[t2.TrainTypeName]
  const sortByDepartureTime = (t1, t2) => 
    t1.DepartureTime > t2.DepartureTime
      ? 1
      : t1.DepartureTime < t2.DepartureTime ? -1 : 0;
  return {
    TrainTypeName: sortByTrainType,
    DepartureTime: sortByDepartureTime
  }
}();
 
class TrainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folded: true,
      sortBy: 'DepartureTime'
    }
  }

  shouldComponentUpdate = (nextProps) => {
    const { destination } = this.props;
    return !(destination !== nextProps.destination);
  }

  handleExpand = () =>
    this.setState(({folded}) => ({folded: !folded}));
  
  handleSort = (sortBy) => () => this.setState({sortBy})
  
  render() {
    const { folded, sortBy } = this.state;
    const { classes, title, trains, destination, onOpenTrainInfo } = this.props;
    const { handleExpand, handleSort } = this;
    sort[sortBy] && trains.sort(sort[sortBy]);
    const length = destination ? 7 : 2;
    const hasMore = trains.length > length;
    return <div className={classes.constainer}>
      <Typography variant="h6" gutterBottom align='left'>
        {title}
      </Typography>
      <ul className={classes.trains}>
        <li className='title'>
          <div className='center'>車次</div>
          <div>
            <span
              className='clickable'
              onClick={handleSort('TrainTypeName')}
            >車種</span>
          </div>
          <div className='center'>
            <span
              onClick={handleSort('DepartureTime')}
              className='clickable'
            >開車</span>
            { destination && <span>抵達</span> }
          </div>
          <div className='left'>{destination ? "耗時" : "終點"}</div>
          <div className='center'>誤點</div>
        </li>
        { trains.map( (t, i) =><li
          key={i}
          className={ (i > length && folded) ? 'folded' : undefined }
        >
          <Button
            onClick={onOpenTrainInfo({
              TrainNo: t.TrainNo,
              Direction: t.Direction,
              TrainTypeName: t.TrainTypeName,
              Date: new Date()
            })}
          >{t.TrainNo}</Button>
          <div>{t.TrainTypeName}</div>
          <div className='center'>
            <span>{t.DepartureTime}</span>
            { destination && <span>{t.ArrivalTime}</span> }
          </div>
          <div className='left'>
            { destination ? t.EstimatedTime : t.EndingStationName }
          </div>
          <div className='center'>{
            isNaN(t.DelayTime)
            ? undefined
            : t.DelayTime === 0 ? '準點' : `${t.DelayTime}分`
          }</div>
        </li>) }
      </ul>
      { hasMore && <Button onClick={handleExpand} className={classes.button}>
          { folded ? "更多" : "摺疊" }
          { folded ? <ExpandIcon /> : <FoldIcon /> }
      </Button> }
    </div>
  }
}


export default withStyles(styles)(TrainInfo);