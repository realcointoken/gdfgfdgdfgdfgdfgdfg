import {handleActions} from 'redux-actions'

const initialState = {
    data: null,
    error: {},
    isSuccess: false,
    message: ""
}

const logout = handleActions(
  {
    LOGOUT_REQUEST: (state) => ({
      ...state,
      data: state.data,
      error: state.error,
      isSuccess: state.isSuccess,
      message: state.message
    }),
    LOGOUT_SUCCESS: (state, {payload}) => ({
      ...state,
      data: payload.data,
      error: payload.error,
      isSuccess: payload.isSuccess,
      message: payload.message
    }),
    LOGOUT_FAIL: (state, {payload}) => ({
      ...state,
      data: payload.data,
      error: payload.error,
      isSuccess: payload.isSuccess,
      message: payload.message,
    }),
    LOGOUT_CLEAR: (state, {payload}) => ({
      ...state,
      data: null,
      error: {},
      isSuccess: false,
      message: ""
    })
  },
  initialState,
)

export default logout
