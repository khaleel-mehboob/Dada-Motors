import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SubscribeButton = ({disabled, subscriptionFormValues, history, submitSubscription}) => {
  return (
    <button
      disabled={disabled}
      className='teal btn-flat white-text'
      onClick={() => submitSubscription(subscriptionFormValues, history)}
    >
      Subscribe
      <i className='material-icons right'>done</i>
    </button>
  );
};

function mapStateToProps(state) {
  return {
    subscriptionFormValues: state.form.subscriptionForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SubscribeButton));