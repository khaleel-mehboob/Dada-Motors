import React from 'react';
import { reduxForm, Field } from 'redux-form';
import validateEmail from '../../utils/validateEmail';
import customField from '../custom/CustomField';
import SubscribeButton from './SubscribeButton';

const Subscribe = (props) => {
  const { input, error, valid, pristine, submitting} = props;
 
  return (
    <div className='container' style={{ padding: '150px 150px'}}>
      <form>
        <div>
          <Field {...input} label='Enter email address' type='email' name='email' component={customField} />
        </div>
        {error && <strong>{error}</strong>}
      </form>
      <SubscribeButton disabled={!valid || pristine || submitting } />
    </div>
  );
}

function validate({ email }) {
  const errors = {};
  
  errors.email = validateEmail(email);

  if(!email) {
    errors.email = 'Email required';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'subscriptionForm'
})(Subscribe);