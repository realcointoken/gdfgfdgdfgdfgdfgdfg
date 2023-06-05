import http from './http'

export default class Applications {
  static uploadApplications(data) {
    return http.post('/IdoApplications/register-ido', data)
  }
}
