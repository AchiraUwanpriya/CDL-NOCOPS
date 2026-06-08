import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmUser from '../../../../components/forms/admin/asset/FrmUser';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'User Page',
  },
];

const User = () => {
  return (
    <PageContainer title="User Page" description="this is User page">
      <Breadcrumb title="User Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="User">
            <FrmUser />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default User;
