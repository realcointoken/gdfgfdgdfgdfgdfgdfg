import {createAction, createActions} from 'redux-actions'

import Api from '../api'

export const increaseNumber = createAction('INCREASE_NUMBER')
export const reduceNumber = createAction('REDUCE_NUMBER')
export const checkWrongNetwork = createAction('CHECK_WRONG_NETWORK')

/** UPLOAD MEDIA **/
const {uploadMediaRequest, uploadMediaSuccess, uploadMediaFail} = createActions(
  {
    UPLOAD_MEDIA_REQUEST: () => {},
    UPLOAD_MEDIA_SUCCESS: (data) => ({data}),
    UPLOAD_MEDIA_FAIL: (error) => ({error}),
  },
)

export const uploadMedia = (body) => (dispatch) => {
  dispatch(uploadMediaRequest())

  return new Promise((resolve) => {
    return Api.Common.uploadMedia(body)
      .then(({data}) => {
        dispatch(uploadMediaSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(uploadMediaFail(error))
        resolve()
      })
  })
}
