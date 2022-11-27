import styled from '@emotion/styled';
import { Send } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Paper, Rating, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic.js';
import { useRouter } from 'next/router.js';
import  { useContext, useEffect, useState } from 'react'
import { getComments, sendProductComment } from '../../services/product.js';
const CKEditor = dynamic(() => import("../CKEditor.js"), {
    ssr: false,
});

import { convertDate, toastNotif } from '../../helpers/tools.js';
import {General} from '../../context/context'

const Comment = styled(Paper)(({ theme }) => ({
    borderRadius: "50px",
    borderTopLeftRadius: "0",
    padding: "30px",
    paddingBottom: "20px",
    maxWidth: "60%",
    [theme.breakpoints.down('lg')]: {
        minWidth: "100%",
    },
    position: "relative",
    marginLeft: "21px"

}))

const ProductComments = ({ productId, comments: allComments }) => {
    const router = useRouter()
    const {user} = useContext(General)

    const [comment, setComment] = useState("")
    const [rate, setRate] = useState(0)
    const [comments, setComments] = useState([])

    useEffect(() => {
        setComments(allComments)
    }, [])

    useEffect(() => {
        comments.map((comment,index) => {
            document.getElementById(index).innerHTML = comment.text
        })
    },[comments])

    const onSubmit = async (e) => {
        e.preventDefault()
        await sendProductComment(rate, comment,user._id, productId, (response, err) => {
            if (err) {
                console.log(err)
                if (err.response.status == 401 || err.response.status == 403) {
                    router.push('/user/sign-in')
                } else if (err.response.data.message) {
                    toastNotif(err.response.data.message, err.response.status, 0);
                }
            }else {
                toastNotif(response.data.message, response.status, 0);
                setRate(0)
                setComment("")
                getComments(productId).then(({data}) =>{
                    setComments(data.comments)
                })
            }
        })

    }


    return (
        <>
            <Stack p="20px" gap="30px">
                <form onSubmit={(e) => {
                    onSubmit(e)
                }}>
                    <Rating
                        sx={{ direction: "rtl" }}
                        name="simplRatinge-controlled"
                        value={rate}
                        onChange={(event, value) => {
                            setRate(value);
                        }}
                    />
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
                    <Button variant="contained" color="success" sx={{ marginTop: "8px" }} type='submit'>
                        <Typography color="white" display='flex' justifyContent="center" alignItems="center" gap="7px"><Send /> ارسال </Typography>
                    </Button>
                </form>
                <Stack gap="20px">
                    {comments.length > 0 ? comments.map((comment,index) => (
                    <Box key={index}>
                        <Stack direction="row" gap="8px" mb="4px" alignItems="center">
                            <Avatar alt={user.name} src={`/uploads/profiles/${comment.author.profileImg}`}/> <Typography variant="body2">{comment.author.name}</Typography>
                            <Rating readOnly value={comment.rate} />
                        </Stack>
                        <Comment elevation={3}>
                            <div id={index} role="text"></div>
                            <Typography variant="overline">{convertDate(comment.createdAt)}</Typography>
                        </Comment>
                    </Box>
                    ))  : null}

                </Stack>
            </Stack>
        </>
    )
}

export default ProductComments