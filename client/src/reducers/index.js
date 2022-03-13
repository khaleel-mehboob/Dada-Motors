import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from './authReducer';
import { vehiclesReducer } from './vehiclesReducer';
import { subscribersReducer } from './subscribersReducer';


const reducers = combineReducers({
    auth: authReducer,
    vehicles: vehiclesReducer,
    subscribers: subscribersReducer,
    form: formReducer
})

export default reducers; 