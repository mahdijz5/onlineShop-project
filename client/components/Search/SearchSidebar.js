import styled from '@emotion/styled'
import { ExpandLess, ExpandMore, Refresh } from '@mui/icons-material'
import { Collapse, Divider, IconButton, Input, InputBase, ListItemButton, ListItemText, Slider, Stack, TextField, Typography, withTheme } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { HomeLayoutContext } from '../../context/context'
import { setPoint } from '../../helpers/tools'

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    color: theme.palette.secondary.main
}))

const SearchSidebar = ({ maxPrice }) => {
    const { brands, categories } = useContext(HomeLayoutContext)
    const router = useRouter()

    const [openCategory, setOpenCategory] = useState(true)
    const [openPrice, setOpenPrice] = useState(true)
    const [openBrand, setOpenBrand] = useState(true)
    const [query, setQuery] = useState({
        search: "",
        categories: "",
        brand: "",
        price: [],
        discount: []
    })

    useEffect(() => {
        setQuery((prev) => {
            return {
                search: router.query.search || "",
                categories: router.query.categories != undefined ? router.query.categories : [],
                brand: router.query.brand ? router.query.brand : "",
                price: router.query.price && router.query.price != undefined ? router.query.price.split('_') : [0, maxPrice ? maxPrice : 900000000],
                discount: router.query.discount && router.query.price != undefined ? router.query.discount.split('_') : [0, 100],
            }
        })
    }, [])

    const valuetext = (value) => {
        return setPoint(value);
    }

    const marks = [
        {
            value: 0,
        },

        {
            value: 9000000000,
        },
    ];

    const handleChange = (event) => {
        setQuery((prev) => {
            let value = event.target.value == undefined || !event.target.value ? '' : event.target.value
            return { ...prev, [event.target.name]: value }
        })

    }

    const onsubmit = () => {
        const queries = {
            ...router.query,
            ...query,
            price: `${query.price[0]}_${query.price[1]}`,
            discount: `${query.discount[0]}_${query.discount[1]}`,
        }
        router.push({
            pathname: "/search/",
            query: {
                ...queries
            }
        })
    }

    return (
        <>
            <Box height="100%" width="100%" flexGrow={2}   >
                <Box height="60px" display="flex" justifyContent={"space-between"} pl="10px" alignItems="center" color="text.primary">
                    <Typography variant='h6' textAlign="center" color="text.primary">فیلتر ها </Typography>
                    <Stack borderRight={`1px solid #e0e0e0`} p="7px" sx={{ ":hover": { backgroundColor: "#e0e0e0" }, cursor: "pointer" }} height="100%" alignItems={"center"} justifyContent="center" onClick={() => onsubmit()}>
                        <Refresh sx={{ fontSize: "30px", color: "text.primary" }} />
                    </Stack>
                </Box>
                <Divider />

                {/* Category ----------- */}
                <StyledListItemButton onClick={() => { setOpenCategory((prev) => !prev) }}   >
                    <ListItemText primary="دسته ها" />
                    {openCategory ? <ExpandLess /> : <ExpandMore />}
                </StyledListItemButton>
                <Collapse in={openCategory} timeout="auto" unmountOnExit>
                    <Stack pl="20px" >
                        {categories && categories.length > 0 ? categories.map((c, index) => (
                            <ListItemButton key={index} onClick={() => { handleChange({ target: { name: "categories", value: c.title } }) }} sx={{ ":hover": { color: 'primary.main' }, color: query.categories == c.title ? "primary.main" : "text.primary" }}>
                                <Box >
                                    <Typography   >{c.title}</Typography>
                                </Box>
                            </ListItemButton>
                        )) : "دسته ای وجود ندارد"}
                    </Stack>
                    <Divider />
                </Collapse>

                {/* Price And Discount --------- */}
                <StyledListItemButton onClick={() => { setOpenPrice((prev) => !prev) }}   >
                    <ListItemText primary="قیمت" />
                    {openPrice ? <ExpandLess /> : <ExpandMore />}
                </StyledListItemButton>
                <Collapse in={openPrice} timeout="auto" unmountOnExit>
                    <Stack justifyContent={"center"} alignItems="center" color="text.primary">


                        <Typography>قیمت</Typography>

                        <Slider
                            name='price'
                            onChange={(e) => handleChange(e)}
                            value={[+query.price[0], +query.price[1]]}
                            getAriaValueText={valuetext}
                            valueLabelFormat={(x) => `${setPoint(x)} تومان`}
                            sx={{ width: "80%" }}
                            max={marks[1].value}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                        <Typography>تخفیف</Typography>
                        <Slider
                            name='discount'
                            onChange={(e) => handleChange(e)}
                            getAriaValueText={valuetext}
                            valueLabelFormat={(x) => `${setPoint(x)}% تخفیف`}
                            sx={{ width: "80%" }}
                            value={[+query.discount[0], +query.discount[1]]}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />

                    </Stack>
                </Collapse>

                {/* Brand ----------------- */}
                <StyledListItemButton onClick={() => { setOpenBrand((prev) => !prev) }}   >
                    <ListItemText primary="برند ها" />
                    {openBrand ? <ExpandLess /> : <ExpandMore />}
                </StyledListItemButton>
                <Collapse in={openBrand} timeout="auto" unmountOnExit>
                    <Stack pl="20px" >
                        {brands && brands.length > 0 ? brands.map((b, index) => (
                            <ListItemButton key={index} onClick={() => { handleChange({ target: { name: "brand", value: b.title } }) }} sx={{ ":hover": { color: 'primary.main' }, color: query.brand == b.title ? "primary.main" : "text.primary" }}>
                                <Box >
                                    <Typography   >{b.title}</Typography>
                                </Box>
                            </ListItemButton>
                        )) : "برندی وجود ندارد"}
                    </Stack>
                    <Divider />
                </Collapse>
            </Box>
        </>
    )
}

export default SearchSidebar