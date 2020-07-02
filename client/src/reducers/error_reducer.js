import { ADD_ERROR, CLEAR_ERRORS } from '../actions/type'
const initialState = {
 message : null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case ADD_ERROR:
        return { ...state, message : payload }
    case CLEAR_ERRORS:
        return initialState    
    default:
        return state
    }
}
