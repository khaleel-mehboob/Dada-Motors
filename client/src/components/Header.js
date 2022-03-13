import React, { Component } from 'react';
import {BrowserRouter, Route } from "react-router-dom"
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <a className='btn' href='/'>Collection</a>
          </li>,
          <li key="2">
            <a className='btn' href='/subscribe'>Subscribe</a>
          </li>,
          // <li key="3"><a href="/api/v1/auth/temp_login">Login</a></li>
          <li key="3" style={{ marginRight: '10px' }}><a href="/login">Login</a></li>
        ]; 
      default:
        return [
          <li key="1">
            <a className='btn' href='/vehicles'>Vehicles</a>
          </li>,
          <li key="2">
            <a className='btn' href='/subscribers'>Subscribers</a>
          </li>,
          <li key="3" style={{ marginRight: '10px' }}><a href="/api/v1/auth/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <BrowserRouter>
            <Route>
              <a 
                href={this.props.auth ? '/vehicles' : '/'} 
                className='left brand-logo'
                style={{ marginLeft: '10px' }}
              >
                Dada Motors
              </a>
            </Route>
            <Route>
              <ul className='right'>
                {this.renderContent()}
              </ul>
            </Route>
          </BrowserRouter>
        </div>
      </nav>
    );
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);