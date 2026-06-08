import { Box, Fab, Grid, Tooltip } from '@mui/material';
import { IconX } from '@tabler/icons';
import PageContainer from '../../../components/theme/container/PageContainer';
import EquipmentForm1 from '../../../components/forms/admin/asset/EquipmentForm1';
import ParentCard from '../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: '',
  },
  {
    title: 'Add New Asset',
  },
];

const AssetInfo = ({onClose}) => {
  return (
    <PageContainer title="Asset Info Page" description="this is Asset Info page">
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

      <Breadcrumb title="Add New Asset" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Add New Asset Info">
            <EquipmentForm1 />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AssetInfo;
