import axios from "axios";

const Server_UrI = process.env.SERVER_URI || "http://localhost:3001";


//* Category >>>>>>>>>>>>>>>>>>>
//@desc handle creating new category
//@route POST  Server_UrI/admin/dashboard/add-category
export const addCategory = (data) => {
    const url = `${Server_UrI}/admin/dashboard/add-category`
    return axios.post(url,{title : data})
}

//@desc get all categories
//@route GET  Server_UrI/admin/dashboard/all-categories
export const getAllCategories = () => {
    const url = `${Server_UrI}/admin/dashboard/all-categories`
    return axios.get(url)
}

//@desc handle deleting category
//@route DELETE  Server_UrI/admin/dashboard/delete-category
export const deleteCategory = (id) => {
    const url = `${Server_UrI}/admin/dashboard/delete-category/${id}`
    return axios.delete(url)
}

//@desc edit category
//@route PUT  Server_UrI/admin/dashboard/add-category
export const editCategory = (id,title) => {
    const url = `${Server_UrI}/admin/dashboard/edit-category/${id}`
    return axios.put(url , {title})
}

//* Brand >>>>>>>>>>>>>>>>>>>

//@desc handle creating new brand
//@route POST  Server_UrI/admin/dashboard/add-brand
export const addBrand = (data) => {
    const url = `${Server_UrI}/admin/dashboard/add-brand`
    return axios.post(url,{title : data})
}

//@desc get all brands
//@route GET  Server_UrI/admin/dashboard/all-brands
export const getAllBrands = () => {
    const url = `${Server_UrI}/admin/dashboard/all-brands`
    return axios.get(url)
}

//@desc handle deleting brand
//@route DELETE  Server_UrI/admin/dashboard/delete-brand
export const deleteBrand = (id) => {
    const url = `${Server_UrI}/admin/dashboard/delete-brand/${id}`
    return axios.delete(url)
}

//@desc edit brand
//@route PUT  Server_UrI/admin/dashboard/add-brand
export const editBrand = (id,title) => {
    const url = `${Server_UrI}/admin/dashboard/edit-brand/${id}`
    return axios.put(url , {title})
}

//@desc get all products
//@route GET  Server_UrI/admin/dashboard/all-products
export const getAllProducts = (page,limit,search,categories) => {
    const url = encodeURI(`${Server_UrI}/admin/dashboard/all-products?page=${page}&limit=${limit}&search=${search}&categories=${categories}`)
    return axios.get(url)
}

//@desc handle creating new product
//@route POST  Server_UrI/admin/dashboard/add-product
export const createProduct = (data) => {
    const url = `${Server_UrI}/admin/dashboard/add-product`
    return axios.post(url , data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

//@desc handle deleting products
//@route DELETE  Server_UrI/admin/dashboard/delete-products
export const removeSelectedProducts = (products) => {
    const url = `${Server_UrI}/admin/dashboard/delete-products/${products}`
    return axios.delete(url)
}

//@desc handle editing product
//@route PUT  Server_UrI/admin/dashboard/edit-product
export const editProduct = (product,id) => {

    const url = `${Server_UrI}/admin/dashboard/edit-product/${id}`
    return axios.put(url ,product,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

//@desc get Single product
//@route GET  Server_UrI/admin/dashboard/get-product
export const getSingleProduct = (id) => {
    const url = `${Server_UrI}/admin/dashboard/get-product/${id}`
    return axios.get(url)
}

 