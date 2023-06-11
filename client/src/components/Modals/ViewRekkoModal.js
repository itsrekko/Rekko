import React from 'react'
import { Modal, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const ViewRekkoModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const useAddRekkoModal = makeStyles(() => ({
        modalContainer: {
            display: 'flex',
            
        },

    }))

    const classes = useAddRekkoModal()

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                AddPost
            </Box>
        </Modal>
    )
}

export default ViewRekkoModal