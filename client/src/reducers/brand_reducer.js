import {
  BRAND_SAVED,
  BRAND_UPDATED,
  FETCHED_FAILED,
  FETCHED_SUCCESS,
  FETCHING_BRAND,
} from "../actions/type";

const initialState = {
  saved: false,
  updated:false,
  fetching: false,
  brand: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BRAND_SAVED:
      return { ...state, saved: true };
      case BRAND_UPDATED:
        return { ...state, updated: true };  
    case FETCHING_BRAND:
      return { ...state, fetching: true };
    case FETCHED_SUCCESS:
      return { ...state, fetching: true, brand: payload };
    case FETCHED_FAILED:
      return { ...state, fetching: false };

    default:
      return state;
  }
};
