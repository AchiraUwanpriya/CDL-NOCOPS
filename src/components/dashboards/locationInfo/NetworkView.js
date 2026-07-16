// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Paper,
//   Grid,
//   Divider,
//   CircularProgress,
// } from '@mui/material';
// import { ArrowBack, Computer, Print, Storage } from '@mui/icons-material';

// // Zoomable Image Component
// const ZoomableImage = ({ src, alt }) => {
//   const [transformOrigin, setTransformOrigin] = useState('center center');

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.pageX - left) / width) * 100;
//     const y = ((e.pageY - top) / height) * 100;
//     setTransformOrigin(`${x}% ${y}%`);
//   };

//   return (
//     <div
//       onMouseMove={handleMouseMove}
//       style={{ overflow: 'hidden', width: '100%', height: '100%', cursor: 'zoom-in' }}
//     >
//       <img
//         src={src}
//         alt={alt}
//         style={{
//           width: '100%',
//           height: 'auto',
//           transition: 'transform 0.2s ease',
//           transformOrigin,
//         }}
//         className="zoomable"
//       />
//       <style>{`.zoomable:hover { transform: scale(1.8); }`}</style>
//     </div>
//   );
// };

// const NetworkView = ({
//   handlePCClick,
//   handleBack,
//   selectedDock,
//   selectedFloor,
//   selectedSector,
// }) => {
//   const [networkDevices, setNetworkDevices] = useState([]);
//   const [openImage, setOpenImage] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [selectedDevice, setSelectedDevice] = useState(null);
//   const [layoutImage, setLayoutImage] = useState(null);
//   const [loadingImage, setLoadingImage] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const serverPos = { left: '10%', top: '50%' };

//   // 🔹 Fetch devices
//   useEffect(() => {
//     if (!selectedSector?.Flo_No || !selectedSector?.Cat_CodeB) return;

//     const fetchDevices = async () => {
//       try {
//         const res = await fetch(
//           `http://10.0.13.48:8088/ICTDevice/GetComDetails?loccode=${selectedSector.Flo_No}&catcodea=${selectedSector.Cat_CodeB}`,
//         );
//         const data = await res.json();
//         setNetworkDevices(data.ResultSet || []);
//       } catch (err) {
//         console.error('Error fetching devices:', err);
//       }
//     };

//     fetchDevices();
//   }, [selectedSector]);

//   const handleOpenImage = async () => {
//     if (!selectedSector?.Cat_CodeB) return;

//     setLoadingImage(true);
//     setImageError(false);
//     setOpenImage(true);

//     try {
//       const response = await fetch(
//         `http://10.0.13.48:8088/ICTDevice/GetMapImg?Catcode=${selectedSector.Cat_CodeB}`,
//       );

//       if (response.ok) {
//         const imageBlob = await response.blob();
//         const imageUrl = URL.createObjectURL(imageBlob);
//         setLayoutImage(imageUrl);
//       } else {
//         setImageError(true);
//         console.error('Failed to fetch image:', response.status);
//       }
//     } catch (err) {
//       setImageError(true);
//       console.error('Error fetching layout image:', err);
//     } finally {
//       setLoadingImage(false);
//     }
//   };

//   // Clean up the object URL when component unmounts or image changes
//   useEffect(() => {
//     return () => {
//       if (layoutImage) {
//         URL.revokeObjectURL(layoutImage);
//       }
//     };
//   }, [layoutImage]);

//   // Device positioning logic
//   const maxCols = 10;
//   const deviceCount = networkDevices.length;
//   const cols = Math.min(maxCols, Math.ceil(Math.sqrt(deviceCount)));
//   const rows = Math.ceil(deviceCount / cols);
//   const scaleFactor = Math.min(1, 8 / Math.max(cols, rows));

//   const positionedDevices = networkDevices.map((device, idx) => {
//     const col = idx % cols;
//     const row = Math.floor(idx / cols);
//     return {
//       ...device,
//       position: {
//         left: `${20 + col * (60 / cols)}%`,
//         top: `${20 + row * (60 / rows)}%`,
//       },
//       scale: scaleFactor,
//     };
//   });

