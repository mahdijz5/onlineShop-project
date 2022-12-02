import { Box, Card, CardActions, Divider, Collapse, IconButton, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ExpandMore as ExpandMoreIcon, Check, LocalShipping, ReceiptLong } from "@mui/icons-material"
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { convertDate, setPoint } from "../../../helpers/tools"
import ProductCard from "../ProductCard";
import _ from "lodash"

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton   {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const GetStatus = ({ status }) => {
    switch (status) {
        case 3:
            return (
                <>
                    <IconButton sx={{ bgcolor: "success.main", color: "white", marginLeft: "7px", ":hover": { "bgcolor": 'success.main' } }}><Check /></IconButton><Typography variant="body1">تحویل داده شده</Typography>
                </>
            )
            break;
        case 2:
            return (
                <>
                    <IconButton sx={{ bgcolor: "warning.main", color: "white", marginLeft: "7px", ":hover": { "bgcolor": "warning.main" } }}><LocalShipping /></IconButton><Typography variant="body1" >درحال ارسال</Typography>
                </>
            )
            break;
        case 1:
            return (
                <>
                    <IconButton sx={{ bgcolor: grey[300], color: "white", marginLeft: "7px", ":hover": { "bgcolor": grey[300] } }}><ReceiptLong /></IconButton><Typography variant="body1">درحال بررسی</Typography>
                </>
            )
            break;
    }
}


const Order = ({ order }) => {
    const [expanded, setExpanded] = useState(false);
    const [products, setProducts] = useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        let counts = {}
        let allProducts =[]
        order.products.map((product) => { counts[product._id] = (counts[product._id] || 0) + 1; });
        for (const product of _.uniqWith(order.products,_.isEqual)) {
            allProducts.push({
                ...product,
                count: counts[product._id]
            })
        }
        setProducts(allProducts)
    }, [])
    return (
        <>
            <Card sx={{ maxWidth: "100%" }}>
                <Stack px={"20px"}>
                    <Box display="flex" alignItems={"center"} gap="5px" >
                        <GetStatus status={order.status} />
                    </Box>
                    <Typography marginLeft="7px" variant="subtitle2" mb="15px" mt="5px">
                        {convertDate(order.createdAt)}
                    </Typography>
                    <Divider />
                    <Box display="flex" my={'4px'} justifyContent={"space-between"}>
                        <Typography>شماره همراه :</Typography>
                        <Typography>{order.phoneNumber}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" my={'4px'} justifyContent={"space-between"}>
                        <Typography>آدرس :</Typography>
                        <Typography maxWidth="90ch">{order.address}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" my={'4px'} justifyContent={"space-between"}>
                        <Typography>هزینه :</Typography>
                        <Typography>{setPoint(order.cost.low)} تومان</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" my={'4px'} justifyContent={"space-between"}>
                        <Typography>تخفیف :</Typography>
                        <Typography>{setPoint(order.discount.low)} تومان</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" my={'4px'} justifyContent={"space-between"}>
                        <Typography>هزینه پرداخت شده :</Typography>
                        <Typography>{setPoint(order.cost.low - order.discount.low)} تومان</Typography>
                    </Box>
                    <Divider />
                </Stack>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {products.length > 0 ? products.map((product,index) => (
                        <ProductCard product={product} count key={index} />
                    )) : null}
                </Collapse>
            </Card>
        </>
    )
}

export default Order;