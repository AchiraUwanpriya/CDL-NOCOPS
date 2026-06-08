import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmBrand from '../../../../components/forms/admin/asset/FrmBrand';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Brand Page',
  },
];

const Brand = () => {
  return (
    <PageContainer title="Brand Page" description="this is Brand page">
      <Breadcrumb title="Brand Page" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Brand">
            <FrmBrand />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Brand;
