import { Grid } from '@mui/material';
import FrmUserAccess from '../../../components/forms/admin/userAccess/FrmUserAccess';
import PageContainer from '../../../components/theme/container/PageContainer';
import ParentCard from '../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'User Access Page',
  },
];

const UserAccess = () => {
  return (
    <PageContainer title="User Access Page" description="this is User Access Page">
      <Breadcrumb title="User Access Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="User Access">
            <FrmUserAccess />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserAccess;
