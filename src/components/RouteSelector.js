import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';

import Swap from '@material-ui/icons/SwapHoriz';

const styles = ({
  formControl: {
    minWidth: '100px'
  },
  container: {
    padding: '12px 0px',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '8px'
  },
  button: {
    alignSelf: 'center',
    fontSize: '50px',
    padding: '0 10px'
  }
})

const stations = [
  '臺南', "新左營", "左營", "內惟", "美術館", "鼓山", "三塊厝",
  "高雄", "民族", "科工館", "正義", "鳳山", '屏東'
]

const RouteSelector = props => {

    const {
      classes,
      start, destination,
      onChange, onSwap
    } = props;

    return <Paper elevation={1} className={classes.container}>
      <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            htmlFor="start"
          >
            起站
          </InputLabel>
          <Select
            value={start}
            onChange={onChange}
            input={
              <OutlinedInput
                labelWidth={30}
                name="start"
                id="start"
              />
            }
          >
          { stations.map( (s, i) => s !== destination && <MenuItem key={i} value={s}>
            {s}
          </MenuItem>) }
          </Select>
        </FormControl>

        <Button onClick={onSwap} className={classes.button}>
          <Swap fontSize='large' />
        </Button>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            htmlFor="destination"
          >
            迄站
          </InputLabel>
          <Select
            value={destination}
            onChange={onChange}
            input={
              <OutlinedInput
                labelWidth={30}
                name="destination"
                id="destination"
              />
            }
          >
            <MenuItem value="">
              <em>無</em>
            </MenuItem>
            { stations.map( (s, i) => s !== start && <MenuItem key={i} value={s}>
              {s}
            </MenuItem>) }
          </Select>
        </FormControl>
    </Paper>
}

export default withStyles(styles)(RouteSelector);