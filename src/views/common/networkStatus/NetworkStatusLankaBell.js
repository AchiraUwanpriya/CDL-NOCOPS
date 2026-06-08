import React, { useState} from 'react';
import BandwidthChart from '../../../components/app/charts/Bandwidth';
import DownloadSpeedChart from '../../../components/app/charts/DownloadSpeed';
import UploadSpeedChart from '../../../components/app/charts/UploadSpeed';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function NetworkStatus(props) {

  const [ispNow, setispNow] = useState(props.isp)
//   function to get isp
//   useEffect(() => {
//     let timeout = setInterval(() => {
//       axios
//         .get("http://ip-api.com/json")
//         .then(res => {
//           setispNow(res.data.isp.toUpperCase());
//           // ispNow = res.data.isp;
//         })
//         .catch((error) => {
//           console.error("There was an error!", error);
//         })

//     }, 30000);

//     return () => {
//       clearInterval(timeout);
//     }
//   }, [])

  return (
    <Box sx={{ width: '100%', alignItems: 'center', flexGrow: 1 }}>
      <Typography align="Center" style={{ color: '#1976D2', fontSize: "25px", fontWeight: "bold" }}>
        {ispNow}
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Item>
            <BandwidthChart height="30" />
            
          </Item>
        </Grid>
        <Grid item xs={12} >
          <Item>
            <DownloadSpeedChart />
          </Item>
        </Grid>
        <Grid item xs={12} >
          <Item>
            <UploadSpeedChart />
          </Item>
        </Grid>

      </Grid>
    </Box>
  );
}


