import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class Logout {
  static logoutApi(body) {
    return http.get(httpUrl + '/api/v1/Auth/logout'
    // ,{
    //   headers: {
    //     'Authorization': `Basic ${token}`
    //   }
    // }
    )
  }
}
