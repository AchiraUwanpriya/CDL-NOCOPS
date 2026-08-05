// import React, { useEffect, useState } from 'react';
// import { Box, Grid, Paper, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetHelpDeskChartCounts } from '../../../store/slices/common/helpDesk/HelpDeskTicketSlices';
// import { DoPin } from '../../../store/slices/common/deviceInfo/DeviceInfoSlices';
// import DoughnutChart from '../../../components/app/charts/DoughnutChart';
// import DataCenterCard from '../../../components/dashboards/dataCenter/DataCenterCard';
// import Spinner from '../../../components/app/spinner/Spinner';
// import NetworkStatus from '../networkStatus/NetworkStatus';

// const DashboardSummary = () => {
//   const dispatch = useDispatch();
//   const { HDChartCounts } = useSelector((state) => state.helpDeskTicketSlices);
//   const { DoPinData, loading } = useSelector((state) => state.DeviceInfoSlices);
//   const [localData, setLocalData] = useState([]);

//   // Load or fetch DoPin data
//   useEffect(() => {
//     const storedData = sessionStorage.getItem('DoPinData');
//     const storedTime = sessionStorage.getItem('DoPinDataTime');
//     const isExpired = storedTime ? (Date.now() - storedTime) > 5 * 60 * 1000 : true;

