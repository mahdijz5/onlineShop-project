import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Checkbox, Modal, Paper, Table as TableM, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import _ from "lodash"
import { Stack } from '@mui/system';
import styled from '@emotion/styled';

import Confirmation from '../ui/Confirmation';

const StyledBox = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    wdith: "auto",
    minWidth: "450px",
    maxWidth: "90%",
    maxHeight: "100vh",
    overflowY: "auto",
    height: "auto",
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    padding: "4%",
    borderRadius: 20,
    backgroundColor: "white"
})

const StyledButton = styled(Button)({
    borderRadius: "unset",
    borderRadius: "0 5px 5px 0"
})

function CategoryAndBrandTable({ items, noCheckBox, headerName, children, handleDelete, selectedItems, setSelectedItems, editFunc }) {
    const [open, setOpen] = useState(false)
    const [allItems, setItems] = useState([])
    const [itemsName, setItemsName] = useState('')
    const [openEdit, setOpenEdit] = useState(false)

    useEffect(() => {
        setItems(items)
    }, [allItems, items])

    const checkIt = (id) => {
        let result = false
        selectedItems.map(p => {
            if (id == p) {
                result = true
            }
        })
        return result
    }

    const selectItem = (id) => {
        setSelectedItems((p) => {
            const item = [...p]
            let isExist = false
            item.map((product, index) => {
                if (product == id) {
                    isExist = true
                    item.splice(index, 1)
                }
            })

            if (!isExist) item.push(id)
            return item;
        })
    }


    return (
        <>
            <Stack direction={'row'} gap={2}>
                <Box width="30%" mt={"55px"}>
                    {children}
                </Box>
                <Box width="70%">
                    <Box my={2}>
                        <Button sx={{ visibility: selectedItems.length > 0 ? 'visible' : "hidden" }} color="error" variant="contained" onClick={() => {
                            setOpen(true)
                        }}><Delete /></Button>
                        {" "}
                        <Button sx={{ visibility: selectedItems.length == 1 ? 'visible' : "hidden" }} color="warning" variant="contained" onClick={() => {
                            setOpenEdit(true)
                        }}><Edit /></Button>
                    </Box>

                    <TableContainer component={Paper} sx={{ marginBottom: "25px", maxHeight: "80vh" }} className="niceScroll">
                        <TableM sx={{ minWidth: 650, }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    {headerName.map((header, index) => (
                                        <TableCell key={index} align='right' >{header}</TableCell>
                                    ))}
                                    {!noCheckBox && <TableCell align="right"> </TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allItems ? allItems.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        hover
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={() => {
                                            if (!noCheckBox) {
                                                selectItem(item._id)
                                            }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.title}
                                        </TableCell>


                                        {!noCheckBox && <TableCell align="right" ><Checkbox checked={checkIt(item._id)} onChange={() => {
                                            console.log("سلام")
                                        }} /></TableCell>}
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell>
                                            <Typography>ایتمی وجود ندارد</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            <Confirmation title="ایا مطمعن هستید ؟" description={"ایا از پاک کردن این مورد اطمینان دارید ؟"} open={open} setOpen={setOpen} func={handleDelete} funcParameter={selectedItems} />
                        </TableM>
                    </TableContainer>
                </Box>
            </Stack>

            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <StyledBox>
                    <form onSubmit={(e) =>  e.preventDefault()}>
                        <Stack direction={"row"} textAlign="center" justifyContent={"center"}>
                            <TextField label="نام دسته را وارد کنید"  variant="outlined" onChange={(e) => setItemsName(e.target.value)} />
                            <StyledButton type='submit' variant="contained" onClick={() => {
                                editFunc(itemsName)
                                setOpenEdit(false)
                            }}  >تایید</StyledButton>
                        </Stack>
                    </form>
                </StyledBox>
            </Modal>
        </>
    )
}

export default CategoryAndBrandTable