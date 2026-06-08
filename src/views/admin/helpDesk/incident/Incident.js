import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmIncident from '../../../../components/forms/admin/helpDesk/FrmIncident';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Incident Page',
  },
];

const Incident = () => {
  return (
    <PageContainer title="Incident Page" description="this is Incident page">

      <Breadcrumb title="Incident Page" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Incident">
            <FrmIncident />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Incident;
