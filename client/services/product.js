import axios from "axios";
import { authorization } from "../helpers/authorization";
import authInstance from "./authInstance";

const Server_UrI = process.env.SERVER_URI || "http://localhost:3001";

axios.defaults = {
	withCredentials: true,
};


//@desc get all categories
//@route GET  Server_UrI/product/all-categories
export const getAllCategories = () => {
    const url = `${Server_UrI}/product/all-categories`
    return axios.get(url)
}


//@desc get all brands
//@route GET  Server_UrI/product/all-brands
export const getAllBrands = () => {
    const url = `${Server_UrI}/product/all-brands`
    return axios.get(url)
}

//@desc get all products
//@route GET  Server_UrI/product/all-products
export const getAllProducts = (page,limit,sort,search,categories,giveAll,price,discount,brand) => {
    const url = encodeURI(`${Server_UrI}/product/all-products?page=${page}&sort=${sort}&limit=${limit}&search=${search}&categories=${categories}&price=${price}&discount=${discount}&brand=${brand}&giveAll=${giveAll}`)
    return axios.get(url)
}

//@desc get related products
//@route GET  Server_UrI/product/related-products
export const getRelatedProducts = (page,limit,categories,brand) => {
    const url = encodeURI(`${Server_UrI}/product/related-products?page=${page}&limit=${limit}&categories=${categories}&brand=${brand}`)
    return axios.get(url)
}


//@desc get Single product
//@route GET  Server_UrI/product/get-product/id
export const getSingleProduct = (id) => {
    const url = `${Server_UrI}/product/get-product/${id}`
    return axios.get(url)
}

//@desc get Single product
//@route POST  Server_UrI/product/send-product-comment/:id
export const sendProductComment = async (rate,text,userId,id,callback  ) => {
    console.log('request')
    const token = localStorage.getItem("accessToken");
    const url = `${Server_UrI}/product/send-product-comment/${id}`
    return authInstance.post(url,{
        rate,
        text,
        userId,        
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(data => {
        callback(data)
    }).catch(err => {
            callback(false,err)
    })
}

//@desc get comment of  specific product
//@route Get  Server_UrI/product/get-comments/:id
export const getComments = (id) => {
    const url = `${Server_UrI}/product/get-comments/${id}`
    return axios.get(url)
}
