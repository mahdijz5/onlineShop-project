import styled from '@emotion/styled'
import { Delete, Edit, Remove } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardMedia, Divider, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useContext, useEffect } from 'react'
import { convertDate } from '../../../helpers/tools'
import { removeComment } from '../../../services/user'
import ProductCard from '../../Product/ProductCard'
import { General } from '../../../context/context'

const StyledBox = styled(Stack)(({ theme }) => ({
    border: `1px solid ${grey[300]} `,
    minHeight: "230px",

}))

const Comment = ({ comment }) => {
    const {setRefresh} = useContext(General)
    useEffect(() => {
        document.getElementById(comment._id).innerHTML = comment.text

    })

    const handleRemove = (id) => {
        removeComment(id,(data, err) => {
            console.log(err)
            console.log(data)
        })
        setRefresh((prev) => !prev)
    }

    return (
        <StyledBox direction={{ md: "row", sm: "column" }} justifyContent="center" alignItems="stretch" >
            <Stack width={{ md: "75%", sm: '100%' }} p="10px"  >
                <Box height="80%">
                    <Avatar sizes='' src={`/uploads/profiles/${comment.author.profile}`} alt={comment.author.name} />
                    <div id={comment._id} style={{ padding: "0 20px 0 0" }}>

                    </div>
                </Box>
                <Box height="20%">
                    <Typography variant="subtitle2">{convertDate(comment.createdAt)}</Typography>
                    <Box display="flex" gap="10px" sx={{float : "left"}}>
                        <Button variant="outlined" color="danger" onClick={() => {handleRemove(comment._id)}}><Delete /></Button>
                        <Button variant="outlined" color="warning"><Edit /></Button>
                    </Box>
                </Box>
            </Stack>
            <Box sx={{ width: { md: "35%", sm: '50%' } }} alignSelf="center">
                <ProductCard solid product={comment.product} width="100%" height="100%" padding={"0"} />
            </Box>
        </StyledBox>

    )
}

export default Comment