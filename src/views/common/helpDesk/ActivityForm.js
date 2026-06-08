import { Box, Fab, Grid, Tooltip } from '@mui/material';
import { IconX } from '@tabler/icons';
import PageContainer from '../../../components/theme/container/PageContainer';
import FrmTicketActivity from '../../../components/forms/admin/asset/FrmTicketActivity';
import ParentCard from '../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';


const ActivityForm = ({ onClose }) => {
  const BCrumb = [
    {
      to: '/',
      title: '',
    },
    {
      title: 'HelpDesk/Ticket Activity Info',
    },
  ];
  return (
    <PageContainer title="Ticket Activity Info Page" description="this is Ticket Activity Info page">
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

      <Breadcrumb title={ 'Ticket Activity Info'} items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard >
            <FrmTicketActivity />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ActivityForm;
