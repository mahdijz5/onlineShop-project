import axios from "axios";

const Server_UrI = process.env.SERVER_URI || "http://localhost:3001";



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



//@desc get Single product
//@route GET  Server_UrI/product/get-product
export const getSingleProduct = (id) => {
    const url = `${Server_UrI}/product/get-product/${id}`
    return axios.get(url)
}

 