//   const getStatusColor = (status) => {
//     switch ((status || '').toLowerCase()) {
//       case 'online':
//       case 'operational':
//       case 'active':
//       case 'a':
//         return '#10b981';
//       case 'ready':
//         return '#3b82f6';
//       case 'offline':
//       case 'error':
//         return '#ef4444';
//       default:
//         return '#6b7280';
//     }
//   };

//   const handleDeviceClick = (device) => {
//     setSelectedDevice(device);
//     setOpenDetails(true);
//   };

//   const DeviceNode = ({ device }) => {
//     const isPrinter = (device.Com_Type || '').toLowerCase().includes('printer');
//     return (
//       <Box
//         onClick={() => handleDeviceClick(device)}
//         sx={{
//           position: 'absolute',
//           top: device.position.top,
//           left: device.position.left,
//           transform: `translate(-50%, -50%) scale(${device.scale})`,
//           transformOrigin: 'center',
//           cursor: 'pointer',
//           '&:hover': {
//             transform: `translate(-50%, -50%) scale(${device.scale * 1.1})`,
//             zIndex: 1000,
//           },
//         }}
//       >
//         <Box
//           sx={{
//             borderRadius: 2,
//             p: 1.5,
//             minWidth: 120,
//             textAlign: 'center',
//             backdropFilter: 'blur(10px)',
//           }}
//         >
//           <Box sx={{ display: 'inline-block', mb: 1, position: 'relative' }}>
//             <Box
//               sx={{
//                 width: 48,
//                 height: 48,
//                 background: `linear-gradient(135deg, #3b82f6, #3b82f688)`,
//                 borderRadius: 2,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 mx: 'auto',
//               }}
//             >
//               {isPrinter ? (
//                 <Print sx={{ color: 'white', fontSize: 24 }} />
//               ) : (
//                 <Computer sx={{ color: 'white', fontSize: 24 }} />
//               )}
//             </Box>
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: -4,
//                 right: -4,
//                 width: 16,
//                 height: 16,
//                 background: getStatusColor(device.Status),
//                 borderRadius: '50%',
//                 border: '2px solid white',
//               }}
//             />
//           </Box>
//           <Typography variant="caption" color="white" fontWeight="bold" display="block">
//             {device.ComputerName || device.ComputerCode}
//           </Typography>
//           <Typography variant="caption" color="primary.light" display="block">
//             {device.Com_Type || (isPrinter ? 'Printer' : 'PC')}
//           </Typography>
//         </Box>
//       </Box>
//     );
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         p: 4,
//         background: 'linear-gradient(to bottom right, #1e293b, #1e40af)',
//       }}
//     >
//       <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
//         {/* Header */}
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 6 }}>
//           <IconButton
//             onClick={handleBack}
//             sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
//           >
//             <ArrowBack />
//           </IconButton>
//           <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 gap: 2,
//                 mb: 1,
//               }}
//             >
//               {/* <Building size={18} color="#60a5fa" /> */}
//               <Box>
//                 <Typography variant="h4" color="white" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
//                   {selectedDock?.name}
//                 </Typography>
//                 <Typography variant="subtitle1" color="white" sx={{ opacity: 0.8 }}>
//                   {selectedDock?.description}
//                 </Typography>
//               </Box>
//             </Box>
//             <Typography variant="h6" color="primary.light">
//               Network Infrastructure
//             </Typography>
//           </Box>
//         </Box>

//         {/* Diagram */}
//         <Box
//           sx={{
//             position: 'relative',
//             width: '100%',
//             height: '600px',
//             background: 'rgba(255,255,255,0.05)',
//             borderRadius: 3,
//           }}
//         >
//           {/* Lines from server to devices */}
//           <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
//             {positionedDevices.map((device, idx) => (
//               <line
//                 key={idx}
//                 x1="10%"
//                 y1="50%"
//                 x2={device.position.left}
//                 y2={device.position.top}
//                 stroke="rgba(255,255,255,0.3)"
//                 strokeWidth="2"
//               />
//             ))}
//           </svg>

