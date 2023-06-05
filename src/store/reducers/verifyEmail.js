import {handleActions} from 'redux-actions'

const initialState = {
  response: [],
}

const verifyEmail = handleActions(
  {
    VERIFY_EMAIL_REQUEST: (state) => ({
      ...state,
      response: [],
    }),
    VERIFY_EMAIL_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload,
    }),
    VERIFY_EMAIL_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default verifyEmail
