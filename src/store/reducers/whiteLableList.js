import {handleActions} from 'redux-actions'

const initialState = {
  response: [],
}

const whiteLabelList = handleActions(
  {
    LABEL_REQUEST: (state) => ({
      ...state,
      response: [],
    }),
    LABEL_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    LABEL_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default whiteLabelList
