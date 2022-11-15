import axios from "axios";
import { authorization } from "../middlewares/authorization";
const Server_UrI = process.env.SERVER_URI || "http://localhost:3001/user";


axios.defaults = {
	withCredentials: true,
};


//@desc get user
//@route GET SERVER_URI/get-user
export const  getUser = async(callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/get-user`;
	return axios.get(url,  {
		headers: {
			Authorization: `bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		authorization(err.response, (data) => {
			if(data.status == 401 || data.status == 403) {
				callback({status : 401})
			}else {
				getUser((data) => {
					if (data.status == 401 || data.status == 403) {
						callback({ status: 401 })
					} else {
						callback(data)
					}
				})				
			}
		})
	})
};
