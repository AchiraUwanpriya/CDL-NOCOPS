import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmServerTemplateGroup from '../../../../components/forms/admin/asset/FrmServerTemplateGroup';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    // title: 'Server Template Group Page',
    title: 'Device Category Group Page',
  },
];

const ServerTemplateGroup = () => {
  return (
    <PageContainer title="Device Category Group Page" description="this is Device Category Group Page">
      <Breadcrumb title="Device Category Group Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Device Category Group">
            <FrmServerTemplateGroup />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ServerTemplateGroup;
