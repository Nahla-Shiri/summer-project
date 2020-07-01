import { BRAND_SAVED} from './type';
import {apiSaveBrand} from '../api/brand'

export const saveBrand = brand => {
    return async dispatch => {
        try {
            await apiSaveBrand(brand);
            dispatch({type:BRAND_SAVED});
            
        } catch (e) {
            console.log(e)
        }
    }
}