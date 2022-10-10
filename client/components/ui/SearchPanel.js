import styled from '@emotion/styled'
import { Search } from '@mui/icons-material'
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Modal, Select, Slider, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { setPoint } from '../../helpers/tools'

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    wdith: "auto",
    height :"auto",
    minWidth: "700px",
    [theme.breakpoints.down('sm')]: {
        minWidth: "100%",
    },
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: 24,
    padding: "4%",
    borderRadius: 20,
}))



function SearchPanel({ maxPrice, categories, brands ,pathBase,open,setOpen}) {
    const router = useRouter()
    const [query, setQuery] = useState({
        search: "",
        categories: [],
        brand: "",
        price: [],
        discount: []
    })
    const valuetext = (value) => {
        return setPoint(value);
    }

    const marks = [
        {
            value: 0,
        },
    
        {
            value: maxPrice || 9000000000,
        },
    ];

    useEffect(() => {
        setQuery((prev) => {
            return {
                search : router.query.search,
                categories : router.query.category != '' &&router.query.category != undefined ? router.query.category.split(',') : [],
                brand : router.query.brand    ? router.query.brand : "",
                price : router.query.price && router.query.price != undefined ? router.query.price.split(',') : [0,maxPrice ? maxPrice : 900000000],
                discount : router.query.discount && router.query.price != undefined ? router.query.discount.split(',') : [0,100],
            }
        })
    },[])

    //Handle searching 
    const addCategory = (e) => {
        let isExist = false
        const prevCategories = [...query.categories];
        prevCategories.map((c) => {
            if (c == e.target.value) {
                isExist = true
            } 
        })

        if(!isExist) {
            setQuery((prev) => {
                return { ...prev, categories: [...prev.categories, e.target.value] }
            })
        }
    };

    const removeCategory = (cate) => {
        setQuery((prev) => {
            const prevCategories = [...prev.categories];
            prevCategories.map((c, index) => {
                if (c == cate) {
                    prevCategories.splice(index, 1)
                }
            })
            return { ...prev, categories: prevCategories };
        })
    };

    const handleChange = (event) => {
        setQuery((prev) => {
            let value = event.target.value == undefined || !event.target.value ? '' : event.target.value
            return { ...prev, [event.target.name]: value }
        })

    }

    const onsubmit = () => {
        router.replace(`${pathBase}?search=${query.search}&category=${query.categories}&brand=${query.brand}&discount=${query.discount}&price=${query.price}`)
    }


    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => {
                setOpen(false)
            }}
        >
            <StyledBox  >
                <Typography variant="h4" color="primary" mb={2}>جستجو</Typography>
                <Stack gap={3}>
                    <Stack direction={'row'} gap={3} justifyContent="space-around">
                        <TextField autoFocus={true} id="standard-basic" label="نام" name='search' value={query.search} onChange={(e) => handleChange(e)} variant="outlined" sx={{ width: "60%" }} />
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">دسته</InputLabel>
                            <Select
                                name='categories'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="دسته"
                                onChange={(event) => addCategory(event)}
                            >
                                {categories.map((cate, index) => (
                                    <MenuItem key={index} value={cate.title}>{cate.title}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction={'row'} spacing={1} >
                        {query.categories.length > 0 ? query.categories.map((cate, index) => (
                            <Chip key={index} label={cate} variant="outlined" onDelete={() => {
                                removeCategory(cate)
                            }} />
                        )) : null}

                    </Stack>
                    <Stack direction={'row'} gap={6} justifyContent="space-around">
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">برند</InputLabel>
                            <Select
                                value={query.brand}
                                name='brand'
                                onChange={(e) => handleChange(e)}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="برند"
                            >
                                {brands.map((brand, index) => (
                                    <MenuItem key={index} value={brand.title}>{brand.title}</MenuItem>
                                ))}
                            </Select>
                            <Button variant="contained" sx={{ marginTop: "9px" }} onClick={() => {
                                onsubmit()
                                setOpen(false)
                            }}>جستجو <Search /></Button>
                        </FormControl>
                        <Stack direction={"row"} gap={2}>
                        <Slider
                            name='price'
                            onChange={(e) => handleChange(e)}
                            orientation="vertical"
                            getAriaValueText={valuetext}
                            valueLabelFormat={(x) => `${setPoint(x)} ریال`}
                            sx={{ height: "100px" }}
                            value={[+query.price[0],+query.price[1]]}
                            max={marks[1].value}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                        <Slider
                        
                            name='discount'
                            onChange={(e) => handleChange(e)}
                            orientation="vertical"
                            getAriaValueText={valuetext}
                            valueLabelFormat={(x) => `${setPoint(x)}% تخفیف`}
                            sx={{ height: "100px" }}
                            value={[+query.discount[0],+query.discount[1]]}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                        </Stack>


                    </Stack>
                </Stack>
            </StyledBox>
        </Modal>
    )
}

export default SearchPanel