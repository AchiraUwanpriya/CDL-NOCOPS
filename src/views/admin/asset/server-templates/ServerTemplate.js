import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmServerTemplate from '../../../../components/forms/admin/asset/FrmServerTemplate';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Device Types Page',
  },
];

const ServerTemplate = () => {
  return (
    <PageContainer title="Device Types Page" description="this is Device Types Page">
      <Breadcrumb title="Device Types Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Device Type">
            <FrmServerTemplate />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ServerTemplate;