//           {/* Server Node */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: serverPos.top,
//               left: serverPos.left,
//               transform: 'translate(-50%, -50%)',
//               textAlign: 'center',
//             }}
//           >
//             <Box
//               sx={{
//                 width: 70,
//                 height: 70,
//                 borderRadius: '50%',
//                 background: 'linear-gradient(135deg,#facc15,#fcd34d)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 mb: 1,
//               }}
//             >
//               <Storage sx={{ fontSize: 36, color: 'black' }} />
//             </Box>
//             <Typography variant="body2" color="white" fontWeight="bold">
//               LAN
//             </Typography>
//           </Box>

//           {/* Device nodes */}
//           {positionedDevices.map((device) => (
//             <DeviceNode key={device.ComputerCode} device={device} />
//           ))}
//         </Box>

//         {/* Summary */}
//         <Grid container spacing={2} justifyContent="center" mt={2}>
//           <Grid item>
//              <Button
//               variant="contained"
//               onClick={handleOpenImage}
//               disabled={!selectedSector?.Cat_CodeB}
//             >
//               Total Devices: {networkDevices.length}
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               onClick={handleOpenImage}
//               disabled={!selectedSector?.Cat_CodeB}
//             >
//               View Layout
//             </Button>
//           </Grid>
//         </Grid>

//         {/* Layout Image Modal */}
//         <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="lg" fullWidth>
//           <DialogTitle>Network Layout - {selectedSector?.ICL_Description}</DialogTitle>
//           <DialogContent
//             sx={{
//               minHeight: '400px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             {loadingImage ? (
//               <CircularProgress />
//             ) : imageError ? (
//               <Typography color="error">Failed to load layout image. Please try again.</Typography>
//             ) : layoutImage ? (
//               <ZoomableImage src={layoutImage} alt="Network Layout Diagram" />
//             ) : (
//               <Typography>No layout image available</Typography>
//             )}
//           </DialogContent>
//         </Dialog>

     
//         <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="md" fullWidth>
//           <DialogTitle>Device Details</DialogTitle>
//           <DialogContent>
//             {selectedDevice && (
//               <Box>
//                 {/* Employee + device info */}
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {selectedDevice.EmpName}
//                 </Typography>
//                 <Divider sx={{ my: 1 }} />

//                 <Typography>
//                   <strong>Device:</strong>{' '}
//                   {selectedDevice.ComputerName || selectedDevice.ComputerCode}
//                 </Typography>
//                 <Typography>
//                   <strong>Email:</strong> {selectedDevice.Email}
//                 </Typography>
//                 <Typography>
//                   <strong>IP:</strong> {selectedDevice.IP_Addres}
//                 </Typography>
//                 <Typography>
//                   <strong>Status:</strong> {selectedDevice.Status}
//                 </Typography>
//                 <Divider sx={{ my: 1 }} />

//                 {/* Printer case */}
//                 {selectedDevice.Com_Type?.toLowerCase().includes('printer') ? (
//                   <>
//                     <Typography variant="subtitle2" fontWeight="bold">
//                       Printer Details
//                     </Typography>
//                     <Typography>Make: {selectedDevice.PrinterMake || '-'}</Typography>
//                     <Typography>Model: {selectedDevice.PrinterModel || '-'}</Typography>
//                     <Typography>Toner: {selectedDevice.PrinterToner || '-'}</Typography>
//                     <Typography>Paper Size: {selectedDevice.PaperSize || '-'}</Typography>
//                   </>
//                 ) : (
//                   <Grid container spacing={3}>
//                     {/* Left column - System Details */}
//                     <Grid item xs={12} md={6}>
//                       <Typography variant="subtitle2" fontWeight="bold">
//                         System Details
//                       </Typography>
//                       <Typography>
//                         RAM: {selectedDevice.ICT_SystemDetails?.SystemRam || '-'}
//                       </Typography>
//                       <Typography>
//                         HDD: {selectedDevice.ICT_SystemDetails?.SystemHDD || '-'}
//                       </Typography>
//                       <Typography>
//                         Processor: {selectedDevice.ICT_SystemDetails?.SystemProcessor || '-'}
//                       </Typography>
//                       <Typography>
//                         OS: {selectedDevice.ICT_SystemDetails?.SystemOS || '-'}
//                       </Typography>
//                       <Typography>
//                         Make/Model: {selectedDevice.ICT_SystemDetails?.SystemMake || '-'} /{' '}
//                         {selectedDevice.ICT_SystemDetails?.SystemModel || '-'}
//                       </Typography>
//                       <Divider sx={{ my: 1 }} />

