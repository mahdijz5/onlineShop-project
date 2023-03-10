import axios from "axios";
import { authorization } from "../helpers/authorization";
import authInstance from "./authInstance";

const Server_UrI = "http://localhost:3001/auth";

axios.defaults = {
	withCredentials: true
}

//@desc handle login
//@route POST SERVER_URI/sign-in
export const login = async(values,callback) => {
	const cart = localStorage.getItem("cart") != undefined ? localStorage.getItem("cart") : ""
	const url = `${Server_UrI}/sign-in`;
	return  axios.post(url, {
		cart : cart.split(",") || '',
		...values,
	}).then((res) => {
		callback(res)
	}).catch(err => {
		callback(false,err);
	})
};

//@desc handle regestring user
//@route POST SERVER_URI/sign-up
export const register = (values) => {
	const url = `${Server_UrI}/sign-up`;
	return axios.post(url, values);
};

//@desc Check user is authenticated or no it status 401 or 200
//@route POST SERVER_URI/auth
export const userAuthenticated = (callback) => {
	const token = localStorage.getItem("accessToken")
	const url = `${Server_UrI}/auth`;
	authInstance.post(url, null).then((data) => {
		console.log(data)
		callback(data)
	}).catch(async (err) => {
 
	})
};

//@desc to refresh to token to keep user authenticated when user is online
//@route POST SERVER_URI/refresh-token
export const refreshToken = async () => {
	try {
		const token = localStorage.getItem("refreshToken");
		const url = `${Server_UrI}/refresh-token`;
		const response = axios.post(url, null, {
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		});

		return response;
	} catch (error) {
		return error
	}
};
