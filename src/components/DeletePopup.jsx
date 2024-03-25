import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeletePopup = ({ openDelete, handleCloseDelete, handleClickDeleteUser }) => {
    return (
        <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this?
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button onClick={handleCloseDelete} color="primary" variant="outlined">
                    No
                </Button>
                <Button onClick={handleClickDeleteUser} color="error" variant="contained">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeletePopup;
