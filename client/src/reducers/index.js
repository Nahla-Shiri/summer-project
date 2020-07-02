import { combineReducers } from 'redux';
import auth from  './auth_reducer';
import brand from './brand_reducer';
import errors from './error_reducer';


export default combineReducers({
    auth,
    brand,
    errors
});