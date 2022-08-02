import axios from "axios";

const Server_UrI = process.env.SERVER_URI || "http://localhost:3001";

axios.defaults = {
	withCredentials: true,
};

//@desc handle login
//@route POST SERVER_URI/user/sign-in
export const login = (values) => {
	const url = `${Server_UrI}/user/sign-in`;
	return axios.post(url, values);
};

//@desc handle login as admin
//@route POST SERVER_URI/user/admin/login
export const AdminLogin = (values) => {
	const url = `${Server_UrI}/admin/login`;
	return axios.post(url, values);
};

//@desc handle regestring user
//@route POST SERVER_URI/user/sign-up
export const register = (values) => {
	const url = `${Server_UrI}/user/sign-up`;
	return axios.post(url, values);
};

//@desc Check user is authenticated or no
//@route POST SERVER_URI/user/auth
export const userAuthenticated = () => {
	const token = sessionStorage.getItem("token");
	const url = `${Server_UrI}/user/auth`;
	return axios.post(url, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	});
};

//@desc Check user is Admin or no
//@route POST SERVER_URI/admin/auth
export const adminAuthenticated = () => {
	const token = sessionStorage.getItem("token");
	const url = `${Server_UrI}/admin/auth`;
	return axios.post(url, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	});
};

//@desc to refresh to token to keep user authenticated when user is online
//@route POST SERVER_URI/user/refresh-token
export const refreshToken = async () => {
	try {
		const token = sessionStorage.getItem("token");
		const url = `${Server_UrI}/user/refresh-token`;
		const {data , status} =await axios.post(url, null, {
			headers: {
				Authorization: `bearer ${token}`,
			},
		});
		sessionStorage.setItem("token", data.token);
		setTimeout(() => {
			refreshToken();
		}, 1000 * 200);
		return status;
	} catch (error) {
        console.log(error)
    }
};
