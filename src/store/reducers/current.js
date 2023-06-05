import {handleActions} from 'redux-actions'

const initialState = {
  response: [],
}

const current = handleActions(
  {
    CURRENT_REQUEST: (state) => ({
      ...state,
      response: [],
    }),
    CURRENT_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    CURRENT_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default current
