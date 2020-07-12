import { UPLOAD_FILE } from '../actions/type'
const initialState = {
 file : null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case UPLOAD_FILE:
        return { ...state, file : payload }
    
    default:
        return initialState
    }
}
