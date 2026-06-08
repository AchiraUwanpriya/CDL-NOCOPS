import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmActivity from '../../../../components/forms/admin/helpDesk/FrmActivity';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Activity Page',
  },
];

const Activity = () => {
  return (
    <PageContainer title="Activity Page" description="this is Activity page">
      <Breadcrumb title="Activity Page" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Activity">
            <FrmActivity />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Activity;
