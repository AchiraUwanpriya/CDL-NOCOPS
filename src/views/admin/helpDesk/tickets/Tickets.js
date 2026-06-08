import { Grid, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmTickets from '../../../../components/forms/admin/helpDesk/FrmTickets';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { useAppContext } from '../../../../store/contexts/AppContext';
import ActivityForm from '../../../common/helpDesk/ActivityForm';
import EntryForm from '../../../common/helpDesk/ActivityForm';
import EntryFormModal from '../../../common/helpDesk/EntryFormModal';
import { GetAllTickets } from '../../../../store/slices/admin/helpDesk/TicketSlices';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Tickets History Page',
  },
];

const Tickets = () => {
  const dispatch = useDispatch();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const { setSelectedTicketId, selectedModel, setSelectedModel } = useAppContext();

  // Auto-refresh tickets every 5 seconds
  useEffect(() => {
    const fetchTickets = () => {
      dispatch(GetAllTickets());
    };

    fetchTickets(); // Fetch immediately on load

    const interval = setInterval(fetchTickets, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  const handleOpenEntryForm = () => {
    setIsEntryFormOpen(true);
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
    setSelectedTicketId('');
    setSelectedModel('U');
    dispatch(GetAllTickets()); // Refresh tickets after closing form
  };

  return (
    <PageContainer title="Tickets History Page" description="this is Tickets page"  >
      <Breadcrumb title="Tickets History Page" items={BCrumb} />
      <Grid container spacing={3} sx={{
        maxWidth: '79vw',      //Add this remove horizontal scroll bar, but issue is scroll bar close then some space will save

      }}>
        <Grid item xs={12} lg={12.7} >
          <FrmTickets onModelOpen={handleOpenEntryForm} />
        </Grid>
        <EntryFormModal open={isEntryFormOpen} onClose={handleCloseEntryForm}>
          {selectedModel === 'U' ? (
            <EntryForm onClose={handleCloseEntryForm} />
          ) : (
            <ActivityForm onClose={handleCloseEntryForm} />
          )}
        </EntryFormModal>
      </Grid>
    </PageContainer>
  );
};

export default Tickets;