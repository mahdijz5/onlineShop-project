import axios from "axios";
const Server_UrI = process.env.ADMIN_AUTH_SERVER_URI || "http://localhost:3002/admin";

//@desc Check user is Admin or no
//@route POST SERVER_URI/auth
export const adminAuthenticated = () => {
	const token = localStorage.getItem("token");
	const url = `${Server_UrI}/auth`;
	return axios.post(url, null, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	});
};

//@desc handle login as admin
//@route POST SERVER_URI/user/login
export const AdminLogin = (values) => {
	const url = `${Server_UrI}/login`;
	return axios.post(url, values);
};