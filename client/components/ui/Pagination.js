import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Typography, Stack, Box, IconButton, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import styled from '@emotion/styled';
import { Primary } from "../../helpers/color"    


const StyledButton = styled(IconButton)(({ theme }) => ({
    width: "40px",
    ":hover": {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    }
}))


export default function AppPagination({ numberOfItems, itemPerPage }) {
    const router = useRouter()
    const pageQuery = +router.query.page || 1
    const [path,setPath] = useState(router.pathname+"?")
    const [forceRefresh,setForceRefresh] = useState(false)
    const [pagData,setPagData] = useState({})
 
    useEffect(() => {
          setPagData({
            page : pageQuery  || 1 ,
            hasNextPage :( pageQuery * itemPerPage) < numberOfItems,
            hasPerviousPage : pageQuery > 1,
            lastPage : Math.ceil(numberOfItems / itemPerPage),
            nextPage : pageQuery + 1,
            perviousPage :pageQuery - 1,
        })
    },[])

    const push = (value) => {
            setPath((path) => {
                for (const q in router.query) {
                    if (q != "page") {
                        path += `${q}=${router.query[q]}&`
                    }
                }
                router.push(`${path}page=${value}`) 
                return path;
            })
            setForceRefresh((prev) => !prev)
        };

    return (
        <Stack direction={'row'} dir='ltr' spacing={1}   >
            <StyledButton color="primary" disabled={pagData.hasPerviousPage ? false : true} onClick={() => {
                push(pagData.perviousPage)
            }}>
                <ArrowBack/>
            </StyledButton>

            {/* First Page */}
            {pagData.page !== 1 && pagData.perviousPage !== 1 ? (
                <>
                    <StyledButton size="small" onClick={() => {
                        push(1)
                    }}>
                        1
                    </StyledButton>
                    <Typography color={Primary} alignSelf="center">
                        ...
                    </Typography>
                </>
            ) : null}

            {pagData.hasPerviousPage ? (
                <StyledButton size='small' onClick={() => {
                    push(pagData.perviousPage)
                }}>
                    {pagData.perviousPage}
                </StyledButton>
            ) : null}

            {/* Current page */}
            <StyledButton size="small" sx={{ color: 'white', backgroundColor: Primary, ":hover": { backgroundColor: Primary, color: "white !important" } }}>
                {pagData.page}
            </StyledButton>

            {/* NEXT PAGE but not last one */}
            {pagData.hasNextPage ? (
                <StyledButton size="small" onClick={() => {
                    push(pagData.nextPage)
                }}>
                    {pagData.nextPage}
                </StyledButton>
            ) : null}


            {/* Last Page */}
            {pagData.page !== pagData.lastPage && pagData.nextPage !== pagData.lastPage && pagData.lastPage !== 0 ? (
                <>
                    <Typography color={Primary} alignSelf="center">
                        ...
                    </Typography>
                    <StyledButton size="small" onClick={() => {
                        push(pagData.lastPage)
                    }}>
                        {pagData.lastPage}
                    </StyledButton>
                </>
            ) : null}


            <StyledButton color="primary" disabled={pagData.hasNextPage ? false : true} onClick={() => {
                push(pagData.nextPage)
            }}>
                <ArrowForward />
            </StyledButton>
        </Stack>
    );
}

 