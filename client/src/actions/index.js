import axios from 'axios';

import { 
  FETCH_USER,
  GET_VEHICLE_LIST,
  GET_SUBSCRIBER_LIST
 } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/v1/auth/current_user')
  
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const login = (loginFormValues, history) => async dispatch => {
  const res = await axios.post('/api/v1/auth/login', loginFormValues)
  history.push('/vehicles');

  dispatch({
    type: FETCH_USER,
    payload: res.data.user
  });  
};

export const submitVehicle = (formValues, images, history) => async dispatch => {
  const obj = {...formValues, ...images};
  await axios.post('/api/v1/vehicles', obj);

  history.push('/vehicles');
};

export const getVehicleList = () => async dispatch => {
  const res = await axios.get('/api/v1/vehicles');

  dispatch({
    type: GET_VEHICLE_LIST,
    payload: res.data
  });
};

export const deleteVehicle = (value, history) => async dispatch => {
   
  let res = await axios.delete(`/api/v1/vehicles/${value}`);
  res = await axios.get('/api/v1/vehicles');

  dispatch({
    type: GET_VEHICLE_LIST,
    payload: res.data
  });
};

export const submitSubscription = (values, history) => async dispatch => {
  await axios.post('/api/v1/subscriptions', values);
  
  history.push('/');
};

export const getSubscriberList = () => async dispatch => {
  const res = await axios.get('/api/v1/subscriptions');

  dispatch({
    type: GET_SUBSCRIBER_LIST,
    payload: res.data
  });
};

export const deleteSubscriber = (value) => async dispatch => {
  let res = await axios.delete(`/api/v1/subscriptions/` + value);
  res = await axios.get('/api/v1/subscriptions');

  dispatch({
    type: GET_SUBSCRIBER_LIST,
    payload: res.data
  });
};