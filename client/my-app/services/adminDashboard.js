import axios from "axios";

const Server_UrI = process.env.SERVER_URI || "http://localhost:3001";


//* Category >>>>>>>>>>>>>>>>>>>
//@desc handle creating new category
//@route POST  Server_UrI/admin/add-category
export const addCategory = (data) => {
    const url = `${Server_UrI}/admin/dashboard/add-category`
    return axios.post(url,{title : data})
}

//@desc get all categories
//@route GET  Server_UrI/admin/all-categories
export const getAllCategories = () => {
    const url = `${Server_UrI}/admin/dashboard/all-categories`
    return axios.get(url)
}

//@desc handle deleting category
//@route DELETE  Server_UrI/admin/delete-category
export const deleteCategory = (id) => {
    const url = `${Server_UrI}/admin/dashboard/delete-category/${id}`
    return axios.delete(url)
}

//@desc edit category
//@route PUT  Server_UrI/admin/add-category
export const editCategory = (id,title) => {
    const url = `${Server_UrI}/admin/dashboard/edit-category/${id}`
    return axios.put(url , {title})
}

//* Brand >>>>>>>>>>>>>>>>>>>

//@desc handle creating new brand
//@route POST  Server_UrI/admin/add-brand
export const addBrand = (data) => {
    const url = `${Server_UrI}/admin/dashboard/add-brand`
    return axios.post(url,{title : data})
}

//@desc get all brands
//@route GET  Server_UrI/admin/all-brands
export const getAllBrands = () => {
    const url = `${Server_UrI}/admin/dashboard/all-brands`
    return axios.get(url)
}

//@desc handle deleting brand
//@route DELETE  Server_UrI/admin/delete-brand
export const deleteBrand = (id) => {
    const url = `${Server_UrI}/admin/dashboard/delete-brand/${id}`
    return axios.delete(url)
}

//@desc edit brand
//@route PUT  Server_UrI/admin/add-brand
export const editBrand = (id,title) => {
    const url = `${Server_UrI}/admin/dashboard/edit-brand/${id}`
    return axios.put(url , {title})
}

//@desc get all products
//@route GET  /admin/dashboard/all-products
export const getAllProducts = () => {
    const url = `${Server_UrI}/admin/dashboard/all-products`
    return axios.get(url)
}

//@desc handle creating new product
//@route POST  Server_UrI/admin/add-product
export const createProduct = (data) => {
    const url = `${Server_UrI}/admin/dashboard/add-product`
    return axios.post(url , data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}