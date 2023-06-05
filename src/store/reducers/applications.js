import {handleActions} from 'redux-actions'

const initialState = {
  uploadApply: {
    requesting: false,
    result: null,
    error: null,
  },
}

export const applications = handleActions(
  {
    UPLOAD_APPLICATIONS_REQUEST: (state) => ({
      ...state,
      uploadApply: {
        ...state.uploadApply,
        requesting: true,
        error: null,
      },
    }),
    UPLOAD_APPLICATIONS_SUCCESS: (state, {payload}) => ({
      ...state,
      uploadApply: {
        ...state.uploadApply,
        requesting: false,
        error: null,
        result: payload.data,
      },
    }),
    UPLOAD_APPLICATIONS_FAIL: (state, {payload}) => ({
      ...state,
      uploadApply: {
        ...state.uploadApply,
        requesting: false,
        error: payload.error,
      },
    }),
  },
  initialState,
)

export default applications
