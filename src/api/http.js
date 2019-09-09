import axios from 'axios'
import URL from './apiUrl'

let API = axios.create({
  baseURL: '/api',
  timeout: 5000
})
let HTTP = {}
for (let key in URL) {
  let item = URL[key]
  HTTP[key] = (params) => {
    return API[item.methods](item.url, params)
  }
}
export default HTTP