//                       <Typography variant="subtitle2" fontWeight="bold">
//                         Keyboard
//                       </Typography>
//                       <Typography>
//                         Make/Model: {selectedDevice.ICT_KeyboardDetails?.KeyMake || '-'} /{' '}
//                         {selectedDevice.ICT_KeyboardDetails?.KeyModle || '-'}
//                       </Typography>
//                       <Divider sx={{ my: 1 }} />

//                       <Typography variant="subtitle2" fontWeight="bold">
//                         Mouse
//                       </Typography>
//                       <Typography>
//                         Make/Model: {selectedDevice.ICT_Mouse?.MouseMake || '-'} /{' '}
//                         {selectedDevice.ICT_Mouse?.MouseModle || '-'}
//                       </Typography>
//                       <Divider sx={{ my: 1 }} />

//                       <Typography variant="subtitle2" fontWeight="bold">
//                         Screen
//                       </Typography>
//                       {selectedDevice.ICT_Screen?.length ? (
//                         selectedDevice.ICT_Screen.map((screen) => (
//                           <Typography key={screen.ScreenCode}>
//                             {screen.ScreenMake} {screen.ScreenModel} ({screen.ScreenDisplaySize}")
//                           </Typography>
//                         ))
//                       ) : (
//                         <Typography>-</Typography>
//                       )}
//                     </Grid>

//                     {/* Right column - Laptop Details */}
//                     <Grid item xs={12} md={6}>
//                       <Typography variant="subtitle2" fontWeight="bold">
//                         Laptop Details
//                       </Typography>
//                       <Typography>
//                         RAM: {selectedDevice.ICT_LaptopDetails?.LaptopRam || '-'}
//                       </Typography>
//                       <Typography>
//                         HDD: {selectedDevice.ICT_LaptopDetails?.LaptopHDD || '-'}
//                       </Typography>
//                       <Typography>
//                         Processor: {selectedDevice.ICT_LaptopDetails?.LaptopProcessor || '-'}
//                       </Typography>
//                       <Typography>
//                         OS: {selectedDevice.ICT_LaptopDetails?.LaptopOS || '-'}
//                       </Typography>
//                       <Typography>
//                         Make/Model: {selectedDevice.ICT_LaptopDetails?.LaptopMake || '-'} /{' '}
//                         {selectedDevice.ICT_LaptopDetails?.LaptopModel || '-'}
//                       </Typography>
//                       <Divider sx={{ my: 1 }} />
//                     </Grid>
//                   </Grid>
//                 )}
//               </Box>
//             )}
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };

// export default NetworkView;



import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Chip,
  Tooltip,
} from '@mui/material';
import { ArrowBack, Computer, Print, Storage } from '@mui/icons-material';
import DeviceInfoService from '../../../store/services/common/deviceInfo/DeviceInfoService';

// Zoomable Image Component
const ZoomableImage = ({ src, alt }) => {
  const [transformOrigin, setTransformOrigin] = useState('center center');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ overflow: 'hidden', width: '100%', height: '100%', cursor: 'zoom-in' }}
    >
       <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',   // image won’t exceed 80% of viewport height
          width: 'auto',
          height: 'auto',
          transition: 'transform 0.2s ease',
          transformOrigin,
        }}
        className="zoomable"
      />
      <style>{`.zoomable:hover { transform: scale(1.8); }`}</style>
    </div>
  );
};

