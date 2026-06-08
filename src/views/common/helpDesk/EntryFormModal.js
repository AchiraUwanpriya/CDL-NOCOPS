import { Dialog, DialogActions, DialogContent } from '@mui/material';
import React from 'react';

const EntryFormModal = ({ open, onClose, children }) => {

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={onClose}>
      {/* <DialogTitle>Add New Ticket</DialogTitle> */}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose} color="primary">
          Cancel
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};



export default EntryFormModal;
