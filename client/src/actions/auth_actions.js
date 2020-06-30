import { apiLogin} from '../api/user';
import { AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED } from './type';

const TOKEN_NAME = "brand_token";

export const signIn = request_data => {
   return async dispatch =>  {
       dispatch({ type:AUTH_ATTEMPTING });
        try {
            
            const {data: {token}} = await apiLogin(request_data);
            dispatch(success(token));
            
        } catch (e) {
            const {response: {data}} = e;
            dispatch(error(data.error));
        }
    };
};

const success = (token)=> {
    localStorage.setItem(TOKEN_NAME, token);
    return {type:AUTH_SUCCESS};
}

const error = (error) => {
    return {type: AUTH_FAILED, payload: error}
}



