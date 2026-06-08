import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmCategory from '../../../../components/forms/admin/asset/FrmCategory';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb =[{
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Category Page',
  },
];

const Category = () => {
  return (
    <PageContainer title="Category Page" description="this is Category page">
      <Breadcrumb title="Category Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Category">
            <FrmCategory />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Category;
