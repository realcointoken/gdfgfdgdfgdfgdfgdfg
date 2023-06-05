import http from './http'

export default class Common {
  static uploadMedia(body) {
    return http.post('/media/upload', body)
  }
}
