import React from 'react'
import { Modal, Box, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ErrorModal = () => {

    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Error fetching data
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        We could not find the requested resource please try again later
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default ErrorModal