import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import projectReducer from './projectReducer';
import documentReducer from './documentReducer';
import contentReducer from './contentReducer';

export default combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer,
    projectReducer: projectReducer,
    documentReducer: documentReducer,
    contentReducer: contentReducer
});
