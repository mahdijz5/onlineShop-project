import styled from '@emotion/styled';
import { Send } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Paper, Rating, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic.js';
import React, { useState } from 'react'
const CKEditor = dynamic(() => import("../CKEditor.js"), {
    ssr: false,
});

const Comment = styled(Paper)(({ theme }) => ({
    borderRadius: "50px",
    borderTopLeftRadius: "0",
    padding: "50px",
    paddingBottom : "40px",
    maxWidth: "60%",
    [theme.breakpoints.down('lg')]: {
        minWidth: "100%",
    },
    position: "relative",
    marginLeft : "21px"

}))

const ProductComments = () => {
    const [comment, setComment] = useState("")
    const [rate, setRate] = useState(0)

    return (
        <>
            <Stack p="20px" gap="30px">
                <Box >
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
                    />
                    <Button variant="contained" color="success" sx={{ marginTop: "8px" }}>
                        <Typography color="white" display='flex' justifyContent="center" alignItems="center" gap="7px"><Send /> ارسال </Typography>
                    </Button>
                </Box>
                <Stack gap="20px">
                    <Box>
                        <Stack direction="row" gap="8px" mb="4px" alignItems="center">
                        <Avatar/> <Typography variant="body2"> مهدی جاویدی زرمهری</Typography>
                        <Rating readOnly value={4}/>
                        </Stack>
                        <Comment elevation="3">
                            <Typography>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، </Typography>
                            <Typography variant="overline">13 ابان 1398</Typography>
                        </Comment>
                    </Box>
                    <Box>
                        <Stack direction="row" gap="8px" mb="4px" alignItems="center">
                        <Avatar/> <Typography variant="body2"> مهدی جاویدی زرمهری</Typography>
                        <Rating readOnly value={4}/>
                        </Stack>
                        <Comment elevation="3">
                            <Typography>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، </Typography>
                            <Typography variant="overline">13 ابان 1398</Typography>
                        </Comment>
                    </Box>
                    <Box>
                        <Stack direction="row" gap="8px" mb="4px" alignItems="center">
                        <Avatar/> <Typography variant="body2"> مهدی جاویدی زرمهری</Typography>
                        <Rating readOnly value={4}/>
                        </Stack>
                        <Comment elevation="3">
                            <Typography>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، </Typography>
                            <Typography variant="overline">13 ابان 1398</Typography>
                        </Comment>
                    </Box>
                    <Box>
                        <Stack direction="row" gap="8px" mb="4px" alignItems="center">
                        <Avatar/> <Typography variant="body2"> مهدی جاویدی زرمهری</Typography>
                        <Rating readOnly value={4}/>
                        </Stack>
                        <Comment elevation="3">
                            <Typography> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای  </Typography>
                            <Typography variant="overline">13 ابان 1398</Typography>
                        </Comment>
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}

export default ProductComments