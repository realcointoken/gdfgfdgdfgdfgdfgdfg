import {handleActions} from 'redux-actions'

const initialState = {
  response: {
    // access_token: '7rgojfemuk-aq8RcA7xWxJQKv6Ux0VWJ1DQtU6178B8',
    // token_type: 'bearer',
    // expires_in: 7200,
    // refresh_token: 'thPSSHGnk3NGU5vV4V_g-Qrs47RibO9KEEhfKYEgJOw',
    // scope: 'uid:read email:read',
    // created_at: 1543585106,
  },
}

const fractal = handleActions(
  {
    FRACTAL_REQUEST: (state) => ({
      ...state,
      response: {},
    }),
    FRACTAL_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload,
    }),
    FRACTAL_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default fractal
