import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Server,
  Printer,
  Monitor,
  Network,
  Clock,
  MapPin,
  Laptop,
} from "lucide-react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper
} from "@mui/material";

// Hardcoded device list with types and corresponding icons
const devices = [
  { id: "D001", deviceName: "Main Server", type: "server", status: "Online" },
  { id: "D002", deviceName: "Office Printer", type: "printer", status: "Offline" },
  { id: "D003", deviceName: "Work Monitor", type: "monitor", status: "Online" },
  { id: "D004", deviceName: "Network Router", type: "network", status: "Offline" },
  { id: "D005", deviceName: "Wall Clock", type: "clock", status: "Online" },
  { id: "D006", deviceName: "GPS Tracker", type: "gps", status: "Offline" },
  { id: "D007", deviceName: "Laptop", type: "laptop", status: "Online" }
];

// Function to return the correct icon based on device type
const getDeviceIcon = (type) => {
  switch (type) {
    case "server":
      return <Server size={40} />;
    case "printer":
      return <Printer size={40} />;
    case "monitor":
      return <Monitor size={40} />;
    case "network":
      return <Network size={40} />;
    case "clock":
      return <Clock size={40} />;
    case "gps":
      return <MapPin size={40} />;
    case "laptop":
      return <Laptop size={40} />;
    default:
      return <Monitor size={40} />;
  }
};

const DeviceStatusPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle search
  const handleSearchDevice = () => {
    if (searchInput.trim()) {
      setLoading(true);
      setTimeout(() => {
        const foundDevice = devices.filter(
          (device) => device.deviceName.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchResult(foundDevice.length > 0 ? foundDevice : []);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px", margin: "0 auto", paddingTop: 2 }}>
      <Typography variant="h4" component="h1" align="center" color="primary">
        Device Status Checker
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: 3,
          marginBottom: 3
        }}
      >
        <TextField
          label="Enter Device Name"
          variant="outlined"
          size="medium"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ flex: 1 }}
          InputProps={{
            endAdornment: (
              <IconButton size="medium" onClick={handleSearchDevice}>
                <Search />
              </IconButton>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchDevice}
          disabled={loading || !searchInput.trim()}
          sx={{
            whiteSpace: "nowrap",
            fontSize: '1rem',
            padding: '12px 24px',
            height: '45px',
          }}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
        >
          Check Device
        </Button>

      </Box>
      {/* Show search results */}
      {searchResult && searchResult.length > 0 && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Search Results:
          </Typography>
          <Grid container spacing={3}>
            {searchResult.map((device) => (
              <Grid item xs={12} md={6} lg={4} key={device.id}>
                <Paper sx={{ padding: 3, display: "flex", borderRadius: 3, boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  {/* Left side for device icon */}
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                      {getDeviceIcon(device.type)}
                    </Grid>

                    {/* Right side for other details */}
                    <Grid item xs={8}>
                      <Typography variant="h6" sx={{ marginTop: 1 }}>
                        ID: {device.id}
                      </Typography>
                      <Typography variant="h6" sx={{ marginTop: 1 }}>
                        Device Name: {device.deviceName}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: device.status === "Online" ? "green" : "red" }}>
                        Device Status: {device.status}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {searchResult && searchResult.length === 0 && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          No devices found matching "{searchInput}"
        </Alert>
      )}


      <Typography variant="h6" gutterBottom>
        All Devices
      </Typography>
      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} md={6} lg={4} key={device.id}>
            <Paper sx={{ padding: 3, display: "flex", borderRadius: 3, boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              {/* Left side for device icon */}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  {getDeviceIcon(device.type)}
                </Grid>

                {/* Right side for other details */}
                <Grid item xs={8}>
                  <Typography variant="h6" >
                    ID: {device.id}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: 1 }}>
                    Device Name: {device.deviceName}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: device.status === "Online" ? "green" : "red" }}>
                    Device Status: {device.status}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>


      {/* Check All Devices Button */}
      <Box sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="secondary" startIcon={<RefreshCw />} sx={{ px: 3, py: 1 }}>
          Refresh Device Status
        </Button>
      </Box>
    </Box>
  );
};

export default DeviceStatusPage;


// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import {
//   Box,
//   Button,
//   TextField,
//   IconButton,
//   Typography,
//   CircularProgress,
//   Alert,
//   Grid,
//   Paper
// } from "@mui/material";
// import { deviceStatusAPI } from "../../../store/services/common/networkstatus/DeviceAvailability";

// const DeviceStatusPage = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [searchResult, setSearchResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearchDevice = async () => {
//     if (!searchInput.trim()) return;

//     setLoading(true);
//     setError(null);
    
//     try {
//       const data = await deviceStatusAPI.getServerSnmpMaster(searchInput);
//       setSearchResult(data.resultSet);  // Assuming the API response contains a `resultSet`
//     } catch (err) {
//       setError(err.message);
//       setSearchResult([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 4, maxWidth: "1200px", margin: "0 auto", paddingTop: 2 }}>
//       <Typography variant="h4" component="h1" align="center" color="primary">
//         Device Status Checker
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: "10px",
//           marginTop: 3,
//           marginBottom: 3
//         }}
//       >
//         <TextField
//           label="Enter Device ID"
//           variant="outlined"
//           size="medium"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           sx={{ flex: 1 }}
//           InputProps={{
//             endAdornment: (
//               <IconButton size="medium" onClick={handleSearchDevice}>
//                 <Search />
//               </IconButton>
//             )
//           }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSearchDevice}
//           disabled={loading || !searchInput.trim()}
//           sx={{
//             whiteSpace: "nowrap",
//             fontSize: "1rem",
//             padding: "12px 24px",
//             height: "45px",
//           }}
//           startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
//         >
//           Check Device
//         </Button>
//       </Box>

//       {error && <Alert severity="error">{error}</Alert>}

//       {searchResult && searchResult.length > 0 && (
//         <Box sx={{ marginBottom: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Search Results:
//           </Typography>
//           <Grid container spacing={3}>
//             {searchResult.map((device) => (
//               <Grid item xs={12} md={6} lg={4} key={device.TId}>
//                 <Paper sx={{ padding: 3, display: "flex", borderRadius: 3, boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }}>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={8}>
//                       <Typography variant="h6" sx={{ marginTop: 1 }}>
//                         ID: {device.TId}
//                       </Typography>
//                       <Typography variant="h6" sx={{ marginTop: 1 }}>
//                         Device Name: {device.DeviceName}
//                       </Typography>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ fontWeight: "bold", color: device.ServerStatus === "Online" ? "green" : "red" }}
//                       >
//                         Device Status: {device.ServerStatus}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}

//       {searchResult && searchResult.length === 0 && (
//         <Alert severity="error" sx={{ marginBottom: 2 }}>
//           No devices found matching "{searchInput}"
//         </Alert>
//       )}
//     </Box>
//   );
// };

// export default DeviceStatusPage;
