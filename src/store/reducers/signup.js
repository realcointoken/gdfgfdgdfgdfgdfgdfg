import {handleActions} from 'redux-actions'

const initialState = {
  authResponse: null,
}

const defaultData = {
  data: {
    token: null,
    userInfo: {},
  },
  error: null,
  isSuccess: true,
  message: '',
}

const signup = handleActions(
  {
    SIGN_UP_REQUEST: (state) => ({
      ...state,
      authResponse: null,
    }),
    SIGN_UP_SUCCESS: (state, {payload}) => ({
      ...state,
      authResponse: payload,
    }),

    SIGN_UP_FAIL: (state, {payload}) => ({
      ...state,
      authResponse: payload.data,
    }),
    SIGN_UP_CLEAR: (state) => ({
      ...state,
      authResponse: null,
    }),
  },
  initialState,
)

export default signup
