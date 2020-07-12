import { AMBASSADOR_SAVED, FETCHING_AMBASSADOR, FETCHED_SUCCESS, FETCHED_FAILED, AMBASSADOR_UPDATED} from './type';
import {apiSaveAmbassador, apiFetchAmbassador, apiUpdateAmbassador, apiDeleteAmbassador} from '../api/ambassador';
import { addErrorMessage, clearErrorMessages } from './error_actions';
export const saveAmbassador = ambassador => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiSaveAmbassador(ambassador);
            dispatch({type:AMBASSADOR_SAVED});
            
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    }
}

export const updateAmbassador = ambassador => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiUpdateAmbassador(ambassador);
            dispatch({type:AMBASSADOR_UPDATED});
            
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    }
}


export const deleteAmbassador = ambassadorId => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiDeleteAmbassador(ambassadorId);
            dispatch(fetchAmbassador());
            
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    }
}


export const fetchAmbassador = () => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            dispatch({type: FETCHING_AMBASSADOR})
            const {data} =await apiFetchAmbassador();
            dispatch({type: FETCHED_SUCCESS, payload : data.ambassador})
            
        } catch (e) {
            dispatch({type: FETCHED_FAILED});
            dispatch(addErrorMessage(e));
        }
    }
}