//This Only consist with Ping all devices at once(Not Seperating)

// import { Box, Grid, Typography, Snackbar, Alert } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import DataCenterCard from '../../../components/dashboards/dataCenter/DataCenterCard';
// import Spinner from '../../../components/app/spinner/Spinner';

// const HelpDesk = () => {
//   const { DoPinData, DoPinMessage } = useSelector((state) => state.DeviceInfoSlices);

//   const [localData, setLocalData] = useState([]);
//   const [groupedData, setGroupedData] = useState({});
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [lastSeenTime, setLastSeenTime] = useState(0);

//   useEffect(() => {
//     const storedData = sessionStorage.getItem('DoPinData');
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setLocalData(parsedData);
//       groupByCategory(parsedData);
//     }
//   }, []);

//   useEffect(() => {
//     if (DoPinData.length > 0) {
//       const now = Date.now();
//       const lastUpdate = sessionStorage.getItem('DoPinDataTime');

//       if (!lastSeenTime || lastUpdate > lastSeenTime) {
//         setOpenSnackbar(true);
//         setLastSeenTime(now);
//       }

//       sessionStorage.setItem('DoPinData', JSON.stringify(DoPinData));
//       sessionStorage.setItem('DoPinDataTime', now);
//       setLocalData(DoPinData);
//       groupByCategory(DoPinData);
//     }
//   }, [DoPinData]);

//   const groupByCategory = (data) => {
//     const grouped = {};
//     data.forEach((item) => {
//       const category = item.category || 'Uncategorized';
//       const categoryname = item.categoryname || category;

//       if (!grouped[category]) {
//         grouped[category] = {
//           categoryname: categoryname,
//           items: [],
//         };
//       }
//       grouped[category].items.push(item);
//     });
//     setGroupedData(grouped);
//   };

//   const handleSnackbarClose = () => setOpenSnackbar(false);

//   return localData.length > 0 ? (
//     <Box>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Grid container spacing={3}>
//             {Object.entries(groupedData).map(([category, group]) => (
//               <Grid item xs={12} sm={6} lg={4} key={category}>
//                 <DataCenterCard title={group.categoryname} data={group.items} />
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={openSnackbar}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={DoPinMessage === 'Message sent successfully!' ? 'success' : 'error'}
//           sx={{
//             width: '400px',
//             minWidth: '400px',
//             fontSize: '1.1rem',
//             padding: '16px',
//             borderRadius: '8px',
//             fontWeight: 'bold',
//           }}
//         >
//           {DoPinMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   ) : (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '20vh',
//       }}
//     >
//       <Box sx={{ marginTop: -20 }}>
//         <Spinner />
//         <Typography variant="h5" sx={{ marginTop: -37 }}>
//           Checking Devices...
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default HelpDesk;




//This Consist with Ping all Devices and Ping by Individual as tab panel views 

import { Box, Grid, Typography, Snackbar, Alert, Tabs, Tab, Paper, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataCenterCard from '../../../components/dashboards/dataCenter/DataCenterCard';
import Spinner from '../../../components/app/spinner/Spinner';
import { DoPinOne } from '../../../store/slices/common/deviceInfo/DeviceInfoSlices';
import { IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const HelpDesk = () => {
  const { DoPinData, DoPinMessage } = useSelector((state) => state.DeviceInfoSlices);
  const [activeTab, setActiveTab] = useState(0);
  const [localData, setLocalData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [lastSeenTime, setLastSeenTime] = useState(0);

  useEffect(() => {
    const storedData = sessionStorage.getItem('DoPinData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLocalData(parsedData);
      groupByCategory(parsedData);
    }
  }, []);

  useEffect(() => {
    if (DoPinData.length > 0) {
      const now = Date.now();
      const lastUpdate = sessionStorage.getItem('DoPinDataTime');

      if (!lastSeenTime || lastUpdate > lastSeenTime) {
        setOpenSnackbar(true);
        setLastSeenTime(now);
      }

      sessionStorage.setItem('DoPinData', JSON.stringify(DoPinData));
      sessionStorage.setItem('DoPinDataTime', now);
      setLocalData(DoPinData);
      groupByCategory(DoPinData);
    }
  }, [DoPinData]);

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

  const handleSnackbarClose = () => setOpenSnackbar(false);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const [ipAddress, setIpAddress] = useState('');
  const [pingResult, setPingResult] = useState(null);
  const [isPinging, setIsPinging] = useState(false);
  const dispatch = useDispatch();

  const handlePingIndividual = async () => {
    if (!ipAddress.trim()) {
      setPingResult({ status: 'error', message: 'Please enter an IP address' });
      return;
    }

    setIsPinging(true);
    try {
      const response = await dispatch(DoPinOne(ipAddress)).unwrap();
      setPingResult({
        status: response.StatusCode === 200 ? 'success' : 'error',
        message: response.Result
      });
    } catch (error) {
      setPingResult({
        status: 'error',
        message: 'Ping Failed!!'
      });
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 2, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ width: 300 }}
        >

          <Tab label="Ping All Devices" />
          <Tab label="Ping By Individual" />
        </Tabs>
      </Box>

      {activeTab === 0 ? (
        localData.length > 0 ? (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {Object.entries(groupedData).map(([category, group]) => (
                    <Grid item xs={12} sm={6} lg={4} key={category}>
                      <DataCenterCard title={group.categoryname} data={group.items} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <Snackbar
              open={openSnackbar}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={DoPinMessage === 'Message sent successfully!' ? 'success' : 'error'}
                sx={{
                  width: '400px',
                  minWidth: '400px',
                  fontSize: '1.1rem',
                  padding: '16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                }}
              >
                {DoPinMessage}
              </Alert>
            </Snackbar>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '20vh',
            }}
          >
            <Box sx={{ marginTop: -20 }}>
              <Spinner />
              <Typography variant="h5" sx={{ marginTop: -37 }}>
                Checking Devices...
              </Typography>
            </Box>
          </Box>
        )
      ) : (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Ping By Individual
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Enter an IP address or Device Name to ping
          </Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            maxWidth: 1500,
            mx: 'auto',
            p: 3,
            boxShadow: 1,
            borderRadius: 2
          }}>
            <TextField
              fullWidth
              label="Enter the IP Address or Device Name"
              variant="outlined"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="e.g., 192.168.1.4 or DMD-ITOLAP024"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: ipAddress && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setIpAddress('');
                        setPingResult(null);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handlePingIndividual}
              disabled={isPinging}
              sx={{ width: 300 }}
            >
              {isPinging ? 'Pinging...' : 'Ping Device'}
            </Button>

            {pingResult && (
              <Alert
                severity={pingResult.status}
                sx={{
                  width: '100%',
                  mt: 2,
                  fontSize: '1rem'
                }}
              >
                {pingResult.message}
              </Alert>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HelpDesk;