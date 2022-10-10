import styled from '@emotion/styled';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import { useState } from 'react';


const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: 24,
    padding: "4%",
    borderRadius: 20,
}))

const Confirmation = ({ open, setOpen, title, description, func,funcParameter }) => {

    const handleClose = () => setOpen(false);

    return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <StyledBox textAlign="center">
                        <Typography id="transition-modal-title" variant="h4" component="h2">
                            {title}
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {description}
                        </Typography>
                        <Box mt={2}>
                            <Button variant="contained" sx={{ display: "inline-block" }} color="error" onClick={handleClose} >
                                خیر
                            </Button>
                            {"  "}
                            <Button variant="contained" sx={{ display: "inline-block" }} color="success" onClick={() => {
                                func(funcParameter)
                            }} >
                                بله
                            </Button>
                        </Box>
                    </StyledBox>
                </Fade>
            </Modal>
    );
}


export default Confirmation