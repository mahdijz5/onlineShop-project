import styled from "@emotion/styled"
import { Box, Stack, Typography } from "@mui/material"

const DviderBox = styled(Box)(({theme}) => ({
    borderBottom : `1px solid ${theme.palette.text.primary}`
}))

const DviderTitle = ({title,...props}) =>{
    return (
        <Stack direction={"row"} alignItems={"center"} {...props} >
            <Typography pl="8px" display="inline-block" variant="h4" width="15%" color="text.primary">{title}</Typography>
            <DviderBox width="85%" display={'block'} >
            </DviderBox>
        </Stack>
    )
}

export default DviderTitle