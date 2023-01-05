import MainLayout from "../../../layouts/MainLayout";
import Meta from "../../../components/Meta";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Orders from "../../../components/dashboard/Orders";
import { getOrders } from "../../../services/order";

const orders = () => {

    return (
        <>
            <Meta title="سفارش ها" />
            <Orders />
        </>
    );
};

orders.getLayout = (page) => {
    return (
        <MainLayout>
            <DashboardLayout>{page}</DashboardLayout>
        </MainLayout>
    )
}

 


export default orders;
