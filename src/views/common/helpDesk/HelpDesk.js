import { Add as AddIcon } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tickets from '../../../components/dashboards/helpDesk/Tickets';
import { useAppContext } from '../../../store/contexts/AppContext';
import { GetAssignedTickets } from '../../../store/slices/common/helpDesk/HelpDeskAssignedTicketSlices';
import { GetAssigneeTickets } from '../../../store/slices/common/helpDesk/HelpDeskAssigneeTicketSlices';
import { GetHelpDeskChartCounts } from '../../../store/slices/common/helpDesk/HelpDeskTicketSlices';
import DoughnutChart from '../../../components/app/charts/DoughnutChart';
import ActivityForm from './ActivityForm';
import EntryForm from './EntryForm';
import EntryFormModal from './EntryFormModal';

const HelpDesk = () => {
  const dispatch = useDispatch();
  const { data: AssignedTicketList } = useSelector((state) => state.helpDeskAssignedTicketSlices);
  const { data: AssigneeTicketList } = useSelector((state) => state.helpDeskAssigneeTicketSlices);
  const { HDChartCounts } = useSelector((state) => state.helpDeskTicketSlices);

  const [value, setValue] = React.useState('1');
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const { setSelectedTicketId, selectedModel, setSelectedModel, setSelecteTab } = useAppContext();

  // Auto-refresh tickets every 5 seconds
  useEffect(() => {
    const fetchTickets = () => {
      dispatch(GetAssignedTickets());
      dispatch(GetAssigneeTickets());
      dispatch(GetHelpDeskChartCounts());
    };

    fetchTickets(); // Fetch immediately on load

    const interval = setInterval(fetchTickets, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenEntryForm = () => {
    setIsEntryFormOpen(true);
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
    setSelectedTicketId('');
    setSelectedModel('U');
  };

  return (
    <Box >
      <Grid container spacing={3} >
        <Grid item xs={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={4}>
              {HDChartCounts.length > 0 && <DoughnutChart title={'Incident'} data={HDChartCounts[0].Sectors} />}
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              {HDChartCounts.length > 0 && <DoughnutChart title={'Status'} data={HDChartCounts[2].Sectors} />}
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              {HDChartCounts.length > 0 && <DoughnutChart title={'Severity'} data={HDChartCounts[1].Sectors} />}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <TabContext value={value}>
            <Box>
              <TabList onChange={handleChange}>
                <Tab label="Assigned Tickets" value="1" />
                <Tab label="Assignee Tickets" value="2" />
              </TabList>
            </Box>

            <Grid item xs={12} lg={11.82} justifyContent="flex-end" display="flex" alignItems="flex-start" mt={-3}>
              <Button color="primary" startIcon={<AddIcon />} onClick={handleOpenEntryForm}>
                Add New Ticket
              </Button>
              <EntryFormModal open={isEntryFormOpen} onClose={handleCloseEntryForm}>
                {selectedModel === 'U' ? <EntryForm onClose={handleCloseEntryForm} /> : <ActivityForm onClose={handleCloseEntryForm} />}
              </EntryFormModal>
            </Grid>

            <TabPanel value="1" onClick={() => setSelecteTab(1)}>
              <Tickets title={'Assigned Tickets'} data={AssignedTicketList} onModelOpen={handleOpenEntryForm} />
            </TabPanel>
            <TabPanel value="2" onClick={() => setSelecteTab(2)}>
              <Tickets title={'Assignee Tickets'} data={AssigneeTicketList} onModelOpen={handleOpenEntryForm} />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HelpDesk;