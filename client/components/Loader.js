import { Stack } from '@mui/material';
import Image from 'next/image';

const Loader = () => {
    return(
        <>
            <Stack width="100%" height="100%" justifyContent={"center"} alignItems="center">
            <Image src="/icon/loader.svg"   height={"200px"} width={"200px"}/>
            </Stack>
        </>
    )
}

export default Loader