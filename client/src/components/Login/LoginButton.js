import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const LoginButton = ({disabled, loginFormValues, history, login}) => {
  return (
    <button
      className='teal btn-flat white-text'
      onClick={() => login(loginFormValues, history)}
      disabled={disabled}
    >
      Login
      <i className='material-icons right'>done</i>
    </button>
  );
};

function mapStateToProps(state) {
  return {
    loginFormValues: state.form.loginForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(LoginButton));