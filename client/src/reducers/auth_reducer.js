import {
  AUTH_ATTEMPTING,
  AUTH_SUCCESS,
  AUTH_FAILED,
  USER_LOGGED_OUT,
} from "../actions/type";
const initialState = {
  attempting: false,
  isAuth: false,
  profile: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_ATTEMPTING:
      return { ...state, attempting: true, isAuth: false, error: null };
    case AUTH_SUCCESS:
      return { ...state, attempting: false, isAuth: true, error: null };
    case AUTH_FAILED:
      return {
        ...state,
        attempting: false,
        isAuth: false,
        error: payload,
      };

    case USER_LOGGED_OUT:
      return {
        ...state,
        isAuth: false,
        profile: {},
      };
    default:
      return state;
  }
};
