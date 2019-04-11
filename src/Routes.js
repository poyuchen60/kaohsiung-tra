import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';


const Routes = (props) => {
  return <Switch>
    <Route exact path='/' component={App}/>
  </Switch>
}

export default Routes;