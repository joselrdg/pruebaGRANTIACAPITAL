// json-server --watch db.json --port 3000
class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }
  // axios.defaults.baseURL = this.BASE_URL;
  getFullList() {
    return axios.get(`${this.BASE_URL}/elements`)
  }

  getOneRegister(id) {
    return axios.get(`${this.BASE_URL}/elements/${id}`)
  }

  createOneRegister(data) {
    return axios.post(`${this.BASE_URL}/elements`, data)
  }

  updateOneRegister(id, data) {
    console.log(id)
    return axios.put(`${this.BASE_URL}/elements/${id}`, data)
  }

  deleteOneRegister(id) {
    return axios.delete(`${this.BASE_URL}/elements/${id}`)
  }
}
