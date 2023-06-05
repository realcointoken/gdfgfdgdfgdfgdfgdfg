import {handleActions} from 'redux-actions'

const initialState = {
  count: 0,
  wrongNetwork: false,
  upload: {
    result: null,
    error: null,
    requesting: false,
  },
}

export const common = handleActions(
  {
    INCREASE_NUMBER: (state) => ({
      ...state,
      count: state.count + 1,
    }),
    REDUCE_NUMBER: (state) => ({
      ...state,
      count: state.count - 1,
    }),
    CHECK_WRONG_NETWORK: (state, {payload}) => ({
      ...state,
      wrongNetwork: payload,
    }),
    /** UPLOAD **/
    UPLOAD_MEDIA_REQUEST: (state) => ({
      ...state,
      upload: {
        ...state.upload,
        requesting: true,
      },
    }),
    UPLOAD_MEDIA_SUCCESS: (state, {payload}) => ({
      ...state,
      upload: {
        ...state.upload,
        requesting: false,
        result: payload.data,
        error: null,
      },
    }),
    UPLOAD_MEDIA_FAIL: (state, {payload}) => ({
      ...state,
      upload: {
        ...state.upload,
        requesting: false,
        error: payload.error,
      },
    }),
  },
  initialState,
)

export default common
