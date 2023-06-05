import {handleActions} from 'redux-actions'

const initialState = {
  authResponse: {},
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
const login = handleActions(
  {
    LOGIN_REQUEST: (state) => ({
      ...state,
      authResponse: {
        ...state.defaultData,
      },
    }),
    LOGIN_SUCCESS: (state, {payload}) => ({
      ...state,
      authResponse: payload,
    }),
    LOGIN_FAIL: (state, {payload}) => ({
      ...state,
      authResponse: payload.data,
    }),
    LOGIN_REQUEST_CLEAR: (state) => ({
      ...state,
      authResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState,
)

export default login
