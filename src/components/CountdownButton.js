import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = ({
  secend: {
    color: '#d0d0d0',
    marginLeft: '5px',
    paddingTop: '2px',
    width: '16px'
  }
})

class CountdownButton extends Component {
  constructor(props) {
    super(props);
    this.timer = undefined;
    this.state =  {
      counter: 30,
    }
  }

  componentDidMount = () => {
    this.timer = setInterval(this.handleCountdown, 1000);
  }
  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  handleCountdown = () => {
    const { counter } = this.state;
    const { loading } = this.props;
    !loading && counter !== 0
      ? this.setState({counter: counter - 1})
      : this.handleUpdateAndReset()
  }

  handleUpdateAndReset = () => {
    const { onClick } = this.props;
    this.setState({counter: 30}, onClick);
  }

  render() {
    const { classes } = this.props;
    const { handleUpdateAndReset } = this;
    const { counter } = this.state;
    return <Button onClick={handleUpdateAndReset}>
      {"更新"}
      <span className={classes.secend}>{counter}</span>
    </Button>
  }
}

export default withStyles(styles)(CountdownButton);