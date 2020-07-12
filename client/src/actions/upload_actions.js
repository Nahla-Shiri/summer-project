import { UPLOAD_FILE} from './type';

export const uploadFile = (file) => {
    return async dispatch => {
        try {
           
            dispatch({type: UPLOAD_FILE, payload : file})
            
        } catch (e) {
           console.log('upload failed')
        }
    }
}