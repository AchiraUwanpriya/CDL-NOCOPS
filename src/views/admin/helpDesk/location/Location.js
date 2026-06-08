import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmLocation from '../../../../components/forms/admin/helpDesk/FrmLocation';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Location Page',
  },
];

const Location = () => {
  return (
    <PageContainer title="Location Page" description="this is Location page">
      <Breadcrumb title="Location Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Location">
            <FrmLocation />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Location;
