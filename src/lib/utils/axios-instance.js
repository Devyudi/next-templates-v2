import axios from 'axios'
let headers = {}
const AxiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_HOST,
    headers:{
        ...headers,
    },
})
AxiosInstance.isCancel = axios.isCancel;

AxiosInstance.interceptors.response.use(
    (res)=>

        new Promise((resolve,reject)=>{
            resolve(res)
        }),

    (err)=>{
        return new Promise((resolve,reject)=> {
            reject(err)
        })
    }

)

export default AxiosInstance