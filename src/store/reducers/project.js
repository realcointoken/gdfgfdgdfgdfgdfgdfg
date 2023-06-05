import {handleActions} from 'redux-actions'
import {get} from 'lodash'

const initialState = {
  allProjects: {
    requesting: false,
    all: [],
    upComingPools: [],
    livePools: [],
    completedPools: [],
    error: null,
  },
  project: {
    requesting: false,
    result: {},
    error: null,
  },
  totalTVL: {
    requesting: false,
    result: 0,
    error: null,
  },
  staking: {
    loading: false,
    error: null,
  },
  contractSelected: '',
}

export const project = handleActions(
  {
    FETCH_ALL_PROJECTS_REQUEST: (state) => ({
      ...state,
      allProjects: {
        ...state.allProjects,
        requesting: true,
        error: null,
      },
    }),
    FETCH_ALL_PROJECTS_SUCCESS: (state, {payload}) => ({
      ...state,
      allProjects: {
        ...state.allProjects,
        requesting: false,
        error: null,
        ...payload.data,
      },
    }),
    FETCH_ALL_PROJECTS_FAIL: (state, {payload}) => ({
      ...state,
      allProjects: {
        ...state.allProjects,
        requesting: false,
        error: payload.error,
      },
    }),
    FETCH_PROJECT_REQUEST: (state) => ({
      ...state,
      project: {
        ...state.project,
        requesting: true,
        error: null,
      },
    }),
    FETCH_PROJECT_SUCCESS: (state, {payload}) => ({
      ...state,
      project: {
        ...state.project,
        requesting: false,
        error: null,
        result: payload.data,
      },
    }),
    FETCH_PROJECT_FAIL: (state, {payload}) => ({
      ...state,
      project: {
        ...state.project,
        requesting: false,
        error: payload.error,
      },
    }),
    FETCH_TOTAL_TVL_REQUEST: (state) => ({
      ...state,
      totalTVL: {
        ...state.totalTVL,
        requesting: true,
        error: null,
      },
    }),
    FETCH_TOTAL_TVL_SUCCESS: (state, {payload}) => ({
      ...state,
      totalTVL: {
        ...state.totalTVL,
        requesting: false,
        error: null,
        result: payload.data,
      },
    }),
    FETCH_TOTAL_TVL_FAIL: (state, {payload}) => ({
      ...state,
      totalTVL: {
        ...state.totalTVL,
        requesting: false,
        error: payload.error,
      },
    }),
    LISTEN_LAUNCH_X_CONTRACT: (state, {payload}) => ({
      ...state,
      contractSelected: payload,
    }),
    SET_PROJECT_INFO_FROM_CONTRACT: (state, {payload}) => ({
      ...state,
      project:
        get(state, 'project.result.smartContractAddress') ===
        get(payload, 'smartContract')
          ? {
              ...state.project,
              result: {
                ...state.project.result,
                ...payload.data,
              },
            }
          : state.project,
    }),
    CLEAR_PROJECT_DATA: (state) => ({
      ...state,
      project: initialState.project,
    }),
    FETCH_STAKING_CONTRACTS_REQUEST: (state, payload) => ({
      ...state,
      staking: {
        ...state?.staking,
        loading: true,
      },
    }),
    FETCH_STAKING_CONTRACTS_SUCCESS: (state, {payload}) => {
      return {
        ...state,
        staking: {
          ...state?.staking,
          loading: false,
          ...payload.data,
        },
      }
    },
    FETCH_STAKING_CONTRACTS_FAIL: (state, payload) => ({
      ...state,
      staking: {
        ...state?.staking,
        loading: false,
        error: payload,
      },
    }),
    FETCH_IDO_TOKEN_SAKE_REQUEST: (state, payload) => ({
      ...state,
      staking: {
        ...state?.staking,
        loading: true,
      },
    }),
    FETCH_IDO_TOKEN_SAKE_SUCCESS: (state, {payload}) => {
      return {
        ...state,
        staking: {
          ...state?.staking,
          loading: false,
          ...payload.data,
        },
      }
    },
    FETCH_IDO_TOKEN_SAKE_FAIL: (state, payload) => ({
      ...state,
      staking: {
        ...state?.staking,
        loading: false,
        error: payload,
      },
    }),
  },
  initialState,
)

export default project
