import { useEffect, useState } from "react";
import { getOrders } from "../../../services/order";
import Order from "./Order";
import EmptyCart from '../../EmptyCart'
import { Stack, Typography } from "@mui/material";
import { isEmpty } from "../../../helpers/tools";

const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders(({ data }, err) => {
            setOrders(isEmpty(data) ? []: data.orders  );
        })
    }, [])
    console.log(orders)
    return (
        <>
            <Stack gap="20px">
                {orders.length > 0 ? orders.map((order, index) => (
                    <Order order={order} key={index} />
                )) : (
                    <>
                        <Stack gap="20px" textAlign="center" alignItems='center'>

                            <EmptyCart width={"100px"} height={"100px"} />
                            <Typography variant="subtitle2">سبد خرید شما خالی است</Typography>
                        </Stack>
                    </>
                )}
            </Stack>
        </>
    )
}

export default Orders;
