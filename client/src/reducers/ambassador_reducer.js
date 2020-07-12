import {
  AMBASSADOR_SAVED,
  AMBASSADOR_UPDATED,
  FETCHED_FAILED,
  FETCHED_SUCCESS,
  FETCHING_AMBASSADOR,
} from "../actions/type";

const initialState = {
  saved: false,
  updated:false,
  fetching: false,
  ambassador: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AMBASSADOR_SAVED:
      return { ...state, saved: true };
      case AMBASSADOR_UPDATED:
        return { ...state, updated: true };  
    case FETCHING_AMBASSADOR:
      return { ...state, fetching: true };
    case FETCHED_SUCCESS:
      return { ...state, fetching: true, ambassador: payload };
    case FETCHED_FAILED:
      return { ...state, fetching: false };

    default:
      return state;
  }
};
