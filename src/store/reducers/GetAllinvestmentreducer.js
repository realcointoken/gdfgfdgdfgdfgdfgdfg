import {handleActions} from 'redux-actions'

const initialState = {}

const defaultData = {
  data: {
    token: null,
    userInfo: {},
  },
  error: null,
  isSuccess: true,
  message: '',
}
const GetAllinvestmentreducer = handleActions(
  {
    GetAllintestment_REQUEST: (state) => ({
      ...state,
      ...state.defaultData,
    }),
    GetAllintestment_SUCCESS: (state, {payload}) => ({
      ...state,
      Investment: payload.data,
    }),
    GetAllintestment_FAIL: (state, {payload}) => ({
      ...state,
      Investment: payload.data,
    }),
  },
  initialState,
)

export default GetAllinvestmentreducer
