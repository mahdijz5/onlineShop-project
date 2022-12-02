import styled from '@emotion/styled'
import { Box, Button, Divider, Modal, Rating, Typography } from '@mui/material'
import dynamic from 'next/dynamic.js';
import React, { useEffect, useState } from 'react'
const CKEditor = dynamic(() => import("../../CKEditor"), {
    ssr: false,
});

const StyledBox = styled(Box)(({ theme }) => ({

    position: 'absolute',
    top: '50%',
    left: '50%',
    wdith: "auto",
    minWidth: "650px",
    maxWidth: "100%",
    maxHeight: "100vh",
    overflowY: "auto",
    height: "auto",
    [theme.breakpoints.down('sm')]: {
        minWidth: "100%",
    },
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    padding: "4%",
    borderRadius: 20,
    backgroundColor: "white"

}))


function EditComment({ open, setOpen,handleEdit, rate: initialRate, text: initialText }) {
    const [comment, setComment] = useState("")
    const [rate, setRate] = useState(0)

    useEffect(() => {
        setComment(initialText)
        setRate(initialRate)
    }, [])


    return (
        <>
            <Modal open={open} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" onClose={() => {
                    setOpen(false)
                }}>
                <StyledBox>
                    <Typography variant="h4" color="primary.main">ویرایش کامنت</Typography>
                    <Divider sx={{ margin: "15px 0" }} />
                    <Box direction="ltr">
                        <Rating
                            sx={{ direction: "rtl" }}
                            name="simplRatinge-controlled"
                            value={rate}
                            onChange={(event, value) => {
                                setRate(value);
                            }}
                        />
                    </Box>
                    <CKEditor
                        config={{
                            language: "fa",
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            const e = {
                                target: {
                                    name: "description",
                                    value: data,
                                },
                            };
                            setComment(e.target.value);
                        }}
                        data={comment}
                    />

                    <Button variant="contained" sx={{marginTop : "8px"}} onClick={() => {
                        handleEdit(rate,comment)
                    }}>تایید</Button>
                </StyledBox>
            </Modal>
        </>
    )
}

export default EditComment