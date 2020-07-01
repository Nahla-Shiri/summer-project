import {BRAND_SAVED} from '../actions/type'
const initialState = {
    saved: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case BRAND_SAVED:
        return { ...state, saved: true }

    default:
        return state
    }
}
