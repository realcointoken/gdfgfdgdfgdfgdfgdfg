import http from './http'

export default class Project {
  static fetchAllProjects() {
    return http.get('/projects?all=1')
  }

  static fetchProject(id) {
    return http.get(`/Projects/${id}`)
  }

  static fetchTotalTVL() {
    return http.get('/Projects/totalTVL')
  }
}
