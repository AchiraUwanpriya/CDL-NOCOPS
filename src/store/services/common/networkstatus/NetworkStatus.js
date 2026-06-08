import React, { useState, useEffect } from 'react';
import BandwidthChart from '../../../../components/app/charts/Bandwidth';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from "axios";

import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function NetwworkStatus() {
  let timeout = 0;
  const [ispNow, setispNow] = useState(["Loading..."])
  const url="http://ip-api.com/json"
  
  useEffect(() => {
    timeout = setInterval(() => {
      axios({
          url:url,
          method: "GET"
        })
        .then(res => {
          setispNow(res.data.isp.toUpperCase());
          ispNow = res.data.isp;
          console.log(ispNow);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        })

    }, 30000);

    return () => {
      clearInterval(timeout);
    }
  }, [])

  return (
    <Box sx={{ width: '94%', alignItems: 'center', marginLeft: '4.5%', flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Item>
            <Typography align="Center" style={{ color: '#1976D2', fontSize: "25px", fontWeight: "bold" }}>
              {ispNow}
            </Typography>
            <br />
            <BandwidthChart  height="50"/>
          </Item>
        </Grid>

        <Grid item xs={12} >
          <Item>
            <Typography align="Center" style={{ color: '#1976D2', fontSize: "25px", fontWeight: "bold" }}>
              {ispNow}
            </Typography>
            <br />
            <BandwidthChart  height="50"/>
          </Item>
        </Grid>


        {/* { <Grid item xs={12} >
          <Item>
            <DownloadSpeedChart />
          </Item>
        </Grid> }
        { <Grid item xs={12} >
          <Item>
            <UploadSpeedChart />
          </Item>
        </Grid> } */}

      </Grid>
    </Box>
  );
}


