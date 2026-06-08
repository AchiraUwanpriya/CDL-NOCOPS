import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmCompany from '../../../../components/forms/admin/asset/FrmCompany';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Company Page',
  },
];

const Company = () => {
  return (
    <PageContainer title="Company Page" description="this is Company page">
      <Breadcrumb title="Company Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Company">
            <FrmCompany />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Company;
