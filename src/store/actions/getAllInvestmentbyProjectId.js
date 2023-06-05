import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const getAllInvestmentByProjectIdRequest = createAction(
  'GET_ALL_INVESTMENT_BY_PROJECT_ID_REQUEST',
)
export const getAllInvestmentByProjectIdSuccess = createAction(
  'GET_ALL_INVESTMENT_BY_PROJECT_ID_SUCCESS',
)
export const getAllInvestmentByProjectIdFail = createAction(
  'GET_ALL_INVESTMENT_BY_PROJECT_ID_FAIL',
)

export const getAllInvestmentByProjectId = (data) => (dispatch) => {
  dispatch(getAllInvestmentByProjectIdRequest())
  return new Promise((resolve, reject) => {
    return Api.GetAllInvestmentbyProjectId.getAllInvestmentbyProjectIdApi(data)
      .then(({data}) => {
        console.log('data')
        dispatch(getAllInvestmentByProjectIdSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        console.log('error')
        dispatch(getAllInvestmentByProjectIdFail(error))
        reject(error)
      })
  })
}
