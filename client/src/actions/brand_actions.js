import { BRAND_SAVED, FETCHING_BRAND, FETCHED_SUCCESS, FETCHED_FAILED, BRAND_UPDATED} from './type';
import {apiSaveBrand, apiFetchBrand, apiUpdateBrand, apiDeleteBrand} from '../api/brand'
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

export const updateBrand = brand => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiUpdateBrand(brand);
            dispatch({type:BRAND_UPDATED});
            
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    }
}


export const deleteBrand = brandId => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            await apiDeleteBrand(brandId);
            dispatch(fetchBrand());
            
        } catch (e) {
            dispatch(addErrorMessage(e));
        }
    }
}


export const fetchBrand = () => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages());
            dispatch({type: FETCHING_BRAND})
            const {data} =await apiFetchBrand();
            dispatch({type: FETCHED_SUCCESS, payload : data.brand})
            
        } catch (e) {
            dispatch({type: FETCHED_FAILED});
            dispatch(addErrorMessage(e));
        }
    }
}