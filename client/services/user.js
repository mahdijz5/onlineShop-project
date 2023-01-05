import axios from "axios";
import { authorization } from "../helpers/authorization";
import authInstance from "./authInstance";
const Server_UrI = process.env.SERVER_URI || "http://localhost:3001/user";


axios.defaults = {
	withCredentials: true,
};


//@desc get user
//@route GET SERVER_URI/get-user
export const getUser = async (callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/get-user`;
	return authInstance.get(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		callback(false, err)
	})
};

//@desc get user
//@route POST SERVER_URI/merge-cart
export const mergeCart = async (email) => {
	const token = localStorage.getItem("accessToken");
	const cart = localStorage.getItem("cart") ? localStorage.getItem("cart").split(",") : null;
	const url = `${Server_UrI}/merge-cart`;
	return authInstance.post(url, {
		email,
		cart,
	}, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((data) => {
		return data
	}).catch(async (err) => {
		return err
	})
};


//@desc add product to cart 
//@route POST SERVER_URI /add-product-cart
export const editCart = async ({id,count}, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/edit-product-cart`;
	return authInstance.post(url, {
		product: id,
		count  : count,
	}, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		callback(false, err)
	})
};

//@desc remove product from cart 
//@route POST SERVER_URI/remove-product-cart
export const removeProductFromCart = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/remove-product-cart`;
	return authInstance.post(url, {
		product: id
	}, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		callback(false, err)
	})
};

//@desc add product to favorite list 
//@route POST SERVER_URI /add-product-list
export const addProductToList = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/add-product-list`;
	return authInstance.post(url, {
		product: id
	}, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		console.log(err)
		callback(false, err)
	})
};

//@desc get list of products as cart with ids
//@route GET /user/get-cart
export const getCart = (ids) => {
	const idList = typeof ids == 'string' ? ids.split(',') : ids
	idList = idList.length == 1 && idList[0] == '' ? [] : idList;
	const url = `${Server_UrI}/get-cart`
	return axios.get(url, {
		params: {
			ids: idList,
		}
	})
}

//@desc get comments of user
//@route GET SERVER_URI/get-comments
export const getComments = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/get-comments/${id}`;
	return authInstance.get(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		console.log(err)

		callback(false, err)
	})
};

//@desc edit specific comment
//@route Put SERVER_URI/edit-comment
export const editComment = async (value,id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/edit-comment/${id}`;
	return authInstance.put(url, {
		text : value.text,
		rate : value.rate,
	},{
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		console.log(err)
		callback(false, err)
	})
};

//@desc Delete specific comment
//@route DELETE SERVER_URI/remove-comment/:id
export const removeComment = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/remove-comment/${id}`;
	return authInstance.delete(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		callback(false, err)

	})
};

//@desc edit user data  
//@route PUT  Server_UrI/edit-data
export const editUserData = async (data, id,callback) => {
	const url = `${Server_UrI}/edit-data/${id}`
	const token = localStorage?.getItem("accessToken");
	console.log(data.values)
	return authInstance.put(url, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`,
		}
	}).then(data => {
		callback(data)
	}).catch(err => {
		callback(false,err)
	}) 
}