const NetworkView = ({
  handlePCClick,
  handleBack,
  selectedDock,
  selectedFloor,
  selectedSector,
}) => {
  const [networkDevices, setNetworkDevices] = useState([]);
  const [openImage, setOpenImage] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [layoutImage, setLayoutImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageError, setImageError] = useState(false);
  // devicePingStatus: { [ipAddress]: 'up' | 'down' | 'loading' }
  const [devicePingStatus, setDevicePingStatus] = useState({});

  const serverPos = { left: '10%', top: '50%' };

  // 🔹 Fetch devices then check status via GetMachineStatus
  useEffect(() => {
    if (!selectedSector?.Flo_No || !selectedSector?.Cat_CodeB) return;

    /**
     
     *  - IsOnline: true                         → active (not down)
     *  - IsOnline: false, Status: "ResumeAutomatic", "Resume Automatic", "Suspend", "Console Disconnect", "Shutdown"
     *                                           → active (not counted as down)
     *  - IsOnline: false, Status: ""            → down (red on the map)
     *  - not found in status map                → untracked, NOT counted as down
     */
    const isMachineDown = (deviceName, statusMap) => {
      if (!deviceName || !statusMap) return false;
      const entry = statusMap[deviceName.trim().toLowerCase()];
      if (!entry) return false; // not tracked by GetMachineStatus → do not count as down
      if (entry.IsOnline === true) return false; // online → active
      const status = (entry.Status || '').trim().toLowerCase();
      
      // Explicitly treated as active even if IsOnline is false:
      if (
        status === 'resume automatic' ||
        status === 'resumeautomatic' ||
        status === 'suspend' ||
        status === 'console disconnect' ||
        status === 'consoledisconnect' ||
        status === 'shutdown'
      ) {
        return false;
      }
      
      // Explicitly offline with no active status -> down
      if (status === '') {
        return true;
      }
      
      return true; // Fallback for other offline statuses
    };

    const fetchAndCheckDevices = async () => {
      try {
        // Fetch devices for this sector
        const res = await fetch(
          `http://10.0.13.48:8088/ICTDevice/GetComDetails?loccode=${selectedSector.Flo_No}&catcodea=${selectedSector.Cat_CodeB}`,
        );
        const data = await res.json();
        const devices = data.ResultSet || [];
        setNetworkDevices(devices);

        // Mark all named devices as loading
        const initStatus = {};
        devices.forEach((d) => {
          const deviceName = d.ComputerName || d.ComputerCode;
          if (deviceName) initStatus[deviceName] = 'loading';
        });
        setDevicePingStatus(initStatus);

        // --- Single bulk call to GetMachineStatus ---
        let statusMap = {};
        try {
          const machineStatusData = await DeviceInfoService.GetMachineStatus();
          if (machineStatusData && machineStatusData.ResultSet) {
            machineStatusData.ResultSet.forEach((m) => {
              const name = (m.MachineName || m.ComputerName || '').trim().toLowerCase();
              if (name) statusMap[name] = m;
            });
          }
        } catch (err) {
          console.warn('[NetworkView GetMachineStatus] Failed to fetch bulk machine status:', err);
        }

        // Update ping status for all devices from the status map
        const updatedStatus = {};
        devices.forEach((device) => {
          const deviceName = device.ComputerName || device.ComputerCode;
          if (!deviceName) return;
          updatedStatus[deviceName] = isMachineDown(deviceName, statusMap) ? 'down' : 'up';
        });
        setDevicePingStatus(updatedStatus);
      } catch (err) {
        console.error('Error fetching devices:', err);
      }
    };

    fetchAndCheckDevices();
  }, [selectedSector]);

  const handleOpenImage = async () => {
    if (!selectedSector?.Cat_CodeB) return;

    setLoadingImage(true);
    setImageError(false);
    setOpenImage(true);

    try {
      const response = await fetch(
        `http://10.0.13.48:8088/ICTDevice/GetMapImg?Catcode=${selectedSector.Cat_CodeB}`,
        // `http://localhost:51324/ICTDevice/GetMapImg?Catcode=${selectedSector.Cat_CodeB}`,
      );

      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setLayoutImage(imageUrl);
      } else {
        setImageError(true);
        console.error('Failed to fetch image:', response.status);
      }
    } catch (err) {
      setImageError(true);
      console.error('Error fetching layout image:', err);
    } finally {
      setLoadingImage(false);
    }
  };

  // Clean up the object URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (layoutImage) {
        URL.revokeObjectURL(layoutImage);
      }
    };
  }, [layoutImage]);

  // Device positioning logic
  const maxCols = 10;
  const deviceCount = networkDevices.length;
  const cols = Math.min(maxCols, Math.ceil(Math.sqrt(deviceCount)));
  const rows = Math.ceil(deviceCount / cols);
  const scaleFactor = Math.min(1, 8 / Math.max(cols, rows));

  const positionedDevices = networkDevices.map((device, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    return {
      ...device,
      position: {
        left: `${20 + col * (60 / cols)}%`,
        top: `${20 + row * (60 / rows)}%`,
      },
      scale: scaleFactor,
    };
  });

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'online':
      case 'operational':
      case 'active':
      case 'a':
        return '#10b981';
      case 'ready':
        return '#3b82f6';
      case 'offline':
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Determine live ping status for a device (keyed by device name)
  const getDevicePingStatus = (device) => {
    const deviceName = device.ComputerName || device.ComputerCode;
    if (!deviceName) return 'unknown';
    return devicePingStatus[deviceName] || 'unknown';
  };

  const activeDevices = networkDevices.filter((d) => getDevicePingStatus(d) === 'up').length;
  const downDevices = networkDevices.filter((d) => getDevicePingStatus(d) === 'down').length;
  const loadingDevices = networkDevices.filter((d) => getDevicePingStatus(d) === 'loading').length;

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setOpenDetails(true);
  };

  const DeviceNode = ({ device }) => {
    const isPrinter = (device.Com_Type || '').toLowerCase().includes('printer');
    const pingStatus = getDevicePingStatus(device);
    const isDown = pingStatus === 'down';
    const isLoading = pingStatus === 'loading';

    // Indicator dot color: red if down, blinking grey if loading, green if up
    const indicatorColor = isDown ? '#ef4444' : isLoading ? '#9ca3af' : '#10b981';
    // Icon background: dim red tint if down
    const iconBg = isDown
      ? 'linear-gradient(135deg, #7f1d1d, #ef444488)'
      : 'linear-gradient(135deg, #3b82f6, #3b82f688)';

    return (
      <Tooltip
        title={
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {device.ComputerName || device.ComputerCode}
            </Typography>
            <Typography variant="caption" display="block">
              IP: {device.IP_Addres || device.Com_IP || device.ip || device.IpAddress || 'N/A'}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              sx={{
                color: isDown ? '#ff6b6b' : isLoading ? '#d1d5db' : '#4ade80',
                fontWeight: 'bold',
              }}
            >
              Ping: {isDown ? '🔴 Inactive (Device Down)' : isLoading ? '⏳ Checking...' : '🟢 Active'}
            </Typography>
          </Box>
        }
        arrow
        placement="top"
      >
        <Box
          onClick={() => handleDeviceClick(device)}
          sx={{
            position: 'absolute',
            top: device.position.top,
            left: device.position.left,
            transform: `translate(-50%, -50%) scale(${device.scale})`,
            transformOrigin: 'center',
            cursor: 'pointer',
            opacity: isDown ? 0.75 : 1,
            '&:hover': {
              transform: `translate(-50%, -50%) scale(${device.scale * 1.1})`,
              zIndex: 1000,
              opacity: 1,
            },
            transition: 'opacity 0.3s ease',
          }}
        >
          <Box
            sx={{
              borderRadius: 2,
              p: 1.5,
              minWidth: 120,
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              border: isDown ? '1px solid rgba(239,68,68,0.5)' : '1px solid transparent',
              background: isDown ? 'rgba(127,29,29,0.2)' : 'transparent',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'inline-block', mb: 1, position: 'relative' }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  background: iconBg,
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                }}
              >
                {isPrinter ? (
                  <Print sx={{ color: isDown ? '#fca5a5' : 'white', fontSize: 24 }} />
                ) : (
                  <Computer sx={{ color: isDown ? '#fca5a5' : 'white', fontSize: 24 }} />
                )}
              </Box>
              {/* Live ping status indicator dot */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  width: 16,
                  height: 16,
                  background: indicatorColor,
                  borderRadius: '50%',
                  border: '2px solid white',
                  animation: isLoading ? 'blink 1s infinite' : 'none',
                  '@keyframes blink': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.3 },
                  },
                }}
              />
            </Box>
            <Typography
              variant="caption"
              fontWeight="bold"
              display="block"
              sx={{ color: isDown ? '#fca5a5' : 'white' }}
            >
              {device.ComputerName || device.ComputerCode}
            </Typography>
            <Typography variant="caption" color="primary.light" display="block">
              {device.Com_Type || (isPrinter ? 'Printer' : 'PC')}
            </Typography>
            {/* Inactive badge */}
            {isDown && (
              <Chip
                label="Inactive"
                size="small"
                sx={{
                  mt: 0.5,
                  height: 16,
                  fontSize: '9px',
                  backgroundColor: 'rgba(239,68,68,0.8)',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            )}
          </Box>
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 2,
        background: 'linear-gradient(to bottom right, #1e293b, #1e40af)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 6, flexShrink: 0 }}>
          <IconButton
            onClick={handleBack}
            sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
          >
            <ArrowBack />
          </IconButton>
          <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                mb: 1,
              }}
            >
              {/* <Building size={18} color="#60a5fa" /> */}
              <Box>
                <Typography variant="h4" color="white" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                  {selectedDock?.name}
                </Typography>
                <Typography variant="subtitle1" color="white" sx={{ opacity: 0.8 }}>
                  {selectedDock?.description}
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" color="primary.light">
              Network Infrastructure
            </Typography>
          </Box>
        </Box>

        {/* Diagram */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '420px', sm: '450px', md: '400px', lg: '550px' }, // responsive heights
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 3,
            p: { xs: 1, sm: 2, md: 3 }, // responsive padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Lines from server to devices */}
          <svg style={{ position: 'absolute',  width: '100%', height: '100%' }}>
            {positionedDevices.map((device, idx) => (
              <line
                key={idx}
                x1="10%"
                y1="50%"
                x2={device.position.left}
                y2={device.position.top}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
            ))}
          </svg>

          {/* Server Node */}
          <Box
            sx={{
              position: 'absolute',
              top: serverPos.top,
              left: serverPos.left,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#facc15,#fcd34d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <Storage sx={{ fontSize: 36, color: 'black' }} />
            </Box>
            <Typography variant="body2" color="white" fontWeight="bold">
              LAN
            </Typography>
          </Box>

          {/* Device nodes */}
          {positionedDevices.map((device) => (
            <DeviceNode key={device.ComputerCode} device={device} />
          ))}
        </Box>

        {/* Summary */}
        <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop='2px'>
          <Grid item>
            <Button variant="contained" sx={{ bgcolor: '#1976d2' }}>
              Total: {networkDevices.length}
            </Button>
          </Grid>
          {/* <Grid item>
            <Button
              variant="contained"
              sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
            >
              🟢 Active: {activeDevices}
            </Button>
          </Grid> */}
          {/* <Grid item>
            <Button
              variant="contained"
              sx={{ bgcolor: '#f44336', '&:hover': { bgcolor: '#c62828' } }}
            >
              🔴 Inactive: {downDevices}
            </Button>
          </Grid> */}
          {loadingDevices > 0 && (
            <Grid item>
              <Button variant="outlined" disabled>
                ⏳ Checking: {loadingDevices}
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              variant="contained"
              onClick={handleOpenImage}
              disabled={!selectedSector?.Cat_CodeB}
            >
              View Layout
            </Button>
          </Grid>
        </Grid>

        {/* Layout Image Modal */}
        <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="lg" fullWidth>
          <DialogTitle>Network Layout - {selectedSector?.ICL_Description}</DialogTitle>
          <DialogContent
            sx={{
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {loadingImage ? (
              <CircularProgress />
            ) : imageError ? (
              <Typography color="error">Failed to load layout image. Please try again.</Typography>
            ) : layoutImage ? (
              <ZoomableImage src={layoutImage} alt="Network Layout Diagram" />
            ) : (
              <Typography>No layout image available</Typography>
            )}
          </DialogContent>
        </Dialog>

     
        <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="md" fullWidth>
          <DialogTitle>Device Details</DialogTitle>
          <DialogContent>
            {selectedDevice && (
              <Box>
                {/* Employee + device info */}
                <Typography variant="subtitle1" fontWeight="bold">
                  {selectedDevice.EmpName}
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Typography>
                  <strong>Device:</strong>{' '}
                  {selectedDevice.ComputerName || selectedDevice.ComputerCode}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedDevice.Email}
                </Typography>
                <Typography>
                  <strong>IP:</strong> {selectedDevice.IP_Addres}
                </Typography>
                <Typography>
                  <strong>Status:</strong> {selectedDevice.Status}
                </Typography>
                <Divider sx={{ my: 1 }} />

                {/* Printer case */}
                {selectedDevice.Com_Type?.toLowerCase().includes('printer') ? (
                  <>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Printer Details
                    </Typography>
                    <Typography>Make: {selectedDevice.PrinterMake || '-'}</Typography>
                    <Typography>Model: {selectedDevice.PrinterModel || '-'}</Typography>
                    <Typography>Toner: {selectedDevice.PrinterToner || '-'}</Typography>
                    <Typography>Paper Size: {selectedDevice.PaperSize || '-'}</Typography>
                  </>
                ) : (
                  <Grid container spacing={3}>
                    {/* Left column - System Details */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        System Details
                      </Typography>
                      <Typography>
                        RAM: {selectedDevice.ICT_SystemDetails?.SystemRam || '-'}
                      </Typography>
                      <Typography>
                        HDD: {selectedDevice.ICT_SystemDetails?.SystemHDD || '-'}
                      </Typography>
                      <Typography>
                        Processor: {selectedDevice.ICT_SystemDetails?.SystemProcessor || '-'}
                      </Typography>
                      <Typography>
                        OS: {selectedDevice.ICT_SystemDetails?.SystemOS || '-'}
                      </Typography>
                      <Typography>
                        Make/Model: {selectedDevice.ICT_SystemDetails?.SystemMake || '-'} /{' '}
                        {selectedDevice.ICT_SystemDetails?.SystemModel || '-'}
                      </Typography>
                      <Divider sx={{ my: 1 }} />

                      <Typography variant="subtitle2" fontWeight="bold">
                        Keyboard
                      </Typography>
                      <Typography>
                        Make/Model: {selectedDevice.ICT_KeyboardDetails?.KeyMake || '-'} /{' '}
                        {selectedDevice.ICT_KeyboardDetails?.KeyModle || '-'}
                      </Typography>
                      <Divider sx={{ my: 1 }} />

                      <Typography variant="subtitle2" fontWeight="bold">
                        Mouse
                      </Typography>
                      <Typography>
                        Make/Model: {selectedDevice.ICT_Mouse?.MouseMake || '-'} /{' '}
                        {selectedDevice.ICT_Mouse?.MouseModle || '-'}
                      </Typography>
                      <Divider sx={{ my: 1 }} />

                      <Typography variant="subtitle2" fontWeight="bold">
                        Screen
                      </Typography>
                      {selectedDevice.ICT_Screen?.length ? (
                        selectedDevice.ICT_Screen.map((screen) => (
                          <Typography key={screen.ScreenCode}>
                            {screen.ScreenMake} {screen.ScreenModel} ({screen.ScreenDisplaySize}")
                          </Typography>
                        ))
                      ) : (
                        <Typography>-</Typography>
                      )}
                    </Grid>

                    {/* Right column - Laptop Details */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Laptop Details
                      </Typography>
                      <Typography>
                        RAM: {selectedDevice.ICT_LaptopDetails?.LaptopRam || '-'}
                      </Typography>
                      <Typography>
                        HDD: {selectedDevice.ICT_LaptopDetails?.LaptopHDD || '-'}
                      </Typography>
                      <Typography>
                        Processor: {selectedDevice.ICT_LaptopDetails?.LaptopProcessor || '-'}
                      </Typography>
                      <Typography>
                        OS: {selectedDevice.ICT_LaptopDetails?.LaptopOS || '-'}
                      </Typography>
                      <Typography>
                        Make/Model: {selectedDevice.ICT_LaptopDetails?.LaptopMake || '-'} /{' '}
                        {selectedDevice.ICT_LaptopDetails?.LaptopModel || '-'}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default NetworkView;



