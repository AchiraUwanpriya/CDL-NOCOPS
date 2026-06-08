import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmServer from '../../../../components/forms/admin/asset/FrmServer';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Device Adding Page',
  },
];

const Server = () => {
  return (
    <PageContainer title="Device Adding Page" description="this is Device Adding Page">
      <Breadcrumb title="Device Adding Page" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Device Adding Page">
            <FrmServer />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Server;
