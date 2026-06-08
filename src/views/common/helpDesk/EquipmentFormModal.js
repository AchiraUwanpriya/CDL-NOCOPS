import { Dialog, DialogActions, DialogContent } from '@mui/material';
import Slide from '@mui/material/Slide';
import React from 'react';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const EquipmentFormModal = ({ open, onClose, children }) => {
  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={onClose} TransitionComponent={Slide} transitionDuration={500}>
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

export default EquipmentFormModal;
