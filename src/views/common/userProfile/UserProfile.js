import { Grid } from '@mui/material';
import FrmUserProfile from '../../../components/forms/common/userProfile/FrmUserProfile';
import PageContainer from '../../../components/theme/container/PageContainer';
import ParentCard from '../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'User Profile Page',
  },
];

const UserProfile = () => {
  return (
    <PageContainer title="User Profile Page" description="this is User Profile Page">
      <Breadcrumb title="User Profile Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="User Profile">
            <FrmUserProfile />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
