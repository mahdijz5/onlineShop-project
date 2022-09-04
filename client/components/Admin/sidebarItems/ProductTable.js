import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FiEdit2, FiTrash } from "react-icons/fi";

import { confirmation, setPoint, toastNotif } from '../../../helpers/tools';
import { removeSelectedProducts } from '../../../services/adminDashboard';
import Button from "../../UiComponents/Button"

function ProductTable({ products, currentPage, productPerPage }) {
    const router = useRouter()
    const [selectedProducts, setSelectedProducts] = useState([])

    const selectProduct = (id) => {
        setSelectedProducts((p) => {
            const products = [...p]
            let isExist = false
            products.map((product, index) => {
                if (product == id) {
                    isExist = true
                    products.splice(index, 1)
                }
            })

            if (!isExist) products.push(id)
            return products;
        })
    }
    console.log(selectedProducts)
    const handleDelete = async (products) => {
        try {
            const response = await removeSelectedProducts(products)
            if (response.status == 200) {
                router.push(router.asPath)
            }
            toastNotif(response.data.message, response.status, 1000)
        } catch (error) {
            if (error.response.data.message) {
                toastNotif(error.response.data.message, error.response.status, 0);
            }
        }
    }


    return (
        <>
            <div>

                <div>

                    {selectedProducts.length == 1 ? (<Button theme="light" onClick={() => {
                        router.push(`/admin/dashboard/edit-product/${selectedProducts[0]}`)
                    }}><FiEdit2 /></Button>) : null}
                    {" "}
                    {selectedProducts.length > 0 ? (<Button theme="danger" onClick={() => {
                        confirmation("آیا مطمعنی ؟", "آیا از حزف کردن این محصولات اطمینان دارید؟", handleDelete, selectedProducts)
                    }}><FiTrash /></Button>) : null}


                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">نام</th>
                            <th scope="col">برنده</th>
                            <th scope="col">دسته</th>
                            <th scope="col">قیمت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map((product, index) => (
                            <tr key={index} htmlFor={product._id} style={{ cursor: "pointer" }} onClick={() => {
                                document.getElementById(product._id).checked = !document.getElementById(product._id).checked
                                selectProduct(product._id)
                            }}>
                                <th scope="row">{((currentPage - 1) * productPerPage) + (index + 1)}</th>
                                <td>
                                    <Link href={'/product/[id]'} as={`/product/${product._id}`}>
                                        <a>{product.name}</a>
                                    </Link>
                                </td>
                                <td>
                                    <Link href={'/brand/[id]'} as={`/brand/${product.brand._id}`}>
                                        <a>{product.brand.title}</a>
                                    </Link>
                                </td>
                                <td>
                                    {product.categories.map((category, index) => (
                                        <div key={index}>
                                            <Link href={'/product/[id]'} as={`/brand/${product._id}`} >
                                                <a>{category.title}</a>
                                            </Link>
                                            <br />
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {product.discount == 0 ? (<span className={`mx-1 text-center `}>
                                        {setPoint(product.price)}
                                    </span>) : (<>
                                        <span className="mx-2  ">
                                            {setPoint(
                                                product.price - (product.price * product.discount) / 100
                                            )}
                                        </span>

                                        <span className={`mx-1 text-center  priceWithDiscount`}>
                                            {setPoint(product.price)}
                                        </span>
                                    </>)}
                                    <input
                                        className="form-check-input"
                                        style={{
                                            borderRadius: "50%",
                                            float: "left",
                                        }}
                                        type="checkbox"
                                        name="product"
                                        id={product._id}
                                        value={product._id}
                                        onChange={(event) => {
                                            selectProduct(event.target.value)
                                        }}

                                    />
                                </td>
                            </tr>

                        )) :
                            (<tr>
                                <th scope="row">1</th>
                                <td colSpan={4} >محصولی موجود نیست</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductTable