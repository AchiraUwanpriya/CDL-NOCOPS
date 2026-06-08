import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmEquipment from '../../../../components/forms/admin/asset/FrmEquipment';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Equipment Page',
  },
];

const Equipment = () => {
  return (
    <PageContainer title="Equipment Page" description="this is Equipment page">
      <Breadcrumb title="Equipment Page" items={BCrumb} />

      <Grid container spacing={3} sx={{
        maxWidth: '75vw',  //Add this remove horizontal scroll bar, but issue is scroll bar close then some space will save

      }}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Equipment">
            <FrmEquipment />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Equipment;
