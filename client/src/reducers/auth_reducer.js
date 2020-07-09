import {
  AUTH_ATTEMPTING,
  AUTH_SUCCESS,
  AUTH_FAILED,
  USER_LOGGED_OUT,
  PROFILE_FETCH,
} from "../actions/type";
const initialState = {
  attempting: false,
  isAuth: false,
  profile: {},
  error: null,
  userType: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_ATTEMPTING:
      return { ...state, attempting: true, isAuth: false, error: null };
    case AUTH_SUCCESS:
      return { ...state, attempting: false, isAuth: true, error: null, userType: payload };
    case AUTH_FAILED:
      return {
        ...state,
        attempting: false,
        isAuth: false,
        error: payload,
      };

      case PROFILE_FETCH:
      return { ...state, profile: payload };

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
