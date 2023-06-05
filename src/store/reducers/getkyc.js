import {handleActions} from 'redux-actions'
const initialState = {}

const kycGet = handleActions(
  {
    KYC_GET_REQUEST: (state) => {},
    KYC_GET_SUCCESS: (state, {payload}) => {
      return {
        payload,
      }
    },
    KYC_GET_FAIL: (state, {payload}) => {
      return {
        payload,
      }
    },
  },
  initialState,
)

export default kycGet
