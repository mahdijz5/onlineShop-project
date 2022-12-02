import { Box, Chip, Collapse, Divider, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { Router, useRouter } from 'next/router';
import { useState } from 'react'
import { AttachMoney, Bolt, Favorite, MoneyOff, Sort } from "@mui/icons-material"

import Loader from '../components/Loader';
import styled from '@emotion/styled';
import Link from 'next/link';
import SearchSidebar from '../components/Search/SearchSidebar';

const DivededBox = styled(Box)(({ theme }) => ({

}))


const SearchContainer = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true)
  })
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false)
  })

  const sortProduct = (sortByIt) => {
    let query = { ...router.query, sort: sortByIt }
    router.push({
      pathname: "/search",
      query,
    })
  }

  return (
    <Stack direction="row" height="100%">

      <Box width="20%" display={{xs : "none",md : "block"}}>
        <SearchSidebar />
      </Box>

      <Divider orientation='vertical' />

      <Stack width={{xs : "100%" , md : "80%"}} >
        <Stack height="5%" direction="row" justifyContent="left" alignItems="center" color="text.primary" gap="8px">
          <Box width="200px">
            <Typography pl="3px"><Sort /> مرتبط سازی : </Typography>
          </Box>
          <Chip label="محبوب ترین" icon={<Favorite />} onClick={() => { sortProduct("popularity") }} sx={{ cursor: "pointer" }} />
          <Chip label="تازه ترین" icon={<Bolt />} onClick={() => { sortProduct("latest") }} sx={{ cursor: "pointer" }} />
          <Chip label=" گران ترین" icon={<AttachMoney />} onClick={() => { sortProduct("costly") }} sx={{ cursor: "pointer" }} />
          <Chip label="ارزان ترین" icon={<MoneyOff />} onClick={() => { sortProduct("cheap") }} sx={{ cursor: "pointer" }} />

        </Stack>
        <Divider />
        <Box height="95%" sx={{ overflowY: "auto" }} className="niceScroll" pb="2px">
          {loading ? <Loader /> : children}
        </Box>
      </Stack>

    </Stack>
  )
}

export default SearchContainer