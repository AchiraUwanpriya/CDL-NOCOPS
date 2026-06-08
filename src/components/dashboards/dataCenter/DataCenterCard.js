//Inside the functions of Cards in Device Info


import { Avatar, Box, Stack, Typography, Button, Modal, Paper, Grid, TextField, IconButton, Alert, Tooltip, Fab } from '@mui/material';
import { IconX } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, memo } from 'react';
import DashboardCard from '../../theme/shared/DashboardCard';
import { Server, Network, Laptop, Cctv, Database, Monitor, Nfc, IdCard, User } from "lucide-react";
import ApplicationServer from "../../../assets/deviceinfo/Application Server.png"
import CDLDevices from "../../../assets/deviceinfo/CDL Devices.png"
import Databases from "../../../assets/deviceinfo/Databases.png"
import NetwrkDevices from "../../../assets/deviceinfo/Network Devices.png"
import Visualization from "../../../assets/deviceinfo/Visualization.png"
import RFID from "../../../assets/deviceinfo/RFID.png"
import Other from "../../../assets/deviceinfo/Other.png"

const DataCenterCard = ({ title, data }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [deviceType, setDeviceType] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchInput('');
    setFilteredDevices([]);
  };

  const handleDeviceType = (type, statType) => {
    setDeviceType(type);
    setSelectedType(statType);
    setFilteredDevices([]);
    handleOpen();
  };

  // const handleSearchDevice = () => {
  //   if (!searchInput.trim()) return;

  //   const allDevices = deviceType === 'up'
  //     ? data.flatMap(stat => stat.type === selectedType && stat.upDevices || [])
  //     : data.flatMap(stat => stat.type === selectedType && stat.downDevices || []);

  //     const filtered = allDevices.filter((device) =>
  //       String(device?.serverDescription || device)
  //         .toLowerCase()
  //         .includes(searchInput.toLowerCase())
  //     );

  //   if (filtered.length === 0) {
  //     setFilteredDevices([]);
  //     setErrorMessage(
  //       <Alert severity="error" sx={{ marginBottom: 2, color: theme.palette.error.main }}>
  //         No devices found matching "{searchInput}"
  //       </Alert>
  //     );
  //   } else {
  //     setFilteredDevices(filtered);
  //     setErrorMessage(null);
  //   }
  // };


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.trim()) {
      setFilteredDevices([]);
      setErrorMessage('');
      return;
    }

    const allDevices = deviceType === 'up'
      ? data.flatMap(stat => stat.type === selectedType && stat.upDevices || [])
      : data.flatMap(stat => stat.type === selectedType && stat.downDevices || []);

    const filtered = allDevices.filter((device) =>
      String(device?.serverDescription || device)
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    if (filtered.length === 0) {
      setFilteredDevices([]);
      setErrorMessage(
        <Alert severity="error" sx={{ mb: 2, color: theme.palette.error.main }}>
          No devices found matching "{value}"
        </Alert>
      );
    } else {
      setFilteredDevices(filtered);
      setErrorMessage('');
    }
  };


  // const [userImages, setUserImages] = useState({});

  // const getDeviceIcon = (category, deviceInfo) => {
  //   switch (category) {
  //     case "DB": return <Database size={40} />;
  //     case "SER": return <Server size={40} />;
  //     case "NVR": return <Cctv size={40} />;
  //     case "FW": return <Network size={40} />;
  //     case "RFID": return <Nfc size={40} />;
  //     case "USER":
  //       return <UserAvatar deviceInfo={deviceInfo} userImages={userImages} setUserImages={setUserImages} />;
  //     default: return <Monitor size={40} />;
  //   }
  // };


  // use for create user images
  // const UserAvatar = ({ deviceInfo, userImages, setUserImages }) => {
  //   const [imageUrl, setImageUrl] = useState(null);
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const fetchImage = async () => {
  //       const sno = deviceInfo?.serverDescription?.split(' - ')[0]?.trim();
  //       if (!sno) return;


  //       if (userImages[sno]) {
  //         setImageUrl(userImages[sno]);
  //         return;
  //       }


  //       if (loading) return;

  //       setLoading(true);
  //       try {
  //         const response = await fetch(`https://esystems.cdl.lk/backend/GateSolution/UhfRfid/GetUserImg?Sno=${sno}`);

  //         if (response.ok && response.headers.get('content-type')?.includes('image')) {
  //           const blob = await response.blob();
  //           const url = URL.createObjectURL(blob);
  //           setUserImages(prev => ({ ...prev, [sno]: url }));
  //           setImageUrl(url);
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchImage();
  //   }, [deviceInfo, userImages, setUserImages, loading]);

  //   if (imageUrl) {
  //     return <Avatar src={imageUrl} sx={{ width: 80, height: 80 }} />;
  //   }

  //   // if the image not available it showes this Id icon
  //   return <User size={40} />;
  // };


  //get the Device icons inside the Visualaztion,Databases......(Inside the User category take the user images from API)
  const getDeviceIcon = (category, deviceInfo) => {
    const sno = deviceInfo?.serverDescription?.split(' - ')[0]?.trim();

    switch (category) {
      case "DB":
        return <Database size={40} />;
      case "SER":
        return <Server size={40} />;
      case "NVR":
        return <Cctv size={40} />;
      case "FW":
        return <Network size={40} />;
      case "RFID":
        return <Nfc size={40} />;
      case "USER":
        return <UserAvatar sno={sno} />;
      default:
        return <Monitor size={40} />;
    }
  };

  //Remove the triggering in user images to USER category
  
  const UserAvatar = memo(({ sno }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
      if (!sno) return;

      const fetchImage = async () => {
        try {
          const response = await fetch(`https://esystems.cdl.lk/backend/GateSolution/UhfRfid/GetUserImg?Sno=${sno}`);

          if (response.ok && response.headers.get('content-type')?.includes('image')) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
          } else {
            console.warn("Image not found or invalid content-type for", sno);
          }
        } catch (error) {
          console.error(`Failed to fetch image for SNO ${sno}:`, error.message);
        }
      };

      fetchImage();
    }, [sno]);

    return imageUrl ? (
      <Avatar src={imageUrl} sx={{ width: 80, height: 80 }} />
    ) : (
      <User size={40} />
    );
  });

  const allDevices = deviceType === 'up'
    ? data.flatMap(stat => stat.type === selectedType && stat.upDevices || [])
    : data.flatMap(stat => stat.type === selectedType && stat.downDevices || []);


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


  return (
    <DashboardCard title={title}>
      <Stack spacing={2} mt={-1}>
        {data.map((stat, i) => (
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" key={i}>
            <Stack direction="row" alignItems="center" spacing={2}>
              {/*Get the images inside the  Visualaztion,Databases...... images based on category */}
              <Avatar
                variant="rounded"
                src={getTypeImage(stat.category)}
                sx={{ width: 30, height: 30 }}
              />
              <Box><Typography variant="h6" mb="4px">{stat.type}</Typography></Box>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{
                bgcolor: theme.palette.success.light, color: theme.palette.success.main, cursor: 'pointer', fontWeight: "bold", transition: '0.3s', '&:hover': {
                  bgcolor: theme.palette.success.main, transform: 'scale(1.1)', color: '#fff',
                }
              }} onClick={() => handleDeviceType('up', stat.type)}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{stat.upCount}</Typography>
              </Avatar>
              <Avatar sx={{
                bgcolor: theme.palette.error.light, color: theme.palette.error.dark, cursor: 'pointer', fontWeight: "bold", transition: '0.3s', '&:hover': {
                  bgcolor: theme.palette.error.main, transform: 'scale(1.1)', color: '#fff',
                }
              }} onClick={() => handleDeviceType('down', stat.type)}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{stat.downCount}</Typography>
              </Avatar>
            </Stack>
          </Stack>
        ))}

        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 1500,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 3,
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Close Button */}
            <Box sx={{ position: 'absolute', right: 20, top: 20 }}>
              <Tooltip title="Close">
                <Fab size="small" color="error" aria-label="Close" onClick={handleClose}>
                  <IconX width={20} />
                </Fab>
              </Tooltip>
            </Box>

            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>Device Details</Typography>

            {/* Search Bar */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              // mb: 3,
              flexShrink: 0,
            }}>
              <TextField
                label="Enter Device Name"
                variant="outlined"
                size="medium"
                sx={{
                  flex: 1,
                  '& .MuiInputLabel-root': { fontWeight: 'bold' }
                }}
                value={searchInput}
                onChange={handleSearchChange}
              />
            </Box>

            {/* Error Message */}
            {errorMessage && (
              <Typography variant="h6" sx={{ flexShrink: 0 }}>
                {errorMessage}
              </Typography>
            )}

            {/* Scrollable Content Container */}
            <Box sx={{
              overflowY: 'auto',
              flexGrow: 1,
              pr: 2, // Add some padding to prevent scrollbar overlap
              mt: 2,
              mb: 2
            }}>
              {/* Search Results Section */}
              {filteredDevices.length > 0 && (
                <>
                  <Typography variant="h5" sx={{ mb: 2, color: "primary" }}>Search Results</Typography>
                  <Grid container spacing={2}>
                    {filteredDevices.map((deviceinfo, index) => {
                      const matchedStat = data.find(stat =>
                        stat.upDevices.some(dev => String(dev.serverDescription || dev).trim().toUpperCase() === deviceinfo.serverDescription.trim().toUpperCase()) ||
                        stat.downDevices.some(dev => String(dev.serverDescription || dev).trim().toUpperCase() === deviceinfo.serverDescription.trim().toUpperCase())
                      );

                      const category = matchedStat?.category;

                      return (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                          <Paper sx={{ padding: 3, borderRadius: 3, boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                {getDeviceIcon(category, deviceinfo)}
                              </Grid>
                              <Grid item xs={8}>
                                <Typography variant="h6">Device Name: {deviceinfo.serverIp}</Typography>
                                <Typography variant="h6">Device Owner: {deviceinfo.serverDescription}</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: deviceType === 'up' ? 'green' : 'red' }}>
                                  Device Status: {deviceType === 'up' ? 'Online' : 'Offline'}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              )}

              {/* All Devices Section */}
              <Typography variant="h5" sx={{ mt: 4, mb: 2, color: "primary" }}>All Devices</Typography>
              <Grid container spacing={2}>
                {allDevices.map((deviceinfo, index) => {
                  const matchedStat = data.find(stat =>
                    stat.upDevices.some(dev => String(dev.serverDescription || dev).trim().toUpperCase() === deviceinfo.serverDescription.trim().toUpperCase()) ||
                    stat.downDevices.some(dev => String(dev.serverDescription || dev).trim().toUpperCase() === deviceinfo.serverDescription.trim().toUpperCase())
                  );

                  const category = matchedStat?.category;

                  return (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                      <Paper sx={{ padding: 3, borderRadius: 3, boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            {getDeviceIcon(category, deviceinfo)}
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="h6">Device Name: {deviceinfo.serverIp}</Typography>
                            <Typography variant="h6">Device Owner: {deviceinfo.serverDescription}</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: deviceType === 'up' ? 'green' : 'red' }}>
                              Device Status: {deviceType === 'up' ? 'Online' : 'Offline'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            {/* Close Button at Bottom */}
            {/* <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
              sx={{
                width: '200px',
                display: 'block',
                mx: 'auto',
                mt: 2,
                flexShrink: 0
              }}
            >
              Close
            </Button> */}
          </Box>
        </Modal>
      </Stack>
    </DashboardCard>
  );
};

export default DataCenterCard;
