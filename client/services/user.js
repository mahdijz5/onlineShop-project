import axios from "axios";
import { authorization } from "../helpers/authorization";
const Server_UrI = process.env.SERVER_URI || "http://localhost:3001/user";


axios.defaults = {
	withCredentials: true,
};


//@desc get user
//@route GET SERVER_URI/get-user
export const getUser = async (callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/get-user`;
	return axios.get(url, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		authorization(err.response, (data) => {
			if (data.status == 401 || data.status == 403) {
				callback({ status: 401 })
			} else {
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

//@desc get user
//@route POST SERVER_URI/merge-cart
export const mergeCart = async (email) => {
	const token = localStorage.getItem("accessToken");
	const cart = localStorage.getItem("cart").split(",");
	const url = `${Server_UrI}/merge-cart`;
	return axios.post(url, {
		email,
		cart,
	}, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	}).then((data) => {
		throw data
	}).catch(async (err) => {
		authorization(err.response, (data) => {
			if (data.status == 401 || data.status == 403) {
				throw { status: 401 }
			} else {
				mergeCart(email)
			}
		})
	})
};


//@desc add product to cart 
//@route POST SERVER_URI /add-product-cart
export const addProductToCart = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/add-product-cart`;
	return axios.post(url, {
		product: id
	}, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		console.log(err)
		if (err.response.status !== undefined) {
			if (err.response.status == 401 || err.response.status == 403) {
				authorization(err.response, (data) => {
					console.log(data)
					if (data.status == 401 || data.status == 403) {
						callback(false, { status: 401 })
					} else {
						addProductToCart(id, (data, err) => {
							if (err) {
								if (err.status == 401 || err.status == 403) {
									callback(false, { status: 401 })
								}
							} else {
								callback(data, false)
							}
						})
					}
				})
			} else {
				callback(false, err)
			}
		} else {
			callback(false, err)
		}
	})
};

//@desc remove product from cart 
//@route POST SERVER_URI/remove-product-cart
export const removeProductFromCart = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/remove-product-cart`;
	return axios.post(url, {
		product: id
	}, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		console.log(err)
		if (err.response.status !== undefined) {
			if (err.response.status == 401 || err.response.status == 403) {
				authorization(err.response, (data) => {
					console.log(data)
					if (data.status == 401 || data.status == 403) {
						callback(false, { status: 401 })
					} else {
						removeProductFromCart(id, (data, err) => {
							if (err) {
								if (err.status == 401 || err.status == 403) {
									callback(false, { status: 401 })
								}
							} else {
								callback(data, false)
							}
						})
					}
				})
			} else {
				callback(false, err)
			}
		} else {
			callback(false, err)
		}
	})
};

//@desc add product to favorite list 
//@route POST SERVER_URI /add-product-list
export const addProductToList = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/add-product-list`;
	return axios.post(url, {
		product: id
	}, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		console.log(err)
		if (err.response.status !== undefined) {
			if (err.response.status == 401 || err.response.status == 403) {
				authorization(err.response, (data) => {
					console.log(data)
					if (data.status == 401 || data.status == 403) {
						callback(false, { status: 401 })
					} else {
						addProductToList(id, (data, err) => {
							if (err) {
								if (err.status == 401 || err.status == 403) {
									callback(false, { status: 401 })
								}
							} else {
								callback(data, false)
							}
						})
					}
				})
			} else {
				callback(false, err)
			}
		} else {
			callback(false, err)
		}
	})
};

//@desc get list of products as cart with ids
//@route GET /user/get-cart
export const getCart = (ids) => {
	const idList = typeof ids == 'string' ? ids.split(',') : ids
	const url = `${Server_UrI}/get-cart`
	return axios.get(url,{
		params : {
			ids : idList,
		}
	})
}

//@desc get comments of user
//@route GET SERVER_URI/get-comments
export const getComments = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/get-comments/${id}`;
	return axios.get(url, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		console.log(err)
		if (err.response.status !== undefined) {
			if (err.response.status == 401 || err.response.status == 403) {
				authorization(err.response, (data) => {
					console.log(data)
					if (data.status == 401 || data.status == 403) {
						callback(false, { status: 401 })
					} else {
						addProductToList(id, (data, err) => {
							if (err) {
								if (err.status == 401 || err.status == 403) {
									callback(false, { status: 401 })
								}
							} else {
								callback(data, false)
							}
						})
					}
				})
			} else {
				callback(false, err)
			}
		} else {
			callback(false, err)
		}
	})
};

//@desc Delete specific comment
//@route DELETE SERVER_URI/remove-comment/:id
export const removeComment = async (id, callback) => {
	const token = localStorage.getItem("accessToken");
	const url = `${Server_UrI}/remove-comment/${id}`;
	return axios.delete(url, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	}).then((data) => {
		callback(data)
	}).catch(async (err) => {
		console.log(err)
		if (err.response.status !== undefined) {
			if (err.response.status == 401 || err.response.status == 403) {
				authorization(err.response, (data) => {
					console.log(data)
					if (data.status == 401 || data.status == 403) {
						callback(false, { status: 401 })
					} else {
						removeComment(id, (data, err) => {
							if (err) {
								if (err.status == 401 || err.status == 403) {
									callback(false, { status: 401 })
								}
							} else {
								callback(data, false)
							}
						})
					}
				})
			} else {
				callback(false, err)
			}
		} else {
			callback(false, err)
		}
	})
};