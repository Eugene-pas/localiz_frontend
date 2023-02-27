import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import projectReducer from './projectReducer';

export default combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer,
    projectReducer: projectReducer
});
