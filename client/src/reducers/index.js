import { combineReducers } from 'redux';
import auth from  './auth_reducer';
import brand from './brand_reducer';
import ambassador from './ambassador_reducer';
import errors from './error_reducer';
import upload from  './upload_reducer';

export default combineReducers({
    auth,
    brand,
    ambassador,
    errors,
    upload
});