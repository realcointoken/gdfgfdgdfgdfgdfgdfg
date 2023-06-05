import {handleActions} from 'redux-actions'

const initialState = {
  response: [],
}

const getAllInvestmentbyProjectId = handleActions(
  {
    GET_ALL_INVESTMENT_BY_PROJECT_ID_REQUEST: (state) => ({
      ...state,
      response: [],
    }),
    GET_ALL_INVESTMENT_BY_PROJECT_ID_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    GET_ALL_INVESTMENT_BY_PROJECT_ID_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default getAllInvestmentbyProjectId
