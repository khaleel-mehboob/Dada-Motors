import React from 'react';
import { reduxForm, Field } from 'redux-form';
import customField from '../custom/CustomField';
import customPassword from '../custom/CustomPassword';
import validateEmail from '../../utils/validateEmail';
import LoginButton from './LoginButton';

const LoginForm = (props) => {
  
  const { input, error, valid, pristine, submitting} = props;

  return (
    <div className='container' style={{ padding: '150px 150px'}}>
      <form>
        <div>
          <Field {...input} label='Email Address' type='email' name='email' component={customField} />
          <Field {...input} label='Password' type='password' name='password' component={customPassword} />
        </div>
        {error && <strong>{error}</strong>}
      </form>
      <LoginButton disabled={!valid || pristine || submitting } />
    </div>
  );
};

function validate(values) {
  const errors = {};
  
  errors.email = validateEmail(values.email);
  
  if(!values.email) {
    errors.email = 'Email required';
  }
  
  if(!values.password) {
    errors.password = 'Password required';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'loginForm',
})(LoginForm);