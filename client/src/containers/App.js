import React, { Component } from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom"
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from '../components/Header';
import LoginForm from '../components/Login/LoginForm';
import Vehicles from '../components/Vehicles/Vehicles';

import Subscribe from '../components/Subscriptions/Subscribe';
import VehicleDetail from '../components/Vehicles/VehicleDetail';
import VehicleNew from '../components/Vehicles/VehicleNew';
import Subscribers from '../components/Subscriptions/Subscribers';

class App extends Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Vehicles} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/vehicles" component={Vehicles} />
            <Route exact path ="/vehicles/new" component={VehicleNew} />
            <Route exact path ="/vehicle/:id" component={VehicleDetail} />
            <Route exact path ="/subscribers" component={Subscribers} />
            <Route exact path="/Subscribe" component={Subscribe} />
          </Switch>
        </BrowserRouter>
      </div>   
    );
  }
}

export default connect(null, actions)(App);