import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmModel from '../../../../components/forms/admin/asset/FrmModel';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Model Page',
  },
];

const Model = () => {
  return (
    <PageContainer title="Model Page" description="this is Model page">
      <Breadcrumb title="Model Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Model">
            <FrmModel />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Model;
