import authInstance from "./authInstance";
const Server_UrI = process.env.SERVER_URI || "http://localhost:3001/order";

//@desc create order
//@route Post SERVER_URI/create-order
export const createOrder = async (products,callback) => {
	const url = `${Server_UrI}/create-order`;
	return authInstance.post(url,{products},{
        headers : {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`
        }
    }).then((data) => {
		callback(data)
	}).catch((err) => {
        callback(false,err)
    })
};

//@desc get orders 
//@route GET SERVER_URI/get-orders
export const getOrders =async (callback) => {
	const url = `${Server_UrI}/get-orders`;
	return await authInstance.get(url,{
        headers : {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`
        }
    }).then(data => {
        callback(data)
    }).catch((err) => {
        callback(false,err)
    })
};
