import styled from '@emotion/styled'
import { Delete, Edit } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Rating, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useContext, useEffect, useState } from 'react'
import { convertDate, toastNotif } from '../../../helpers/tools'
import { editComment, removeComment } from '../../../services/user'
import ProductCard from '../../Product/ProductCard'
import { General } from '../../../context/context'
import EditComment from './editComment'

const StyledBox = styled(Stack)(({ theme }) => ({
    border: `1px solid ${grey[300]} `,
    minHeight: "230px",

}))

const Comment = ({ comment }) => {
    const { setRefresh } = useContext(General)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.getElementById(comment._id).innerHTML = comment.text

    })

    const handleRemove = (id) => {
        removeComment(id, (response, err) => {
            if (err) {
                if (err?.response?.data?.message) {
                    toastNotif(err.response.data.message, err.response.status, 0);
                }
            } else {
                toastNotif(response.data.message, response.status, 0);
                setRefresh(p => !p)

            }
        })
    }

    
    const handleEdit = async(rate,text) => {
        editComment({rate,text},comment._id,(response,err) => {
            if (err) {
                if (err.response.data.message) {
                    toastNotif(err.response.data.message, err.response.status, 0);
                }
            } else {
                toastNotif(response.data.message, response.status, 0);
                setOpen(false)
                setRefresh(p => !p)
            }
        })
    }

    return (
        <StyledBox direction={{ md: "row", sm: "column" }} justifyContent="center" alignItems="stretch" >
            <Stack width={{ md: "75%", sm: '100%' }} p="10px"  >
                <Box height="80%">
                    <Avatar sizes='' src={`http://localhost:3001/uploads/profiles/${comment.author.profileImg}`} alt={comment.author.name} />
                    <Rating readOnly value={comment.rate} sx={{ marginTop: "7px" }} />
                    <div id={comment._id} style={{ padding: "0 20px 0 0" }}>

                    </div>
                </Box>
                <Box height="20%">
                    <Typography variant="subtitle2">{convertDate(comment.createdAt)}</Typography>
                    <Box display="flex" gap="10px" sx={{ float: "left" }}>
                        <Button variant="outlined" color="danger" onClick={() => { handleRemove(comment._id) }}><Delete /></Button>
                        <Button variant="outlined" color="warning" onClick={() => {setOpen(true)}}><Edit /></Button>
                    </Box>
                </Box>
            </Stack>
            <Box sx={{ width: { md: "35%", sm: '50%' } }} alignSelf="center">
                <ProductCard solid product={comment.product} width="100%" height="100%" padding={"0"} />
            </Box>
            <EditComment open={open} setOpen={setOpen} rate={comment.rate} text={comment.text} handleEdit={handleEdit}/>
        </StyledBox>

    )
}

export default Comment