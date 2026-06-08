import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmDepartment from '../../../../components/forms/admin/helpDesk/FrmDepartment';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Department Page',
  },
];

const Department = () => {
  return (
    <PageContainer title="Department Page" description="this is Department page">
      <Breadcrumb title="Department Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Department">
            <FrmDepartment />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Department;
