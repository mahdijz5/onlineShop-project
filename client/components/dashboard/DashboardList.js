import styled from "@emotion/styled"
import { Edit, Favorite, Logout, Message, Person, ShoppingBag, ShoppingCart } from "@mui/icons-material"
import { Avatar, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, } from "@mui/material"

const StyledList = styled(List)(({theme}) => ({
  color : theme.palette.text.primary
}))

const StyledListItemIcon = styled(ListItemIcon)(({theme}) => ({
  color : theme.palette.text.primary
}))

const DashboardList = () => {
  return (
    <>
      <StyledList >
        <ListItem >
            <Stack sx={{maxWidth : "100%"}} >
              <Stack direction="row" justifyContent="center" alignItems="center"  gap='4px' sx={{maxWidth : "100%"}}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Stack   sx={{maxWidth : "100%",overflow : "hidden"}} >
                <Typography  variant='subtitle1'>مهدی جاویدی</Typography>
                <Typography variant='subtitle2'>mahdi.jz.@gmail.com</Typography>
                </Stack>
                <IconButton sx={{color : "text.primary"}}>
                  <Edit/>
                </IconButton>
              </Stack>
            </Stack>
        </ListItem>
        <ListItem >
          <ListItemButton >
            <StyledListItemIcon>
              <ShoppingCart />
            </StyledListItemIcon>
            <ListItemText primary="سبد خرید" />
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton >
            <StyledListItemIcon>
              <ShoppingBag />
            </StyledListItemIcon>
            <ListItemText primary="سفارش ها" />
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <StyledListItemIcon>
              <Favorite />
            </StyledListItemIcon>
            <ListItemText primary="لیست های من" />
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <StyledListItemIcon>
              <Message />
            </StyledListItemIcon>
            <ListItemText primary="دیدگاه ها" />
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <StyledListItemIcon>
              <Person />
            </StyledListItemIcon>
            <ListItemText primary="اطلاعات شخصی" />
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <StyledListItemIcon  >
              <Logout />
            </StyledListItemIcon>
            <ListItemText primary="خروج" />
          </ListItemButton>
        </ListItem>
      </StyledList>
    </>
  )
}

export default DashboardList