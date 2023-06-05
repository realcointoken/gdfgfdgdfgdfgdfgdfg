import {handleActions} from 'redux-actions'

const initialState = {
  response: [],
}

const addWhiteLabelList = handleActions(
  {
    ADD_WHITE_LABEL_REQUEST: (state) => ({
      ...state,
      response: [],
    }),
    ADD_WHITE_LABEL_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    ADD_WHITE_LABEL_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default addWhiteLabelList
