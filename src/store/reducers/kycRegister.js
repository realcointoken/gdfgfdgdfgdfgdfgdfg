import {handleActions} from 'redux-actions'
const initialState = {}

const kycRegister = handleActions(
  {
    KYC_REGISTER_REQUEST: (state) => {},
    KYC_REGISTER_SUCCESS: (state, {payload}) => {
      return {
        payload,
      }
    },
    KYC_REGISTER_FAIL: (state, {payload}) => {
      return {
        payload,
      }
    },
  },
  initialState,
)

export default kycRegister
