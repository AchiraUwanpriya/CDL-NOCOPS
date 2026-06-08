import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmSeverity from '../../../../components/forms/admin/helpDesk/FrmSeverity';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Severity Page',
  },
];

const Severity = () => {
  return (
    <PageContainer title="Severity Page" description="this is Severity page">
      {/* breadcrumb */}
      <Breadcrumb title="Severity Page" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Severity">
            <FrmSeverity />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Severity;
