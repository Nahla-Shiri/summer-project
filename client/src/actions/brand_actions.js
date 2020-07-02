import { BRAND_SAVED, FETCHING_BRAND, FETCHED_SUCCESS, FETCHED_FAILED} from './type';
import {apiSaveBrand, apiFetchBrand} from '../api/brand'
import { addErrorMessage, clearErrorMessages } from './error_actions';
export const saveBrand = brand => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiSaveBrand(brand);
            dispatch({type:BRAND_SAVED});
            
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    }
}


export const fetchBrand = () => {
    return async dispatch => {
        try {
            dispatch({type: FETCHING_BRAND})
            const {data} =await apiFetchBrand();
            dispatch({type: FETCHED_SUCCESS, payload : data.brand})
            
        } catch (e) {
            dispatch({type: FETCHED_FAILED});
            dispatch(addErrorMessage(e));
        }
    }
}