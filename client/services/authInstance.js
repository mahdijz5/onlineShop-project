import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";


const serverUrl = "http://localhost:3001"
const serverAuthUrl = "http://localhost:3002/auth"
let accessToken = 'token'

axios.defaults = {
    withCredentials: true
}

if (typeof localStorage != "undefined") {
    accessToken = localStorage != undefined ? localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null : null;
}

const authInstance = axios.create({
    baseURL: serverUrl,
    headers: { 'Authorization': `bearer ${accessToken}` },
    withCredentials: true,

});


authInstance.interceptors.request.use(async req => {

    axios.defaults = {
        withCredentials: true
    }

    let accessToken = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "token"
    let refreshToken = localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : "token"
    return axios.post(serverAuthUrl + "/auth", null, {
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    }).then((data) => {
        return req
    }).catch(async err => {
        return axios.post(`${serverAuthUrl}/refresh-token/`,null, {
                headers: {
                    Authorization: `bearer ${refreshToken}`,
                },
            }).then(data => {
                console.log(data)
                req.headers.Authorization = `Bearer ${data.data.accessToken}`
                localStorage.setItem("accessToken", data.data.accessToken);
                localStorage.setItem("refreshToken", data.data.refreshToken);
                return req
            }).catch(err => {
                console.log(err)
                return req
            })
        })
})

export default authInstance; 