import {handleActions} from 'redux-actions'

const initialState = {
  whitelist: {
    loading: false,
    data: null,
    error: null,
  },
}

export const whitelists = handleActions(
  {
    FETCH_WHITELISTS_REQUEST: (state) => ({
      ...state,
      whitelist: {
        ...state.whitelist,
        loading: true,
        error: null,
      },
    }),
    FETCH_WHITELISTS_SUCCESS: (state, {payload}) => ({
      ...state,
      whitelist: {
        ...state.whitelist,
        loading: false,
        error: null,
        data: {...payload},
      },
    }),
    FETCH_WHITELISTS_FAIL: (state, {payload}) => ({
      ...state,
      whitelist: {
        ...state.whitelist,
        loading: false,
        error: payload.error,
      },
    }),
  },
  initialState,
)

export default whitelists
