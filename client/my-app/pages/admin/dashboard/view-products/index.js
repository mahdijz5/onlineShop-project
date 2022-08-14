import Link from "next/link";
import { useContext } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import MainLayout from "../../../../components/MainLayout";

import { AdminDashboardContext } from "../../../../context/context";
import { getAllProducts } from "../../../../services/adminDashboard";

const viewProducts = ({ products }) => {
    const {setPoint} = useContext(AdminDashboardContext)

    console.log(products)
    return (
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
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>
                            <Link href={'/product/[id]'} as={`/brand/${product._id}`}>
                                <a>{product.name}</a>
                            </Link>
                        </td>
                        <td>
                            <Link href={'/brand/[id]'} as={`/brand/${product.brand._id}`}>
                                <a>{product.brand.title}</a>
                            </Link>
                        </td>
                        <td>
                            {product.categories.map((category,index)=>(
                                <Link href={'/product/[id]'} as={`/brand/${product._id}`} key={index}>
                                <a>{category.title}</a>
                                </Link>
                            ))}
                        </td>
                        <td>
                            <span   h3 className="mx-2  ">
								{setPoint(
									product.price - (product.price * product.discount) / 100
								)}
							</span>
                            :
							<span className={`mx-1 text-center  priceWithDiscount`}>
								{setPoint(product.price)}
							</span>
                        </td>
                    </tr>
                )) :  
                (<tr>
                    <th scope="row">1</th>
                    <td colSpan={4} >محصولی موجود نیست</td>
                </tr>)}
            </tbody>
        </table>
    );
};

export const getServerSideProps = async (context) => {
    const { data } = await getAllProducts();

    return {
        props: {
            products: data.products,

        },
    };
};

viewProducts.getLayout = (page) => {
    return (
        <MainLayout>
            <AdminLayout>{page}</AdminLayout>
        </MainLayout>
    );
};

export default viewProducts;
