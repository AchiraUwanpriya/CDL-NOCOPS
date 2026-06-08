//USer

import { Box, Fab, Grid, Tooltip } from '@mui/material';
import { IconX } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../../components/theme/container/PageContainer';
import FrmAddNewTicket from '../../../components/forms/admin/asset/FrmAddNewTicket';
import ParentCard from '../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { useAppContext } from '../../../store/contexts/AppContext';
import { GetAssignedTickets } from '../../../store/slices/common/helpDesk/HelpDeskAssignedTicketSlices';
import { GetAssigneeTickets } from '../../../store/slices/common/helpDesk/HelpDeskAssigneeTicketSlices';
import { GetHelpDeskChartCounts } from '../../../store/slices/common/helpDesk/HelpDeskTicketSlices';

const EntryForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authSlices);
  const { selectedTicketId } = useAppContext();

  const BCrumb = [
    {
      to: '/',
      title: '',
    },
    {
      title:
        'helpDesk / ' +
        (selectedTicketId ? (userData.Type === 'U' ? 'Update Ticket' : 'View Ticket') : 'Add New Ticket'),
    },
  ];

  const handleTicketSubmit = async () => {
    // Dispatch Redux actions to refresh ticket lists
    dispatch(GetAssignedTickets());
    dispatch(GetAssigneeTickets());
    dispatch(GetHelpDeskChartCounts());

    // Close the form after submission
    onClose();
  };

  return (
    <PageContainer title="Ticket Info Page" description="This is the Ticket Info page">
      <Grid
        item
        xs={12}
        lg={12}
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 1 }}
      >
        <Box>
          <Tooltip title="Close">
            <Fab size="small" color="error" aria-label="Close" onClick={onClose}>
              <IconX width={20} />
            </Fab>
          </Tooltip>
        </Box>
      </Grid>

      <Breadcrumb
        title={
          selectedTicketId ? (userData.Type === 'U' ? 'Update Ticket' : 'View Ticket') : 'Add New Ticket'
        }
        items={BCrumb}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard>
            {/* Pass handleTicketSubmit to refresh data when a ticket is added */}
            <FrmAddNewTicket onSubmit={handleTicketSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EntryForm;