//     if (storedData && !isExpired) {
//       setLocalData(JSON.parse(storedData));
//     } else {
//       dispatch(DoPin());
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (DoPinData.length > 0) {
//       sessionStorage.setItem('DoPinData', JSON.stringify(DoPinData));
//       sessionStorage.setItem('DoPinDataTime', Date.now());
//       setLocalData(DoPinData);
//     }
//   }, [DoPinData]);

//   useEffect(() => {
//     dispatch(GetHelpDeskChartCounts());
//   }, [dispatch]);

//   // Categorize device data
//   const db = localData.filter((item) => item.category.includes('DB'));
//   const app = localData.filter((item) => item.category.includes('APP'));
//   const nvr = localData.filter((item) => item.category.includes('NVR'));
//   const fw = localData.filter((item) => item.category.includes('FW'));
//   const us = localData.filter((item) => item.category.includes('USER'));

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         {/* Help Desk */}
//         <Grid item xs={12}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Paper sx={{ p: 2 }}>
//                 <Typography variant="h6" gutterBottom>Help Desk</Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     {HDChartCounts.length > 0 && (
//                       <DoughnutChart title="Incident" data={HDChartCounts[0].Sectors} />
//                     )}
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     {HDChartCounts.length > 0 && (
//                       <DoughnutChart title="Status" data={HDChartCounts[2].Sectors} />
//                     )}
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Device Status */}
//             <Grid item xs={12} md={6}>
//               <Paper sx={{ p: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
//                 <Typography variant="h6" gutterBottom>Device Status</Typography>
//                 <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
//                   {localData.length > 0 ? (
//                     <Grid container spacing={2}>
//                       <Grid item xs={12}><DataCenterCard title="Visualization" data={nvr} /></Grid>
//                       <Grid item xs={12}><DataCenterCard title="Databases" data={db} /></Grid>
//                       <Grid item xs={12}><DataCenterCard title="Application Server" data={app} /></Grid>
//                       <Grid item xs={12}><DataCenterCard title="Network Devices" data={fw} /></Grid>
//                       <Grid item xs={12}><DataCenterCard title="CDL Devices" data={us} /></Grid>
//                     </Grid>
//                   ) : (
//                     <Box
//                       sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}
//                     >
//                       <Spinner />
//                       <Typography variant="h6">Checking Devices...</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Network Status */}
//         <Grid item xs={12}>
//           <Paper sx={{ p: 1.2, height: 400, display: 'flex', flexDirection: 'column' }}>
//             <Typography variant="h6" gutterBottom>Network Status</Typography>
//             <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
//               <NetworkStatus />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DashboardSummary;

import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Avatar, Stack, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetHelpDeskChartCounts } from '../../../store/slices/common/helpDesk/HelpDeskTicketSlices';
import { DoPin } from '../../../store/slices/common/deviceInfo/DeviceInfoSlices';
import DoughnutChart from '../../../components/app/charts/DoughnutChart';
import Spinner from '../../../components/app/spinner/Spinner';
import { Fade } from '@mui/material';
import NetworkStatus from '../networkStatus/NetworkStatus';
import ApplicationServer from "../../../assets/deviceinfo/Application Server.png"
import CDLDevices from "../../../assets/deviceinfo/CDL Devices.png"
import Databases from "../../../assets/deviceinfo/Databases.png"
import NetwrkDevices from "../../../assets/deviceinfo/Network Devices.png"
import Visualization from "../../../assets/deviceinfo/Visualization.png"
import RFID from "../../../assets/deviceinfo/RFID.png"
import Other from "../../../assets/deviceinfo/Other.png"

const DashboardSummary = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { HDChartCounts } = useSelector((state) => state.helpDeskTicketSlices);
  const { DoPinData, loading } = useSelector((state) => state.DeviceInfoSlices);
  const [localData, setLocalData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [chartIndex, setChartIndex] = useState(0); // For charts changing

  useEffect(() => {
    const storedData = sessionStorage.getItem('DoPinData');
    const storedTime = sessionStorage.getItem('DoPinDataTime');
    const isExpired = storedTime ? (Date.now() - storedTime) > 5 * 60 * 1000 : true;

    if (storedData && !isExpired) {
      const parsedData = JSON.parse(storedData);
      setLocalData(parsedData);
      groupByCategory(parsedData);
    } else {
      dispatch(DoPin());
    }
  }, [dispatch]);

  useEffect(() => {
    if (DoPinData.length > 0) {
      sessionStorage.setItem('DoPinData', JSON.stringify(DoPinData));
      sessionStorage.setItem('DoPinDataTime', Date.now());
      setLocalData(DoPinData);
      groupByCategory(DoPinData);
    }
  }, [DoPinData]);

  useEffect(() => {
    dispatch(GetHelpDeskChartCounts());
  }, [dispatch]);

  // Group data by category dynamically like DeviceInfo.js
  const groupByCategory = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const category = item.category || 'Uncategorized';
      const categoryname = item.categoryname || category;

      if (!grouped[category]) {
        grouped[category] = {
          categoryname: categoryname,
          items: [],
        };
      }
      grouped[category].items.push(item);
    });
    setGroupedData(grouped);
  };

  //filter the devices images based on category(Cards images of Device Info page )
  const getTypeImage = (category) => {
    switch (category) {
      case "SER": return ApplicationServer;
      case "USER": return CDLDevices;
      case "DB": return Databases;
      case "FW": return NetwrkDevices;
      case "NVR": return Visualization;
      case "RFID": return RFID;
      default: return Other;
    }
  };

  const renderCategoryCard = (categoryKey, group) => (
    <Paper key={categoryKey} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', colors: 'black' }}>
        {group.categoryname}
      </Typography>
      {group.items.map((stat, idx) => (
        <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              src={getTypeImage(stat.category)}
              alt={stat.type}
              sx={{ width: 30, height: 30 }}
              variant="rounded"
            />
            <Typography variant="body2" sx={{ fontWeight: 'bold', colors: 'black' }}>
              {stat.type}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark', fontWeight: 'bold', width: 35, height: 35, fontSize: 14 }}>
              {stat.upCount}
            </Avatar>
            <Avatar sx={{ bgcolor: 'error.light', color: 'error.dark', fontWeight: 'bold', width: 35, height: 35, fontSize: 14 }}>
              {stat.downCount}
            </Avatar>
          </Stack>
        </Stack>
      ))}
    </Paper>
  );

  return (
    <Box sx={{ flexGrow: 1, mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>

            {/* Help Desk - include 3 charts and with transforming*/}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 1.5,
                  height: 400,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>Help Desk Status</Typography>

                <Box sx={{ height: '85%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', position: 'relative',mt:2 }}>
                  <Fade in={chartIndex === 0} timeout={500} unmountOnExit>
                    <Box sx={{ display: 'flex', gap: 2, position: 'absolute', width: '100%', justifyContent: 'space-around' }}>
                      {HDChartCounts.length > 0 && (
                        <DoughnutChart title="Incident" data={HDChartCounts[0].Sectors} showLegend={true} customLegendType="countOnly" />
                      )}
                      {HDChartCounts.length > 0 && (
                        <DoughnutChart title="Status" data={HDChartCounts[2].Sectors} showLegend={true} customLegendType="countOnly" />
                      )}
                    </Box>
                  </Fade>

                  <Fade in={chartIndex === 1} timeout={500} unmountOnExit>
                    <Box sx={{ display: 'flex', gap: 2, position: 'absolute', width: '100%', justifyContent: 'space-around' }}>
                      {HDChartCounts.length > 0 && (
                        <DoughnutChart title="Status" data={HDChartCounts[2].Sectors} showLegend={true} customLegendType="countOnly" />
                      )}
                      {HDChartCounts.length > 0 && (
                        <DoughnutChart title="Severity" data={HDChartCounts[1].Sectors} showLegend={true} customLegendType="countOnly" />
                      )}
                    </Box>
                  </Fade>
                </Box>

                {/* Arrows */}
                {chartIndex === 0 ? (
                  <Box
                    onClick={() => setChartIndex(1)}
                    sx={{
                      position: 'absolute',
                      right: 20,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: 18,
                      userSelect: 'none',
                    }}
                  >
                    ➡️
                  </Box>
                ) : (
                  <Box
                    onClick={() => setChartIndex(0)}
                    sx={{
                      position: 'absolute',
                      left: 20,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: 18,
                      userSelect: 'none',
                    }}
                  >
                    ⬅️
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Device Status */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 0, // remove Paper padding to control spacing precisely
                  height: 400,
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: 'hidden', // prevent scroll bleed
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* Sticky Header */}
                <Box
                  sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    // backgroundColor: 'white',
                    backgroundColor: theme.palette.background.paper,
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ m: 0 }}>
                    Device Status
                  </Typography>
                </Box>

                {/* Scrollable Content */}
                <Box sx={{ height: 'calc(100% - 56px)', overflowY: 'auto', p: 1.5, mt: -2 }}>
                  {Object.keys(groupedData).length > 0 ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        {Object.entries(groupedData)
                          .slice(0, Math.ceil(Object.keys(groupedData).length / 2))
                          .map(([categoryKey, group]) => renderCategoryCard(categoryKey, group))
                        }
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {Object.entries(groupedData)
                          .slice(Math.ceil(Object.keys(groupedData).length / 2))
                          .map(([categoryKey, group]) => renderCategoryCard(categoryKey, group))
                        }
                      </Grid>
                    </Grid>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                      }}
                    >
                      <Spinner />
                      <Typography variant="h6" sx={{ mb: 18 }}>Checking Devices...</Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>

          </Grid>
        </Grid>

        {/* Network Status */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 0, // Remove default padding
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3,
              borderRadius: 2,
              overflow: 'hidden', // Prevent scroll bleed
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
              },
            }}
          >
            {/* Sticky Header */}
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                // backgroundColor: 'white', // Match Paper background
                backgroundColor: theme.palette.background.paper,
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ m: 0 }}>
                Network Status
              </Typography>
            </Box>

            {/* Scrollable Content */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                p: 2, // Inner content padding
                mt: -2
              }}
            >
              <NetworkStatus />
            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default DashboardSummary;