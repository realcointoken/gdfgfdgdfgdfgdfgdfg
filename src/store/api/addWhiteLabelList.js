import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class AddWhiteLabelList {
  static addWhitelabelApi(data) {
    return http.post(
      httpUrl + '/api/v1/WhiteLabelAddress/AddWhiteLabelAddressShort',
      data,
    )
  }
}
