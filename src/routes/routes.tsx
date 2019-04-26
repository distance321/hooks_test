import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from '../page/home/index'

const BasicRoute = () => (
  <Router>
        <Switch>
            <Route path='/' exact  render={() => {
                //在这里可以做一些权限验证
                return <Redirect to='/home' />
              }} />
            <Route exact path="/home" component={Home}/>
        </Switch>
    </Router>
)

export default BasicRoute