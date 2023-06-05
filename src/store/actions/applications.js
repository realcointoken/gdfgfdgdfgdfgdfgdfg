import {createActions} from 'redux-actions'

import Api from '../api'

const {
  uploadApplicationsRequest,
  uploadApplicationsSuccess,
  uploadApplicationsFail,
} = createActions({
  UPLOAD_APPLICATIONS_REQUEST: () => {},
  UPLOAD_APPLICATIONS_SUCCESS: (data) => ({data}),
  UPLOAD_APPLICATIONS_FAIL: (error) => ({error}),
})

export const uploadApplications = (data) => (dispatch) => {
  dispatch(uploadApplicationsRequest())

  return Api.Application.uploadApplications(data)
    .then(({data}) => {
      return dispatch(uploadApplicationsSuccess(data))
    })
    .catch((error) => {
      return dispatch(uploadApplicationsFail(error))
    })
}
