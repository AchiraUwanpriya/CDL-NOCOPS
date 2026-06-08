import { Grid } from '@mui/material';
import PageContainer from '../../../../components/theme/container/PageContainer';
import FrmAssetInfo from '../../../../components/forms/admin/asset/FrmAssetInfo';
import ParentCard from '../../../../components/theme/shared/ParentCard';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb =[{
    to: '/',
    title: 'Admin',
  },
  {
    title: 'Asset Info Page',
  },
];

const AssetInfo = () => {
  return (
    <PageContainer title="Asset Info Page" description="this is Asset Info page">
      <Breadcrumb title="Asset Info Page" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ParentCard title="Asset Info">
            <FrmAssetInfo />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AssetInfo;
