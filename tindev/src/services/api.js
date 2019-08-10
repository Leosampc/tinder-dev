import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3003' //ios emulator
    //baseURL: 'http://10.0.2.2:3003' //android studio emulator
})

export default api