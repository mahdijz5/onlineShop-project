import { refreshToken } from "../services/auth"

export const authorization = (response, callback) => {
    if(response.status == 401 || response.status == 403) {
        refreshToken().then(({data}) => {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            callback({status : 200})
        }).catch(err => {
            console.log(err)
            callback({status : 401})
        })
    }
}
 