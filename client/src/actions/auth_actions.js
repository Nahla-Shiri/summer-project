import { apiLogin, getProfile} from '../api/user';
import { AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED, USER_LOGGED_OUT, PROFILE_FETCH } from './type';
import setAuthHeader from '../api/setAuthHeader';
import { addErrorMessage, clearErrorMessages } from './error_actions';
const TOKEN_NAME = "brand_token";

export const signIn = (request_data)=> {
    
   return async dispatch =>  {
       dispatch({ type:AUTH_ATTEMPTING });
        try {
            dispatch(clearErrorMessages());
            const {data: {token}} = await apiLogin(request_data);
            setAuthHeader(token);
            dispatch(getUserProfile(request_data.userType));
            dispatch(success(token, request_data.userType));
            
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    };
};

export const onLoadingSignIn = (userType) => {
    return dispatch => {
        try {
            const token = localStorage.getItem(TOKEN_NAME);
            if(token === null || token ==='undefined'){
                return dispatch(error('You need to login'))
            }
            setAuthHeader(token);
            dispatch(getUserProfile(userType));
            dispatch(success(token));
            
        } catch (e) {
            console.error(e)
        }
    }
}

export const getUserProfile = (userType) => {
    return async dispatch => {
        try {
            const {data: {user}} = await getProfile(userType);
            
             const profile = {...user, type: userType}
            dispatch({type:PROFILE_FETCH, payload: profile});
            
        } catch (e) {
            console.error(e);
        }
    }
}

export const logUserOut =() => {
    localStorage.clear();
    return({type:USER_LOGGED_OUT})
}

const success = (token, userType)=> {
    localStorage.setItem(TOKEN_NAME, token);
    return {type:AUTH_SUCCESS, payload : userType};
}

const error = (error) => {
    return {type: AUTH_FAILED, payload: error}
}



