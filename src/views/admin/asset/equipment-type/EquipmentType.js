import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmEquipmentType from '../../../../components/forms/admin/asset/FrmEquipmentType';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Equipment Type Page',
  },
];

const EquipmentType = () => {
  return (
    <PageContainer title="Equipment Type Page" description="this is Equipment Type page">
      <Breadcrumb title="Equipment Type Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Equipment Type">
            <FrmEquipmentType />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EquipmentType;
