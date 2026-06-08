import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmStatus from '../../../../components/forms/admin/helpDesk/FrmStatus';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Status Page',
  },
];

const Status = () => {
  return (
    <PageContainer title="Status Page" description="this is Status page">
      {/* breadcrumb */}
      <Breadcrumb title="Status Page" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Status">
            <FrmStatus />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Status;
