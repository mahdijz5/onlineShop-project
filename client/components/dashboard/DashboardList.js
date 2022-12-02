import styled from "@emotion/styled"
import { Edit, Favorite, Logout, Message, Person, ShoppingBag, ShoppingCart } from "@mui/icons-material"
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { General } from "../../context/context"
import NavLink from "../NavLink"

const StyledList = styled(List)(({ theme }) => ({
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3]
}))

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.text.primary
}))


const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "5px 0"
}))


const CustomListItem = ({ label, href, auth, icon }) => {
  const { user } = useContext(General)
  const router = useRouter()
  return (
    <>
      {user.name == undefined && auth ? (
        <StyledListItem >
          <ListItemButton  >
            <StyledListItemIcon>
              <GetAppropirateIcon icon={icon} />
            </StyledListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </StyledListItem >
      ) : (
        <StyledListItem onClick={() => {
          if (label === "خروج") {
            localStorage.clear()
            router.replace("/")
          }
        }}  >
          <NavLink href={href} activeClassName="activeLink" >
            <a style={{ width: "100%" }}>
              <ListItemButton  >
                <StyledListItemIcon>
                  <GetAppropirateIcon icon={icon} />
                </StyledListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </a>
          </NavLink >
        </StyledListItem >
      )}
    </>
  )
}

const GetAppropirateIcon = ({ icon }) => {
  switch (icon) {
    case "cart":
      return <ShoppingCart />
      break;
    case "order":
      return <ShoppingBag />
      break;

    case "favorite":
      return <Favorite />
      break;

    case "logout":
      return <Logout />
      break;

    case "message":
      return <Message />
      break;

    case "person":
      return <Person />
      break;



  }
}

const DashboardList = () => {
  const { user } = useContext(General)
  const [list, setList] = useState([])

  useEffect(() => {
    setList([
      {
        label: "سبد خرید",
        icon: "cart",
        href: "/dashboard/cart",
        auth: false,
      },
      {
        icon: "order",
        label: "سفارش ها",
        href: "/dashboard/orders",
        auth: true,
      },
      {
        icon: "favorite",
        label: "لیست های من",
        href: "/dashboard/list",
        auth: true,
      },
      {
        icon: "message",
        label: "دیدگاه",
        href: "/dashboard/comments",
        auth: true,
      },
      {
        icon: "person",
        label: "اطلاعات شخصی",
        href: "/dashboard/user-data",
        auth: true,
      },
      {
        icon: "logout",
        label: "خروج",
        href: "#",
        auth: true,
      },
    ])
  }, [])


  return (
    <>
      <StyledList >
        <StyledListItem >
          <Stack sx={{ maxWidth: "100%" }} width="100%" >
            {user.name != undefined ? (
              <Stack direction="row" justifyContent="center" alignItems="center" gap='4px' sx={{ maxWidth: "100%" }}>
                <Avatar alt={user.name} src={`http://localhost:3001/uploads/profiles/${user.profileImg}`} />
                <Stack sx={{ maxWidth: "100%", overflow: "hidden" }} >
                  <Typography variant='subtitle1'>{user.name}</Typography>
                  <Typography variant='subtitle2'>{user.email}</Typography>
                </Stack>
                <Link href="/dashboard/user-data">
                  <IconButton sx={{ color: "text.primary" }} >
                    <Edit />
                  </IconButton>
                </Link>
              </Stack>
            ) : (
              <Stack justifyContent={'center'} alignItems="center" width="100%">
                <Link href="/user/sign-in">
                  <Button variant="outlined"  >
                    ثبت نام / ورود <Person />
                  </Button>
                </Link>
              </Stack>
            )}
          </Stack>
        </StyledListItem>

        {list.map((item, index) => (
          <CustomListItem key={index} label={item.label} href={item.href} auth={item.auth} icon={item.icon} />
        ))}
      </StyledList>
    </>
  )
}

export default DashboardList