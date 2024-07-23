import axios from 'axios'

const instance = axios.create({
    // baseURL: import.meta.env.VITE_BASE_URL
    // baseURL: 'http://localhost:3000'
    baseURL: 'http://localhost:8000/api'
})
export default instance
