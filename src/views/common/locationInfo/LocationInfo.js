// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
//   Chip,
//   InputAdornment,
//   TextField,
//   Fab,
// } from '@mui/material';
// import {
//   LocationOn,
//   Computer,
//   ArrowBack,
//   Storage,
// } from '@mui/icons-material';
// import Map from '../../../assets/images/blueprints/cdlplc.png';
// import Serverroom from '../../../assets/locationType/serverroom.jpg';
// import { Building, Monitor, Wifi } from 'lucide-react';
// import NetworkView from '../../../components/dashboards/locationInfo/NetworkView';
// import { Tooltip } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import LAN_REVISED from '../../../assets/images/blueprints/CDPLC LAN-REVISED.jpg';
// import Network_Switch_Map from '../../../assets/images/blueprints/Network Switch Map.jpg';
// import SectorIcon from '../../../assets/images/icons/sector.ico';
// import NetworkDigIcon from '../../../assets/images/icons/diagram.ico';
// import NetworkSwitch from '../../../assets/images/icons/network-switch.ico';
// import Switches from '../../../assets/images/icons/switches.ico';
// import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';

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
//       <style>{`.zoomable:hover { transform: scale(2.0); }`}</style>
//     </div>
//   );
// };

// const PortNavigationApp = () => {
//   const dispatch = useDispatch();
//   const [currentView, setCurrentView] = useState('port');
//   const [selectedDock, setSelectedDock] = useState(null);
//   const [selectedFloor, setSelectedFloor] = useState(null);
//   const [selectedSector, setSelectedSector] = useState(null);
//   const [selectedPC, setSelectedPC] = useState(null);
//   const [pcDetailsOpen, setPcDetailsOpen] = useState(false);
//   const [hoveredDock, setHoveredDock] = useState(null);
//   const [hoveredSwitch, setHoveredSwitch] = useState(null);
//   const [floors, setFloors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [sectors, setSectors] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [zoomOpen, setZoomOpen] = useState(false);
//   const [openImage, setOpenImage] = useState(false);
//   const [showSwitches, setShowSwitches] = useState(false); // Toggle for showing switches

//   const docks = [
//     {
//       id: 'YM',
//       name: 'Workshop Tool Stores,Deck Fitting Shop',
//       description: 'Yard Building 13',
//       floors: 3,
//       x: '85%',
//       y: '23%',
//     },
//     {
//       id: 'YO',
//       name: 'security Office Gate No 03',
//       description: 'Yard Building 15',
//       floors: 3,
//       x: '77%',
//       y: '6%',
//     },
//     {
//       id: 'YN',
//       name: 'Machine shop,Fitting Shop',
//       description: 'Yard Building 14',
//       floors: 6,
//       x: '83%',
//       y: '16%',
//     },
//     {
//       id: 'YL',
//       name: 'Electrical shop,metal workshop',
//       description: 'Yard Building 12',
//       floors: 6,
//       x: '76%',
//       y: '17%',
//     },
//     {
//       id: 'YK',
//       name: 'Automation,Electronic shop,pipe Fabrication ,Foundry ',
//       description: 'Yard Building 11',
//       floors: 3,
//       x: '88%',
//       y: '33%',
//     },
//     {
//       id: 'YJ',
//       name: 'Kitchen,welfare canteen ',
//       description: 'Yard Building 10',
//       floors: 6,
//       x: '74%',
//       y: '21%',
//     },
//     {
//       id: 'YI',
//       name: 'Civil Maintenance and Dock Electrical',
//       description: 'Yard Building 09',
//       floors: 6,
//       x: '63%',
//       y: '27%',
//     },
//     {
//       id: 'YH',
//       name: 'Electrical Maintenance and Pump House 1',
//       description: 'Yard Building 08',
//       floors: 6,
//       x: '60%',
//       y: '25%',
//     },
//     {
//       id: 'YG',
//       name: 'SWC Unit and Pool Office',
//       description: 'Yard Building 07',
//       floors: 6,
//       x: '79%',
//       y: '37%',
//     },
//     {
//       id: 'YF',
//       name: 'Blasting Chamber',
//       description: 'Yard Building 06',
//       floors: 6,
//       x: '89%',
//       y: '50%',
//     },
//     {
//       id: 'YE',
//       name: 'Site Errection, Dock No 2 Tool Stores',
//       description: 'Yard Building 05',
//       floors: 6,
//       x: '79%',
//       y: '57%',
//     },
//     {
//       id: 'YD',
//       name: 'Fiber Glass, Carpentry, Fire unit',
//       description: 'Yard Building 04',
//       floors: 6,
//       x: '45%',
//       y: '35%',
//     },
//     {
//       id: 'YC',
//       name: 'Scaffolding, Component Shop, NBD Tool Stores, Machinery Outfitting, Hull Repair, Hull Construction, Samagi',
//       description: 'Yard Building 03',
//       floors: 6,
//       x: '44%',
//       y: '45%',
//     },
//     {
//       id: 'YB',
//       name: 'Safety,Security Office Gate No.01',
//       description: 'Yard Building 02',
//       floors: 6,
//       x: '38%',
//       y: '79%',
//     },
//     {
//       id: 'YA',
//       name: 'Service Center, Pump House Dock No.04, Electrical Dock No.04, Gas Center',
//       description: 'Yard Building 01',
//       floors: 6,
//       x: '26%',
//       y: '75%',
//     },
//     { id: 'CO', name: 'Calibration Office', floors: 2, x: '80%', y: '18%' },
//     { 
//       id: 'CA', 
//       name: 'CDPLC Administrative Building',  
//       description: 'HR, Supplies, Transport and Welfare and Production Office', 
//       floors: 4, 
//       x: '74%', 
//       y: '28%' 
//     },
//     { id: 'MS', name: 'Main Store Building', floors: 5, x: '71%', y: '27%' },
//     { id: 'FA', name: '40th Anniversary Building', floors: 3, x: '58%', y: '37%' },
//     { id: 'LB', name: 'LOFT Building', floors: 2, x: '35%', y: '49%' },
//     { id: 'SC', name: 'Sub Contract Administrative Building', floors: 3, x: '42%', y: '61%' },
//     { id: 'HO', name: 'Head Office Building', floors: 5, x: '34%', y: '81%' },
//     { id: 'TC', name: 'Training Center Building', floors: 5, x: '61%', y: '20%' },
//     { id: 'DTS', name: 'DTS', floors: 5, x: '10%', y: '95%' },
//   ];

//   const staticServers = [{ id: 'server1', name: 'Server Room', top: '85%', left: '32%' }];

//   // Switch locations data
//   const dockswitches = [
//     { id: 1, name: '4th Floor Switch - IT Department & Telephone Exchange', description: '', floors: 1, x: '33%', y: '83%' },
//     { id: 2, name: '5th Floor Switch - Finance Department', description: '', floors: 1, x: '34%', y: '82%' },
//     { id: 3, name: '3rd Floor Switch - Business Department', description: '', floors: 1, x: '32%', y: '84%' },
//     { id: 4, name: 'Aluminium Shop', description: '', floors: 1, x: '27%', y: '80%' },
//     { id: 5, name: 'Service Center', description: '', floors: 1, x: '25%', y: '75%' },
//     { id: 6, name: 'Gas Center', description: '', floors: 1, x: '20.5%', y: '73%' },
//     { id: 7, name: 'Safety Department', description: '', floors: 1, x: '35%', y: '80%' },
//     { id: 8, name: 'Security Office Gate No.01', description: '', floors: 1, x: '38%', y: '77%' },
//     { id: 9, name: '1st Floor - Service Procurement', description: '', floors: 1, x: '38%', y: '58%' },
//     { id: 10, name: 'Ground Floor - Administrative Office', description: '', floors: 1, x: '37%', y: '57%' },
//     { id: 11, name: 'LOFT Office', description: '', floors: 1, x: '35%', y: '51%' },
//     { id: 12, name: 'Scaffolding Office', description: '', floors: 1, x: '36%', y: '41%'},
//     { id: 13, name: 'Steel Hull Construction (SWC) Engineer Office', description: '', floors: 1, x: '46.5%', y: '48%'},
//     { id: 14, name: 'Samagi Office', description: '', floors: 1, x: '45%', y: '46.5%'},
//     { id: 15, name: 'Site Erection Office', description: '', floors: 1, x: '85%', y: '61%' },
//     { id: 16, name: 'Training Center', description: '', floors: 1, x: '63.5%', y: '23.5%' },
//     { id: 17, name: 'Training Center - Class Room C', description: '', floors: 1, x: '60%', y: '24%' },
//     { id: 18, name: 'Quality Control Department', description: '', floors: 1, x: '60.5%', y: '20%' },
//     { id: 19, name: 'Dock Electrical Office', description: '', floors: 1, x: '65%', y: '30%' },
//     { id: 20, name: 'Main Stores - Location C', description: '', floors: 1, x: '73%', y: '31%'},
//     { id: 21, name: 'Production Office Switch (Old)', description: '', floors: 1, x: '75%', y: '33%' },
//     { id: 22, name: 'HR Office', description: '', floors: 1, x: '74%', y: '29%' },
//     { id: 23, name: 'Fitting Shop Engineer Office', description: '', floors: 1, x: '78.5%', y: '13.5%' },
//     { id: 24, name: 'Electrical Shop Office', description: '', floors: 1, x: '89.5%', y: '29.5%' },
//     { id: 25, name: 'Calibration Office ', description: '', floors: 1, x: '83%', y: '22%' },
//     { id: 26, name: 'Deck Fitting Shop Office', description: '', floors: 1, x: '89%', y: '25.5%'},
//     { id: 27, name: 'Welfare Canteen Office', description: '', floors: 1, x: '76%', y: '21%' },
//     { id: 28, name: 'Transport and Welfare Office', description: '', floors: 1, x: '73%', y: '25%'},
//     { id: 29, name: 'Blasting Chamber Office', description: '', floors: 1, x: '90%', y: '51%' },
//     { id: 30, name: '1st Floor Switch', description: '', floors: 1, x: '30%', y: '84%' },
//     { id: 31, name: 'Gate No.01 Time Clock Switch (Security Hut)', description: '', floors: 1, x: '33.5%', y: '79%' },
//     { id: 32, name: 'Deck Department Field Office', description: '', floors: 1, x: '42%', y: '63%' },
//     { id: 33, name: 'NBD Tool Stores', description: '', floors: 1, x: '45%', y: '51%' },
//     { id: 34, name: 'Fire Unit Stores', description: '', floors: 1, x: '52%', y: '38.5%' },
//     { id: 35, name: 'Carpentry Shop Office', description: '', floors: 1, x: '45%', y: '37.5%' },
//     { id: 36, name: 'Machinery Outfitting Shop', description: '', floors: 1, x: '50%', y: '45%' },
//     { id: 37, name: '40th Anniversary Building Network Switch', description: '', floors: 1, x: '60%', y: '39%' },
//     { id: 38, name: 'Component Shop Office', description: '', floors: 1, x: '43%', y: '49%' },
//     { id: 39, name: '2nd Floor Lunch Room Camera Switch', description: '', floors: 1, x: '31%', y: '85%' },
//     { id: 40, name: 'South Pier Camera Switch', description: '', floors: 1, x: '8.5%', y: '48%' },
//     { id: 41, name: 'Location D Switch (Old)', description: '', floors: 1, x: '48.5%', y: '47.5%'},
//     { id: 42, name: 'Gate No.2 Camera Switch', description: '', floors: 1, x: '58%', y: '43%' },
//     { id: 43, name: 'SWC Unit Office Network Switch', description: '', floors: 1, x: '81%', y: '39%'},
//     { id: 44, name: 'Gate No.3 (Security Hut) Network Switch', description: '', floors: 1, x: '78.5%', y: '9.5%'},
//     { id: 45, name: 'New Sub Contract Network Switch', description: '', floors: 1, x: '45.5%', y: '16%' },
//     { id: 46, name: 'Production Office Switch (New)', description: '', floors: 1, x: '75.5%', y: '31.5%'},
//     { id: 47, name: 'Supplies Switch', description: '', floors: 1, x: '76%', y: '30%' },
//   ];

//   const handleDockClick = async (dock) => {
//     setLoading(true);
//     setError(null);
//     setSelectedDock(dock);

//     try {
//       const response = await fetch('http://10.0.13.48:8088/ICTDevice/GetHeadBulid', {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.StatusCode === 200 && data.ResultSet) {
//         const filteredFloors = data.ResultSet.filter((floor) => floor.Build_Code === dock.id);
//         setFloors(filteredFloors);
//         setCurrentView('floors');
//       } else {
//         setError('No floors found for this building');
//       }
//     } catch (error) {
//       console.error('API error:', error);
//       setError('Network error: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFloorClick = async (floor) => {
//     setSelectedFloor(floor);
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://10.0.13.48:8088/ICTDevice/GetHeadBulid`, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.StatusCode === 200 && data.ResultSet) {
//         const filteredSectors = data.ResultSet.filter(
//           (item) =>
//             item.Build_Code === selectedDock?.id &&
//             item.Flo_No.toString() === floor.Flo_No.toString(),
//         );
//         setSectors(filteredSectors);
//         setCurrentView('sectors');
//       } else {
//         setError('No sectors found for this floor');
//       }
//     } catch (error) {
//       console.error('API error:', error);
//       setError('Network error: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSectorClick = async (sector) => {
//     setSelectedSector(sector);
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `http://10.0.13.48:8088/ICTDevice/GetComDetails?loccode=${sector.Flo_No}&catcodea=${sector.Cat_CodeB}`,
//         {
//           method: 'GET',
//           headers: { Accept: 'application/json' },
//         },
//       );

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//       const data = await response.json();

//       if (data.StatusCode === 200 && data.ResultSet) {
//         setDevices(data.ResultSet);
//         setCurrentView('network');
//       } else {
//         setError('No devices found for this sector');
//       }
//     } catch (err) {
//       console.error('API error:', err);
//       setError('Network error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePCClick = (pcId) => {
//     setPcDetailsOpen(true);
//   };

//   const handleBack = () => {
//     if (currentView === 'floors') {
//       setCurrentView('port');
//       setSelectedDock(null);
//     } else if (currentView === 'sectors') {
//       setCurrentView('floors');
//       setSelectedFloor(null);
//     } else if (currentView === 'network') {
//       setCurrentView('sectors');
//       setSelectedSector(null);
//     }
//   };

//   const toggleSwitches = () => {
//     setShowSwitches(!showSwitches);
//   };

//   const renderPortView = () => {
//     const filteredDocks = docks.filter((dock) =>
//       dock.name.toLowerCase().includes(searchQuery.toLowerCase()),
//     );

//     return (
//       <Box
//         sx={{
//           position: 'relative',
//           width: '100%',
//           height: '90vh',
//           backgroundColor: '#f4f4f4',
//           overflow: 'hidden',
//           display: 'flex',
//           fontFamily: 'Arial, sans-serif',
//         }}
//       >
//         {/* Sidebar for Docks */}
//         <Box
//           sx={{
//             width: 280,
//             backgroundColor: '#ffffff',
//             borderRight: '1px solid #b8b6b6ff',
//             display: 'flex',
//             flexDirection: 'column',
//             boxShadow: 2,
//           }}
//         >
//           {/* Header */}
//           <Box
//             sx={{
//               p: 2,
//               borderBottom: '1px solid #e0e0e0',
//               background: 'linear-gradient(135deg, #1976d2, #1565c0)',
//             }}
//           >
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               sx={{ color: 'white', fontSize: '16px', letterSpacing: 0.5 }}
//             >
//               {showSwitches ? 'Switch Locations' : 'Building Locations'}
//             </Typography>
//           </Box>

//           {/* Search Bar */}
//           <Box sx={{ p: 1.2, borderBottom: '1px solid #f0f0f0' }}>
//             <TextField
//               size="small"
//               fullWidth
//               placeholder={showSwitches ? "Search switches..." : "Search buildings..."}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon fontSize="small" sx={{ color: 'gray' }} />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           {/* List - shows either buildings or switches based on toggle */}
//           <Box
//             sx={{
//               flex: 1,
//               overflowY: 'auto',
//               '&::-webkit-scrollbar': {
//                 width: '6px',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: '#c1c1c1',
//                 borderRadius: '6px',
//               },
//             }}
//           >
//             {showSwitches ? (
//               // Show switches list
//               dockswitches.map((switchItem) => (
//                 <Tooltip key={switchItem.id} title={switchItem.name} arrow placement="right">
//                   <Box
//                     sx={{
//                       p: 1.5,
//                       pl: 2,
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       backgroundColor: hoveredSwitch === switchItem.id ? '#e3f2fd' : 'transparent',
//                       borderLeft: hoveredSwitch === switchItem.id ? '4px solid #1976d2' : '4px solid transparent',
//                       '&:hover': {
//                         backgroundColor: '#a19d9dff',
//                         transform: 'translateX(4px)',
//                       },
//                       transition: 'all 0.25s ease',
//                     }}
//                     onClick={() => console.log('Switch clicked:', switchItem)}
//                     onMouseEnter={() => setHoveredSwitch(switchItem.id)}
//                     onMouseLeave={() => setHoveredSwitch(null)}
//                   >
//                     <Storage sx={{ mr: 1, fontSize: 16, color: '#388e3c' }} />
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: '14px',
//                         fontWeight: hoveredSwitch === switchItem.id ? 600 : 400,
//                         color: hoveredSwitch === switchItem.id ? '#1976d2' : '#424242',
//                       }}
//                     >
//                       {switchItem.name}
//                     </Typography>
//                   </Box>
//                 </Tooltip>
//               ))
//             ) : (
//               // Show buildings list
//               filteredDocks.map((dock) => (
//                 <Tooltip key={dock.id} title={dock.description} arrow placement="right">
//                   <Box
//                     sx={{
//                       p: 1.5,
//                       pl: 2,
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       backgroundColor: selectedDock?.id === dock.id ? '#e3f2fd' : 'transparent',
//                       borderLeft:
//                         selectedDock?.id === dock.id ? '4px solid #1976d2' : '4px solid transparent',
//                       '&:hover': {
//                         backgroundColor: '#a19d9dff',
//                         transform: 'translateX(4px)',
//                       },
//                       transition: 'all 0.25s ease',
//                     }}
//                     onClick={() => handleDockClick(dock)}
//                     onMouseEnter={() => setHoveredDock(dock.id)}
//                     onMouseLeave={() => setHoveredDock(null)}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: '14px',
//                         fontWeight: selectedDock?.id === dock.id ? 600 : 400,
//                         color: selectedDock?.id === dock.id ? '#1976d2' : '#424242',
//                       }}
//                     >
//                       {dock.name}
//                     </Typography>
//                   </Box>
//                 </Tooltip>
//               ))
//             )}

//             {(showSwitches ? dockswitches.length === 0 : filteredDocks.length === 0) && (
//               <Typography variant="body2" sx={{ color: 'gray', p: 2, textAlign: 'center' }}>
//                 No items found
//               </Typography>
//             )}
//           </Box>
//         </Box>

//         {/* Map View */}
//         <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
//           {/* Map Image */}
//           <img
//             src={Map}
//             alt="Port Overview"
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'contain',
//               position: 'absolute',
//               top: 0,
//               left: 0,
//             }}
//           />

//           {/* Map Tool Buttons */}
//           <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 40, display: 'flex', gap: 1 }}>
//             <Tooltip title="Network Switch Map" arrow>
//               <IconButton
//                 onClick={() => {
//                   setZoomOpen(true);
//                   setOpenImage('Network_Switch_Map');
//                 }}
//                 sx={{
//                   bgcolor: 'white',
//                   boxShadow: 2,
//                   '&:hover': { boxShadow: '0 0 10px 2px #3b82f6' },
//                 }}
//               >
//                 <img src={NetworkSwitch} alt="mini-map" style={{ width: 24, height: 24 }} />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Network Diagram" arrow>
//               <IconButton
//                 onClick={() => {
//                   setZoomOpen(true);
//                   setOpenImage('LAN_REVISED');
//                 }}
//                 sx={{
//                   bgcolor: 'white',
//                   boxShadow: 2,
//                   '&:hover': { boxShadow: '0 0 10px 2px #3b82f6' },
//                 }}
//               >
//                 <img src={NetworkDigIcon} alt="other mini-map" style={{ width: 24, height: 24 }} />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title={showSwitches ? "Show Buildings" : "Show Switches"} arrow>
//               <IconButton
//                 onClick={toggleSwitches}
//                 sx={{
//                   bgcolor: showSwitches ? '#e0f2fe' : 'white',
//                   boxShadow: 2,
//                   '&:hover': { boxShadow: '0 0 10px 2px #3b82f6' },
//                 }}
//               >
//                 <img src={Switches} alt="switch map" style={{ width: 24, height: 24 }} />
//               </IconButton>
//             </Tooltip>
//           </Box>

//           {/* Water overlay */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%)',
//               opacity: 0.15,
//             }}
//           />

//           {/* Show either Building Markers OR Switch Markers, but not both */}
//           {!showSwitches ? (
//             // Building Markers (only shown when switches are NOT shown)
//             <>
//               {docks.map((dock) => {
//                 const isSelected = selectedDock?.id === dock.id;
//                 const isHovered = hoveredDock === dock.id;

//                 return (
//                   <Tooltip
//                     key={dock.id}
//                     title={
//                       <Box>
//                         <Typography variant="subtitle2" fontWeight="bold">
//                           {dock.name}
//                         </Typography>
//                         {dock.description && (
//                           <Typography variant="body2">{dock.description}</Typography>
//                         )}
//                       </Box>
//                     }
//                     arrow
//                     placement="top"
//                   >
//                     <Fab
//                       size="small"
//                       onClick={() => handleDockClick(dock)}
//                       onMouseEnter={() => setHoveredDock(dock.id)}
//                       onMouseLeave={() => setHoveredDock(null)}
//                       sx={{
//                         color: '#fff',
//                         backgroundColor: isHovered
//                           ? 'rgba(255,0,0,0.6)'
//                           : isSelected
//                           ? '#ff9800'
//                           : '#1976d2',
//                         position: 'absolute',
//                         left: dock.x,
//                         top: dock.y,
//                         transform: isSelected
//                           ? 'translate(-50%, -50%) scale(1.4)'
//                           : 'translate(-50%, -50%) scale(1)',
//                         zIndex: isSelected ? 20 : 10,
//                         boxShadow: isHovered
//                           ? '0 0 12px 14px rgba(255,0,0,0.6)'
//                           : isSelected
//                           ? '0 4px 16px rgba(0,0,0,0.4)'
//                           : '0 2px 8px rgba(0,0,0,0.3)',
//                         transition: 'all 0.3s ease',
//                         cursor: 'pointer',
//                         '&:hover': {
//                           transform: 'translate(-50%, -50%) scale(1.4)',
//                           backgroundColor: 'red',
//                           boxShadow: '0 0 12px 14px rgba(255,0,0,0.6)',
//                         },
//                       }}
//                     >
//                       <LocationOn />
//                     </Fab>
//                   </Tooltip>
//                 );
//               })}
//             </>
//           ) : (
//             // Switch Markers (only shown when switches ARE shown)
//             dockswitches.map((switchItem) => {
//               const isHovered = hoveredSwitch === switchItem.id;

//               return (
//                 <Tooltip
//                   key={switchItem.id}
//                   title={
//                     <Box>
//                       <Typography variant="subtitle2" fontWeight="bold">
//                         {switchItem.name}
//                       </Typography>
//                     </Box>
//                   }
//                   arrow
//                   placement="top"
//                 >
//                   <Fab
//                     size="small"
//                     onClick={() => console.log('Switch clicked:', switchItem.name)}
//                     onMouseEnter={() => setHoveredSwitch(switchItem.id)}
//                     onMouseLeave={() => setHoveredSwitch(null)}
//                     sx={{
//                       color: '#fff',
//                       backgroundColor: isHovered ? '#f44336' : '#4caf50',
//                       position: 'absolute',
//                       left: switchItem.x,
//                       top: switchItem.y,
//                       transform: isHovered
//                         ? 'translate(-50%, -50%) scale(1.4)'
//                         : 'translate(-50%, -50%) scale(1)',
//                       zIndex: 15,
//                       boxShadow: isHovered
//                         ? '0 0 12px 14px rgba(244, 67, 54, 0.6)'
//                         : '0 2px 8px rgba(0,0,0,0.3)',
//                       transition: 'all 0.3s ease',
//                       cursor: 'pointer',
//                       '&:hover': {
//                         transform: 'translate(-50%, -50%) scale(1.4)',
//                         backgroundColor: '#f44336',
//                         boxShadow: '0 0 12px 14px rgba(244, 67, 54, 0.6)',
//                       },
//                     }}
//                   >
//                     <Storage />
//                   </Fab>
//                 </Tooltip>
//               );
//             })
//           )}

//           {/* Server Room Marker (always shown) */}
//           {staticServers.map((server) => (
//             <Tooltip key={server.id} title={server.name} arrow placement="top">
//               <Fab
//                 size="small"
//                 onClick={() => console.log('Server clicked:', server.name)}
//                 sx={{
//                   color: '#fff',
//                   backgroundColor: '#4caf50',
//                   position: 'absolute',
//                   left: server.left,
//                   top: server.top,
//                   transform: 'translate(-50%, -50%)',
//                   zIndex: 25,
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
//                   cursor: 'pointer',
//                   '&:hover': {
//                     transform: 'translate(-50%, -50%) scale(1.2)',
//                     boxShadow: '0 0 12px rgba(0,0,0,0.5)',
//                   },
//                 }}
//               >
//                 <img
//                   src={Serverroom}
//                   alt="Server Room"
//                   style={{ width: 40, height: 40, borderRadius: 50 }}
//                 />
//               </Fab>
//             </Tooltip>
//           ))}

//           {/* Selected item info */}
//           {(selectedDock && !showSwitches) && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 20,
//                 right: 20,
//                 backgroundColor: 'rgba(255,0,0,0.6)',
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 p: 2,
//                 maxWidth: 240,
//                 zIndex: 30,
//               }}
//             >
//               <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#1976d2' }}>
//                 {selectedDock.name}
//               </Typography>
//             </Box>
//           )}

//           {/* Connection Line */}
//           {(() => {
//             const dtsDock = docks.find((d) => d.id === 'DTS');
//             const mainServer = staticServers.find((s) => s.id === 'server1');

//             if (!dtsDock || !mainServer) return null;

//             return (
//               <svg
//                 style={{
//                   position: 'absolute',
//                   width: '100%',
//                   height: '100%',
//                   top: 0,
//                   left: 0,
//                   pointerEvents: 'none',
//                   zIndex: 22,
//                 }}
//               >
//                 <defs>
//                   <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//                     <feDropShadow
//                       dx="0"
//                       dy="0"
//                       stdDeviation="3"
//                       floodColor="red"
//                       floodOpacity="1"
//                     />
//                     <feDropShadow
//                       dx="0"
//                       dy="0"
//                       stdDeviation="6"
//                       floodColor="orange"
//                       floodOpacity="0.8"
//                     />
//                     <feDropShadow
//                       dx="0"
//                       dy="0"
//                       stdDeviation="9"
//                       floodColor="yellow"
//                       floodOpacity="0.6"
//                     />
//                   </filter>

//                   <marker
//                     id="arrowhead"
//                     markerWidth="4"
//                     markerHeight="4"
//                     refX="4"
//                     refY="2"
//                     orient="auto"
//                     markerUnits="strokeWidth"
//                   >
//                     <path d="M0,0 L4,2 L0,4 Z" fill="black" />
//                   </marker>
//                 </defs>

//                 <line
//                   x1={dtsDock.x}
//                   y1={dtsDock.y}
//                   x2={mainServer.left}
//                   y2={mainServer.top}
//                   stroke="black"
//                   strokeWidth="2.0"
//                   strokeDasharray="5,5"
//                   markerEnd="url(#arrowhead)"
//                 />
//               </svg>
//             );
//           })()}
//         </Box>

//         {/* Network Diagram Dialog */}
//         <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)} maxWidth="lg" fullWidth>
//           <DialogContent sx={{ p: 0 }}>
//             <ZoomableImage
//               src={openImage === 'LAN_REVISED' ? LAN_REVISED : Network_Switch_Map}
//               alt="Zoomed Map"
//             />
//           </DialogContent>
//         </Dialog>
//       </Box>
//     );
//   };

//   const renderFloorsView = () => {
//     const floorMap = floors.reduce((acc, sector) => {
//       const key = sector.Flo_No;

//       if (!acc[key]) {
//         acc[key] = {
//           Flo_Code: sector.Flo_Code,
//           Flo_No: sector.Flo_No,
//           Build_Code: sector.Build_Code,
//           DisplayName: sector.Flo_Code === '0' ? 'Ground Floor' : `${sector.Flo_Code} Floor`,
//           ComputerCount: 0,
//           ActiveCount: 0,
//           sectors: [],
//         };
//       }

//       acc[key].ComputerCount += Number(sector.ComputerCount || 0);
//       acc[key].ActiveCount += Number(sector.ComputerCount || 0);
//       acc[key].sectors.push(sector);

//       return acc;
//     }, {});

//     const formattedFloors = Object.values(floorMap).sort(
//       (a, b) => Number(a.Flo_Code) - Number(b.Flo_Code),
//     );

//     return (
//       <Box
//         sx={{
//           minHeight: '100vh',
//           p: 4,
//           background: 'linear-gradient(to bottom right, #1e293b, #1e40af)',
//         }}
//       >
//         <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
//           {/* Header */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               mb: 6,
//               flexShrink: 0,
//             }}
//           >
//             <IconButton
//               onClick={handleBack}
//               sx={{
//                 bgcolor: 'rgba(255,255,255,0.1)',
//                 color: 'white',
//               }}
//             >
//               <ArrowBack />
//             </IconButton>

//             <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   gap: 2,
//                   mb: 1,
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h4" color="white" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
//                     {selectedDock?.name}
//                   </Typography>
//                   <Typography variant="subtitle1" color="white" sx={{ opacity: 0.8 }}>
//                     {selectedDock?.description}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Typography variant="h6" color="primary.light">
//                 Floor Selection
//               </Typography>
//             </Box>
//           </Box>

//           {/* Floor Cards */}
//           <Grid container spacing={3}>
//             {formattedFloors.map((floor) => {
//               const activeCount = floor.ActiveCount;
//               const totalCount = floor.ComputerCount;

//               return (
//                 <Grid item xs={12} sm={6} md={3} key={floor.Flo_No}>
//                   <Card
//                     onClick={() => handleFloorClick(floor)}
//                     sx={{
//                       height: '100%',
//                       borderRadius: 3,
//                       background: 'rgba(255,255,255,0.05)',
//                       border: '1px solid rgba(255,255,255,0.1)',
//                       cursor: 'pointer',
//                       transition: '0.3s',
//                       '&:hover': {
//                         transform: 'scale(1.03)',
//                         boxShadow: 6,
//                         background: 'rgba(255,255,255,0.1)',
//                       },
//                     }}
//                   >
//                     <CardContent>
//                       <Box
//                         sx={{
//                           position: 'relative',
//                           mb: 2,
//                           display: 'flex',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             width: 60,
//                             height: 60,
//                             background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
//                             borderRadius: 2,
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}
//                         >
//                           <Building color="white" size={32} />
//                         </Box>
//                         <Box
//                           sx={{
//                             position: 'absolute',
//                             top: -10,
//                             right: -10,
//                             width: 40,
//                             height: 40,
//                             background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
//                             color: 'white',
//                             borderRadius: '50%',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             fontWeight: 'bold',
//                           }}
//                         >
//                           {(floor.Flo_Code === '0' || isNaN(floor.Flo_Code)) ? 'G' : floor.Flo_Code}
//                         </Box>
//                       </Box>

//                       <Typography variant="h6" align="center" color="white" gutterBottom>
//                         {(floor.DisplayName === '0' || /^[A-Za-z]/.test(floor.DisplayName)) ? 'Ground Floor': floor.DisplayName}
//                       </Typography>

//                       {/* Counts */}
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Monitor size={16} color="#93c5fd" />
//                           <Typography variant="body2" color="white">
//                             Total PCs
//                           </Typography>
//                         </Box>
//                         <Typography variant="body2" color="white">
//                           {totalCount}
//                         </Typography>
//                       </Box>

//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Wifi size={16} color="#4ade80" />
//                           <Typography variant="body2" color="#4ade80">
//                             Active
//                           </Typography>
//                         </Box>
//                         <Typography variant="body2" color="#4ade80">
//                           {activeCount}
//                         </Typography>
//                       </Box>

//                       {/* Progress Bar */}
//                       <Box
//                         sx={{
//                           mt: 2,
//                           width: '100%',
//                           height: 8,
//                           backgroundColor: 'rgba(255,255,255,0.2)',
//                           borderRadius: 4,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             width: totalCount > 0 ? `${(activeCount / totalCount) * 100}%` : '0%',
//                             height: '100%',
//                             background: 'linear-gradient(to right, #4ade80, #3b82f6)',
//                             borderRadius: 4,
//                             transition: 'width 0.3s',
//                           }}
//                         />
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </Box>
//       </Box>
//     );
//   };

//   const renderSectorsView = () => {
//     const filteredSectors = sectors.filter((sector) => sector.Flo_Code === selectedFloor?.Flo_Code);

//     return (
//       <Box
//         sx={{
//           minHeight: '100vh',
//           p: 2,
//           background: 'linear-gradient(to bottom right, #1e293b, #1e40af)',
//           overflow: 'hidden',
//         }}
//       >
//         <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
//           {/* Header */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               mb: 6,
//               flexShrink: 0,
//             }}
//           >
//             <IconButton
//               onClick={handleBack}
//               sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
//             >
//               <ArrowBack />
//             </IconButton>
//             <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   gap: 2,
//                   mb: 1,
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h4" color="white" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
//                     {selectedDock?.name}
//                   </Typography>
//                   <Typography variant="subtitle1" color="white" sx={{ opacity: 0.8 }}>
//                     {selectedDock?.description}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Typography variant="h6" color="primary.light">
//                 Sector Selection
//               </Typography>
//             </Box>
//           </Box>

//           {/* Sector Cards */}
//           <Grid container spacing={3}>
//             {sectors.map((sector) => (
//               <Grid item xs={12} sm={6} md={4} key={sector.Flo_Code}>
//                 <Card
//                   onClick={() => handleSectorClick(sector)}
//                   sx={{
//                     p: 2,
//                     cursor: 'pointer',
//                     background: 'rgba(255,255,255,0.05)',
//                     border: '1px solid rgba(255,255,255,0.1)',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     '&:hover': { transform: 'scale(1.03)', background: 'rgba(255,255,255,0.1)' },
//                   }}
//                 >
//                   <Box sx={{ mb: 2 }}>
//                     <img src={SectorIcon} alt="Sector" width={48} height={48} />
//                   </Box>

//                   <CardContent sx={{ textAlign: 'center', p: 0 }}>
//                     <Typography variant="h6" color="white">
//                       {sector.Flo_Name}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>
//     );
//   };

//   return (
//     <Box>
//       {currentView === 'port' && renderPortView()}
//       {currentView === 'floors' && renderFloorsView()}
//       {currentView === 'sectors' && renderSectorsView()}
//       {currentView === 'network' && (
//         <NetworkView
//           handlePCClick={handlePCClick}
//           handleBack={handleBack}
//           selectedDock={selectedDock}
//           selectedFloor={selectedFloor}
//           selectedSector={selectedSector}
//           devices={devices}
//           Flo_No={selectedSector?.Flo_No}
//           Cat_CodeB={selectedSector?.Cat_CodeB}
//         />
//       )}

//       {/* PC Details Dialog */}
//       <Dialog open={pcDetailsOpen} onClose={() => setPcDetailsOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Computer color="primary" />
//             PC Details - {selectedPC?.id}
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           {selectedPC && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Device Type
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 2 }}>
//                   {selectedPC.type}
//                 </Typography>

//                 <Typography variant="subtitle2" color="text.secondary">
//                   Assigned User
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 2 }}>
//                   {selectedPC.user}
//                 </Typography>

//                 <Typography variant="subtitle2" color="text.secondary">
//                   IP Address
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 2 }}>
//                   {selectedPC.ip}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Operating System
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 2 }}>
//                   {selectedPC.os}
//                 </Typography>

//                 <Typography variant="subtitle2" color="text.secondary">
//                   Specifications
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 2 }}>
//                   {selectedPC.specs}
//                 </Typography>

//                 <Typography variant="subtitle2" color="text.secondary">
//                   Status
//                 </Typography>
//                 <Chip
//                   label={selectedPC.status}
//                   color={
//                     selectedPC.status === 'Online' || selectedPC.status === 'Operational'
//                       ? 'success'
//                       : 'error'
//                   }
//                   size="small"
//                   sx={{ mb: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Last Update
//                 </Typography>
//                 <Typography variant="body2">{selectedPC.lastUpdate}</Typography>
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setPcDetailsOpen(false)} variant="contained">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };




// export default PortNavigationApp;



import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
  InputAdornment,
  TextField,
  Fab,
} from '@mui/material';
import {
  LocationOn,
  Computer,
  ArrowBack,
  Storage,
  Print,
  BatteryChargingFull,
} from '@mui/icons-material';
import Map from '../../../assets/images/blueprints/cdlplc.png';
import Serverroom from '../../../assets/locationType/serverroom.jpg';
import { Building, Monitor, Wifi, WifiOff } from 'lucide-react';
import NetworkView from '../../../components/dashboards/locationInfo/NetworkView';
import { Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import LAN_REVISED from '../../../assets/images/blueprints/CDPLC LAN-REVISED.jpg';
import Network_Switch_Map from '../../../assets/images/blueprints/Network Switch Map.jpg';
import SectorIcon from '../../../assets/images/icons/sector.ico';
import NetworkDigIcon from '../../../assets/images/icons/diagram.ico';
import NetworkSwitch from '../../../assets/images/icons/network-switch.ico';
import Switches from '../../../assets/images/icons/switches.ico';
// Remove these lines if the files don't exist
// import PrinterIcon from '../../../assets/images/icons/printer.ico';
// import UpsIcon from '../../../assets/images/icons/ups.ico';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import UpsIcon from '../../../assets/images/icons/ups.ico';
import DeviceInfoService from '../../../store/services/common/deviceInfo/DeviceInfoService';
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
          width: '100%',
          height: 'auto',
          transition: 'transform 0.2s ease',
          transformOrigin,
        }}
        className="zoomable"
      />
      <style>{`.zoomable:hover { transform: scale(2.0); }`}</style>
    </div>
  );
};

const PortNavigationApp = () => {
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState('port');
  const [selectedDock, setSelectedDock] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedPC, setSelectedPC] = useState(null);
  const [pcDetailsOpen, setPcDetailsOpen] = useState(false);
  const [hoveredDock, setHoveredDock] = useState(null);
  const [hoveredSwitch, setHoveredSwitch] = useState(null);
  const [hoveredPrinter, setHoveredPrinter] = useState(null);
  const [hoveredUps, setHoveredUps] = useState(null);
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomOpen, setZoomOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  // Toggle states for different views
  const [showSwitches, setShowSwitches] = useState(false);
  const [showPrinters, setShowPrinters] = useState(false);
  const [showUps, setShowUps] = useState(false);
  const [allSectorsData, setAllSectorsData] = useState([]);

  // locationPingStatus: { [dockId]: 'up' | 'down' | 'loading' | 'unknown' }
  const [locationPingStatus, setLocationPingStatus] = useState({});
  const [allDevices, setAllDevices] = useState([]);
  const [searchType, setSearchType] = useState('locations'); // 'locations' | 'devices'
  const [highlightedDeviceName, setHighlightedDeviceName] = useState(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await fetch('http://10.0.13.48:8088/ICTDevice/GetHeadBulid', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.StatusCode === 200 && data.ResultSet) {
            setAllSectorsData(data.ResultSet);
            // Trigger ping checks after loading sector data
            pingAllLocations(data.ResultSet);
          }
        }
      } catch (error) {
        console.error('Error fetching sectors data on mount:', error);
      }
    };

    fetchSectors();
  }, []);

  /**
  
   *  - IsOnline: true                      → active (not down)
   *  - IsOnline: false, Status: "ResumeAutomatic", "Resume Automatic", "Suspend", "Console Disconnect", "Shutdown"
   *                                        → active (not counted as down)
   *  - IsOnline: false, Status: ""         → down (red on the map)
   *  - not found in status map             → untracked, NOT counted as down
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

  /**
   * Fetches all machine statuses from GetMachineStatus in one call, then
   * for each building fetches its devices via GetComDetails and cross-references
   * the status map. If any device is down, marks the location as 'down' (red).
   */
  const pingAllLocations = async (sectorsData) => {
    if (!sectorsData || sectorsData.length === 0) return;

    // Group sectors by Build_Code to get unique buildings
    const buildingMap = {};
    sectorsData.forEach((sector) => {
      if (!buildingMap[sector.Build_Code]) {
        buildingMap[sector.Build_Code] = [];
      }
      buildingMap[sector.Build_Code].push(sector);
    });

    const buildingIds = Object.keys(buildingMap);

    // Mark all as loading initially
    const initialStatus = {};
    buildingIds.forEach((id) => {
      initialStatus[id] = 'loading';
    });
    setLocationPingStatus(initialStatus);
    setAllDevices([]);

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
      console.warn('[GetMachineStatus] Failed to fetch bulk machine status:', err);
    }

    // Process each building in parallel using the status map
    buildingIds.forEach(async (buildCode) => {
      const sectors = buildingMap[buildCode];

      try {
        // Run all sectors for this building in parallel
        const sectorResults = await Promise.all(
          sectors.map(async (sector) => {
            if (!sector.Flo_No || !sector.Cat_CodeB) return { hasDevice: false, hasDown: false };

            try {
              const devResponse = await fetch(
                `http://10.0.13.48:8088/ICTDevice/GetComDetails?loccode=${sector.Flo_No}&catcodea=${sector.Cat_CodeB}`,
                { method: 'GET', headers: { Accept: 'application/json' } }
              );

              if (!devResponse.ok) return { hasDevice: false, hasDown: false };
              const devData = await devResponse.json();

              if (devData.StatusCode === 200 && devData.ResultSet && devData.ResultSet.length > 0) {
                const devices = devData.ResultSet;

                // Index devices for global search
                const devicesWithLocation = devices.map((d) => ({
                  ...d,
                  Build_Code: sector.Build_Code,
                  Flo_No: sector.Flo_No,
                  Flo_Code: sector.Flo_Code,
                  Cat_CodeB: sector.Cat_CodeB,
                  Flo_Name: sector.Flo_Name,
                }));
                setAllDevices((prev) => {
                  const filteredPrev = prev.filter(
                    (p) =>
                      !devicesWithLocation.some(
                        (d) =>
                          (d.ComputerName || d.ComputerCode || '').trim().toLowerCase() ===
                          (p.ComputerName || p.ComputerCode || '').trim().toLowerCase()
                      )
                  );
                  return [...filteredPrev, ...devicesWithLocation];
                });

                // Cross-reference each device against the bulk status map
                const sectorTotal = devices.length;
                const sectorDown = devices.filter((device) => {
                  const deviceName = device.ComputerName || device.ComputerCode;
                  return isMachineDown(deviceName, statusMap);
                }).length;
                // Active count includes all devices except the genuinely down ones
                const sectorActive = sectorTotal - sectorDown;

                // Update this sector's counts in allSectorsData
                setAllSectorsData((prevSectors) =>
                  prevSectors.map((s) => {
                    if (s.Flo_No === sector.Flo_No && s.Cat_CodeB === sector.Cat_CodeB) {
                      return {
                        ...s,
                        ComputerCount: sectorTotal,
                        ActiveCount: sectorActive,
                        DownCount: sectorDown, // genuinely offline (not shutdown, not untracked)
                      };
                    }
                    return s;
                  })
                );

                return {
                  hasDevice: true,
                  hasDown: sectorDown > 0,
                };
              }
            } catch (sectorErr) {
              console.warn(`Error fetching devices for sector ${sector.Flo_No}:`, sectorErr);
            }
            return { hasDevice: false, hasDown: false };
          })
        );

        // Determine building status from sector results
        const hasAnyDevice = sectorResults.some((r) => r.hasDevice);
        const hasAnyDown = sectorResults.some((r) => r.hasDown);

        setLocationPingStatus((prev) => ({
          ...prev,
          [buildCode]: hasAnyDevice ? (hasAnyDown ? 'down' : 'up') : 'unknown',
        }));
      } catch (err) {
        console.warn(`Error processing location ${buildCode}:`, err);
        setLocationPingStatus((prev) => ({ ...prev, [buildCode]: 'unknown' }));
      }
    });
  };

  const getDockStats = (dockId) => {
    const dockSectors = allSectorsData.filter((sector) => sector.Build_Code === dockId);
    let totalCount = 0;
    let activeCount = 0;
    let downCount = 0;

    dockSectors.forEach((sector) => {
      totalCount += Number(sector.ComputerCount || 0);
      activeCount += Number(sector.ActiveCount !== undefined ? sector.ActiveCount : (sector.ComputerCount || 0));
      downCount += Number(sector.DownCount || 0); // only genuinely offline (not shutdown/untracked)
    });

    return { totalCount, activeCount, downCount };
  };

  /**
   * Returns the marker color for a dock based on GetMachineStatus results.
   * - 'down'    → red  (#f44336)
   * - 'up'      → green (#4caf50)
   * - 'loading' → blue (default)
   * - 'unknown' → blue (default)
   */
  const getDockPingColor = (dockId, isSelected, isHovered) => {
    if (isHovered) return '#1565c0';
    if (isSelected) return '#ff9800';
    const status = locationPingStatus[dockId];
    if (status === 'down') return '#f44336';
    if (status === 'up') return '#4caf50';
    return '#1976d2'; // default blue (loading or unknown)
  };

  /**
   * Returns the pulse animation name for a dock marker.
   */
  const getDockAnimation = (dockId, isSelected, isHovered) => {
    if (isSelected || isHovered) return 'none';
    const status = locationPingStatus[dockId];
    if (status === 'down') return 'pulseRed 2s infinite';
    if (status === 'up') return 'pulseGreen 2s infinite';
    return 'none';
  };

  const docks = [
    {
      id: 'YM',
      name: 'Workshop Tool Stores,Deck Fitting Shop',
      description: 'Yard Building 13',
      floors: 3,
      x: '85%',
      y: '23%',
    },
    {
      id: 'YO',
      name: 'security Office Gate No 03',
      description: 'Yard Building 15',
      floors: 3,
      x: '77%',
      y: '6%',
    },
    {
      id: 'YN',
      name: 'Machine shop,Fitting Shop',
      description: 'Yard Building 14',
      floors: 6,
      x: '83%',
      y: '16%',
    },
    {
      id: 'YL',
      name: 'Electrical shop,metal workshop',
      description: 'Yard Building 12',
      floors: 6,
      x: '76%',
      y: '17%',
    },
    {
      id: 'YK',
      name: 'Automation,Electronic shop,pipe Fabrication ,Foundry ',
      description: 'Yard Building 11',
      floors: 3,
      x: '88%',
      y: '33%',
    },
    {
      id: 'YJ',
      name: 'Kitchen,welfare canteen ',
      description: 'Yard Building 10',
      floors: 6,
      x: '74%',
      y: '21%',
    },
    {
      id: 'YI',
      name: 'Civil Maintenance and Dock Electrical',
      description: 'Yard Building 09',
      floors: 6,
      x: '63%',
      y: '27%',
    },
    {
      id: 'YH',
      name: 'Electrical Maintenance and Pump House 1',
      description: 'Yard Building 08',
      floors: 6,
      x: '60%',
      y: '25%',
    },
    {
      id: 'YG',
      name: 'SWC Unit and Pool Office',
      description: 'Yard Building 07',
      floors: 6,
      x: '79%',
      y: '37%',
    },
    {
      id: 'YF',
      name: 'Blasting Chamber',
      description: 'Yard Building 06',
      floors: 6,
      x: '89%',
      y: '50%',
    },
    {
      id: 'YE',
      name: 'Site Errection, Dock No 2 Tool Stores',
      description: 'Yard Building 05',
      floors: 6,
      x: '79%',
      y: '57%',
    },
    {
      id: 'YD',
      name: 'Fiber Glass, Carpentry, Fire unit',
      description: 'Yard Building 04',
      floors: 6,
      x: '45%',
      y: '35%',
    },
    {
      id: 'YC',
      name: 'Scaffolding, Component Shop, NBD Tool Stores, Machinery Outfitting, Hull Repair, Hull Construction, Samagi',
      description: 'Yard Building 03',
      floors: 6,
      x: '44%',
      y: '45%',
    },
    {
      id: 'YB',
      name: 'Safety,Security Office Gate No.01',
      description: 'Yard Building 02',
      floors: 6,
      x: '38%',
      y: '79%',
    },
    {
      id: 'YA',
      name: 'Service Center, Pump House Dock No.04, Electrical Dock No.04, Gas Center',
      description: 'Yard Building 01',
      floors: 6,
      x: '26%',
      y: '75%',
    },
    { id: 'CO', name: 'Calibration Office', floors: 2, x: '80%', y: '18%' },
    {
      id: 'CA',
      name: 'CDPLC Administrative Building',
      description: 'HR, Supplies, Transport and Welfare and Production Office',
      floors: 4,
      x: '74%',
      y: '28%'
    },
    { id: 'MS', name: 'Main Store Building', floors: 5, x: '71%', y: '27%' },
    { id: 'FA', name: '40th Anniversary Building', floors: 3, x: '58%', y: '37%' },
    { id: 'LB', name: 'LOFT Building', floors: 2, x: '35%', y: '49%' },
    { id: 'SC', name: 'Sub Contract Administrative Building', floors: 3, x: '42%', y: '61%' },
    { id: 'HO', name: 'Head Office Building', floors: 5, x: '34%', y: '81%' },
    { id: 'TC', name: 'Training Center Building', floors: 5, x: '61%', y: '20%' },
    { id: 'DTS', name: 'DTS', floors: 5, x: '10%', y: '95%' },
  ];

  const staticServers = [{ id: 'server1', name: 'Server Room', top: '85%', left: '32%' }];

  // Switch locations data
  const dockswitches = [
    { id: 1, name: '4th Floor Switch - IT Department & Telephone Exchange', description: '', floors: 1, x: '33%', y: '83%' },
    { id: 2, name: '5th Floor Switch - Finance Department', description: '', floors: 1, x: '34%', y: '82%' },
    { id: 3, name: '3rd Floor Switch - Business Department', description: '', floors: 1, x: '32%', y: '84%' },
    { id: 4, name: 'Aluminium Shop', description: '', floors: 1, x: '27%', y: '80%' },
    { id: 5, name: 'Service Center', description: '', floors: 1, x: '25%', y: '75%' },
    { id: 6, name: 'Gas Center', description: '', floors: 1, x: '20.5%', y: '73%' },
    { id: 7, name: 'Safety Department', description: '', floors: 1, x: '35%', y: '80%' },
    { id: 8, name: 'Security Office Gate No.01', description: '', floors: 1, x: '38%', y: '77%' },
    { id: 9, name: '1st Floor - Service Procurement', description: '', floors: 1, x: '38%', y: '58%' },
    { id: 10, name: 'Ground Floor - Administrative Office', description: '', floors: 1, x: '37%', y: '57%' },
    { id: 11, name: 'LOFT Office', description: '', floors: 1, x: '35%', y: '51%' },
    { id: 12, name: 'Scaffolding Office', description: '', floors: 1, x: '36%', y: '41%' },
    { id: 13, name: 'Steel Hull Construction (SWC) Engineer Office', description: '', floors: 1, x: '46.5%', y: '48%' },
    { id: 14, name: 'Samagi Office', description: '', floors: 1, x: '45%', y: '46.5%' },
    { id: 15, name: 'Site Erection Office', description: '', floors: 1, x: '85%', y: '61%' },
    { id: 16, name: 'Training Center', description: '', floors: 1, x: '63.5%', y: '23.5%' },
    { id: 17, name: 'Training Center - Class Room C', description: '', floors: 1, x: '60%', y: '24%' },
    { id: 18, name: 'Quality Control Department', description: '', floors: 1, x: '60.5%', y: '20%' },
    { id: 19, name: 'Dock Electrical Office', description: '', floors: 1, x: '65%', y: '30%' },
    { id: 20, name: 'Main Stores - Location C', description: '', floors: 1, x: '73%', y: '31%' },
    { id: 21, name: 'Production Office Switch (Old)', description: '', floors: 1, x: '75%', y: '33%' },
    { id: 22, name: 'HR Office', description: '', floors: 1, x: '74%', y: '29%' },
    { id: 23, name: 'Fitting Shop Engineer Office', description: '', floors: 1, x: '78.5%', y: '13.5%' },
    { id: 24, name: 'Electrical Shop Office', description: '', floors: 1, x: '88%', y: '29.5%' },
    { id: 25, name: 'Calibration Office ', description: '', floors: 1, x: '83%', y: '22%' },
    { id: 26, name: 'Deck Fitting Shop Office', description: '', floors: 1, x: '89%', y: '25.5%' },
    { id: 27, name: 'Welfare Canteen Office', description: '', floors: 1, x: '76%', y: '21%' },
    { id: 28, name: 'Transport and Welfare Office', description: '', floors: 1, x: '73%', y: '25%' },
    { id: 29, name: 'Blasting Chamber Office', description: '', floors: 1, x: '90%', y: '51%' },
    { id: 30, name: '1st Floor Switch', description: '', floors: 1, x: '30%', y: '84%' },
    { id: 31, name: 'Gate No.01 Time Clock Switch (Security Hut)', description: '', floors: 1, x: '33.5%', y: '79%' },
    { id: 32, name: 'Deck Department Field Office', description: '', floors: 1, x: '42%', y: '63%' },
    { id: 33, name: 'NBD Tool Stores', description: '', floors: 1, x: '45%', y: '51%' },
    { id: 34, name: 'Fire Unit Stores', description: '', floors: 1, x: '52%', y: '38.5%' },
    { id: 35, name: 'Carpentry Shop Office', description: '', floors: 1, x: '45%', y: '37.5%' },
    { id: 36, name: 'Machinery Outfitting Shop', description: '', floors: 1, x: '50%', y: '45%' },
    { id: 37, name: '40th Anniversary Building Network Switch', description: '', floors: 1, x: '60%', y: '39%' },
    { id: 38, name: 'Component Shop Office', description: '', floors: 1, x: '43%', y: '49%' },
    { id: 39, name: '2nd Floor Lunch Room Camera Switch', description: '', floors: 1, x: '31%', y: '85%' },
    { id: 40, name: 'South Pier Camera Switch', description: '', floors: 1, x: '11%', y: '47%' },
    { id: 41, name: 'Location D Switch (Old)', description: '', floors: 1, x: '48.5%', y: '47.5%' },
    { id: 42, name: 'Gate No.2 Camera Switch', description: '', floors: 1, x: '58%', y: '43%' },
    { id: 43, name: 'SWC Unit Office Network Switch', description: '', floors: 1, x: '81%', y: '39%' },
    { id: 44, name: 'Gate No.3 (Security Hut) Network Switch', description: '', floors: 1, x: '77%', y: '9.5%' },
    { id: 45, name: 'New Sub Contract Network Switch', description: '', floors: 1, x: '45.5%', y: '16%' },
    { id: 46, name: 'Production Office Switch (New)', description: '', floors: 1, x: '75.5%', y: '31.5%' },
    { id: 47, name: 'Supplies Switch', description: '', floors: 1, x: '76%', y: '30%' },
  ];

  // UPS locations data
  const ups = [
    {
      id: 'ID',
      name: 'IT Department',
      description: 'IT Department',
      floors: 3,
      x: '34%',
      y: '85%',
    },
    {
      id: 'SOG1',
      name: 'Security Office Gate No.01',
      description: 'Security Office Gate No.01',
      floors: 3,
      x: '38%', y: '79%'
    },
    {
      id: 'SP',
      name: 'Service Procurement',
      description: 'Service Procurement',
      floors: 3,
      x: '40%', y: '60%'
    },
    {
      id: 'AO',
      name: 'Administrative Office',
      description: 'Administrative Office',
      floors: 3,
      x: '38%', y: '58%'
    },

    {
      id: 'LO',
      name: 'LOFT Office',
      description: 'LOFT Office',
      floors: 0,
      x: '35%', y: '51%'
    },

    {
      id: 'Swr',
      name: 'SWR Supervisor Office',
      description: 'SWR Supervisor Office',
      floors: 1,
      x: '46%',
      y: '47%'
    },
    {
      id: 'NBD',
      name: 'NBD Tool Stores',
      description: 'NBD Tool Stores',
      floors: 1,
      x: '46%', y: '51%',
    },
    {
      id: 'MAO',
      name: 'MAO Engineering Office',
      description: 'MAO Engineering Office',
      floors: 4,
      x: '50%', y: '45%'
    },
    {
      id: 'CS',
      name: 'Carpentry Shop',
      description: 'Carpentry Shop',
      floors: 4,
      x: '47%', y: '39%'
    },
    {
      id: 'AB40',
      name: '40th Anniversary Building',
      description: '40th Anniversary Building',
      floors: 4,
      x: '60%', y: '39%'
    },
    {
      id: 'SEO',
      name: 'Site Erection Office',
      description: 'Site Erection Office',
      floors: 4,
      x: '85%', y: '61%'
    },


    {
      id: 'SWC',
      name: 'SWC Unit Office',
      description: 'SWC Unit Office',
      floors: 4,
      x: '79%', y: '39%'
    },
    {
      id: 'TER',
      name: 'Telephone Exchange Room',
      description: 'Telephone Exchange Room',
      floors: 4,
      x: '73%', y: '31%'
    },
    {
      id: 'MSC',
      name: 'Main Store - Location C',
      description: 'Main Store - Location C',
      floors: 4,
      x: '72%', y: '28%'
    },
    {
      id: 'TC',
      name: 'Training Center',
      description: 'Training Center',
      floors: 4,
      x: '61%', y: '25%'
    },
    {
      id: 'QCD',
      name: 'Quality Control Department',
      description: 'Quality Control Department',
      floors: 4,
      x: '59%', y: '19%'
    },
    {
      id: 'ESO',
      name: 'Electrical Shop Office',
      description: 'Electrical Shop Office',
      floors: 4,
      x: '87%', y: '29%'
    },
    {
      id: 'CAL',
      name: 'Calibration Office',
      description: 'Calibration Office',
      floors: 4,
      x: '80%', y: '18%'
    },
    {
      id: 'FSEO',
      name: 'Fitting Shop Engineer Office',
      description: 'Fitting Shop Engineer Office',
      floors: 4,
      x: '76%', y: '12%'
    },
    // Add more UPS locations as needed
  ];

  // Printer locations data
  const printers = [
    // {
    //   id: 'SWC',
    //   name: 'SWC Unit Office',
    //   description: 'SWC Unit Office',
    //   floors: 0,
    //   x: '30%',
    //   y: '84%'
    // },
    {
      id: 'BD',
      name: 'Buisness Department',
      description: 'Buisness Department',
      floors: 3,
      x: '31%',
      y: '85%'
    },
    {
      id: 'NBMO',
      name: 'New Building Marketing office',
      description: 'New Building Marketing office',
      floors: 1,
      x: '33%',
      y: '83%'
    },
    {
      id: 'IT',
      name: 'IT Department',
      description: 'IT Department',
      floors: 4,
      x: '34%',
      y: '82%'
    },
    {
      id: 'DO',
      name: 'Design Office',
      description: 'Design Office',
      floors: 4,
      x: '35%', y: '80%',
    },
    {
      id: 'SD',
      name: 'Safety Department',
      description: 'Safety Department',
      floors: 4,
      x: '38%', y: '80%'
    },
    {
      id: 'FD',
      name: 'Finance Department',
      description: 'Finance Department',
      floors: 4,
      x: '36%', y: '80%',
    },
    {
      id: 'SP',
      name: 'Service Procurement',
      description: 'Service Procurement',
      floors: 4,
      x: '38%', y: '58%'
    },
    {
      id: 'MOO',
      name: 'Machinery Outfitting Office',
      description: 'Machinery Outfitting Office',
      floors: 4,
      x: '49%', y: '45%'
    },
    {
      id: 'YD',
      name: 'Yard Development Office',
      description: 'Yard Development Office',
      floors: 4,
      x: '58%', y: '43%'
    },
    {
      id: 'WA',
      name: 'Welfare Association Office',
      description: 'Welfare Association Office',
      floors: 4,
      x: '61%', y: '42%'
    },
    {
      id: 'SE',
      name: 'Site Erection Office',
      description: 'Site Erection Office',
      floors: 4,
      x: '79%', y: '60%'
    },
    {
      id: 'SWC',
      name: 'SWC Unit Office',
      description: 'SWC Unit Office',
      floors: 4,
      x: '81%', y: '39%'
    },
    {
      id: 'SUP',
      name: 'Supplies Office',
      description: 'Supplies Office',
      floors: 4,
      x: '73%', y: '31%'
    },
    {
      id: 'PRO',
      name: 'Production Office',
      description: 'Production Office',
      floors: 4,
      x: '75.5%', y: '31.5%'
    },
    {
      id: 'HR',
      name: 'HR Office',
      description: 'HR Office',
      floors: 4,
      x: '74%', y: '29%'
    },
    {
      id: 'TR',
      name: 'Training Center',
      description: 'Training Center',
      floors: 4,
      x: '63.5%', y: '23.5%'
    },
    {
      id: 'QC',
      name: 'Quality Control Department',
      description: 'Quality Control Department',
      floors: 4,
      x: '60.5%', y: '20%'
    },
    {
      id: 'CAL',
      name: 'Calibration Office',
      description: 'Calibration Office',
      floors: 4,
      x: '83%', y: '22%'
    },
    {
      id: 'FSE',
      name: 'Fitting Shop Engineer Office',
      description: 'Fitting Shop Engineer Office',
      floors: 4,
      x: '78.5%', y: '13.5%'
    },




    // Add more printer locations as needed
  ];

  const handleDockClick = (dock) => {
    setSelectedDock(dock);
    setCurrentView('floors');
  };

  const handleFloorClick = (floor) => {
    setSelectedFloor(floor);
    setCurrentView('sectors');
  };

  const handleSectorClick = async (sector) => {
    setSelectedSector(sector);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://10.0.13.48:8088/ICTDevice/GetComDetails?loccode=${sector.Flo_No}&catcodea=${sector.Cat_CodeB}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        },
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (data.StatusCode === 200 && data.ResultSet) {
        setDevices(data.ResultSet);
        setCurrentView('network');
      } else {
        setError('No devices found for this sector');
      }
    } catch (err) {
      console.error('API error:', err);
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePCClick = (pcId) => {
    setPcDetailsOpen(true);
  };

  const handleSearchDeviceClick = (device) => {
    // 1. Find the corresponding dock/building
    const dock = docks.find((d) => d.id === device.Build_Code);
    if (!dock) {
      console.warn('Dock not found for build code:', device.Build_Code);
      return;
    }

    // 2. Prepare floor object
    const floor = {
      Flo_Code: device.Flo_Code,
      Flo_No: device.Flo_No,
      Build_Code: device.Build_Code,
      DisplayName: device.Flo_Code === '0' ? 'Ground Floor' : `${device.Flo_Code} Floor`,
    };

    // 3. Find or construct sector object
    const sector = allSectorsData.find(
      (s) => s.Flo_No === device.Flo_No && s.Cat_CodeB === device.Cat_CodeB
    ) || {
      Flo_No: device.Flo_No,
      Flo_Code: device.Flo_Code,
      Flo_Name: device.Flo_Name,
      Cat_CodeB: device.Cat_CodeB,
      Build_Code: device.Build_Code,
    };

    // 4. Set state to navigate to the sector network view
    setSelectedDock(dock);
    setSelectedFloor(floor);
    setSelectedSector(sector);
    setHighlightedDeviceName(device.ComputerName || device.ComputerCode);
    setCurrentView('network');
  };

  const handleBack = () => {
    if (currentView === 'floors') {
      setCurrentView('port');
      setSelectedDock(null);
    } else if (currentView === 'sectors') {
      setCurrentView('floors');
      setSelectedFloor(null);
    } else if (currentView === 'network') {
      setCurrentView('sectors');
      setSelectedSector(null);
    }
  };

  // Toggle functions for different views
  const toggleSwitches = () => {
    setShowSwitches(!showSwitches);
    setShowPrinters(false);
    setShowUps(false);
  };

  const togglePrinters = () => {
    setShowPrinters(!showPrinters);
    setShowSwitches(false);
    setShowUps(false);
  };

  const toggleUps = () => {
    setShowUps(!showUps);
    setShowSwitches(false);
    setShowPrinters(false);
  };

  const renderPortView = () => {
    const filteredDocks = docks.filter((dock) =>
      dock.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Filter items based on current view
    let sidebarItems = [];
    let filteredDevices = [];
    let sidebarTitle = 'Building Locations';
    let sidebarIcon = null;
    let hoveredState = null;
    let setHoveredState = null;

    if (searchType === 'devices') {
      const query = searchQuery.trim().toLowerCase();
      filteredDevices = query
        ? allDevices.filter((dev) => {
            const name = (dev.ComputerName || dev.ComputerCode || '').toLowerCase();
            const ip = (dev.IP_Addres || dev.Com_IP || dev.ip || dev.IpAddress || '').toLowerCase();
            return name.includes(query) || ip.includes(query);
          })
        : [];
      sidebarTitle = 'Device Search';
      sidebarIcon = <Computer sx={{ mr: 1, fontSize: 16, color: '#1976d2' }} />;
      hoveredState = null;
      setHoveredState = () => {};
    } else if (showSwitches) {
      sidebarItems = dockswitches.filter((switchItem) =>
        switchItem.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      sidebarTitle = 'Switch Locations';
      sidebarIcon = <Storage sx={{ mr: 1, fontSize: 16, color: '#388e3c' }} />;
      hoveredState = hoveredSwitch;
      setHoveredState = setHoveredSwitch;
    } else if (showPrinters) {
      sidebarItems = printers.filter((printer) =>
        printer.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      sidebarTitle = 'Printer Locations';
      sidebarIcon = <Print sx={{ mr: 1, fontSize: 16, color: '#1976d2' }} />;
      hoveredState = hoveredPrinter;
      setHoveredState = setHoveredPrinter;
    } else if (showUps) {
      sidebarItems = ups.filter((upsItem) =>
        upsItem.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      sidebarTitle = 'UPS Locations';
      sidebarIcon = <BatteryChargingFull sx={{ mr: 1, fontSize: 16, color: '#ed6c02' }} />;
      hoveredState = hoveredUps;
      setHoveredState = setHoveredUps;
    } else {
      sidebarItems = filteredDocks;
      sidebarTitle = 'Building Locations';
      sidebarIcon = <LocationOn sx={{ mr: 1, fontSize: 16, color: '#1976d2' }} />;
      hoveredState = hoveredDock;
      setHoveredState = setHoveredDock;
    }

    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '90vh',
          backgroundColor: '#f4f4f4',
          overflow: 'hidden',
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: 280,
            backgroundColor: '#ffffff',
            borderRight: '1px solid #b8b6b6ff',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid #e0e0e0',
              background: 'linear-gradient(135deg, #1976d2, #1565c0)',
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: 'white', fontSize: '16px', letterSpacing: 0.5 }}
            >
              {sidebarTitle}
            </Typography>
          </Box>

          {/* Search Type Selector */}
          <Box sx={{ display: 'flex', borderBottom: '1px solid #e0e0e0', p: 0.5, backgroundColor: '#f9f9f9' }}>
            <Button
              size="small"
              fullWidth
              variant={searchType === 'locations' ? 'contained' : 'text'}
              onClick={() => {
                setSearchType('locations');
                setSearchQuery('');
              }}
              sx={{
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '12px',
                py: 0.5,
                boxShadow: searchType === 'locations' ? 1 : 0,
                backgroundColor: searchType === 'locations' ? '#1976d2' : 'transparent',
                color: searchType === 'locations' ? 'white' : '#555',
                '&:hover': {
                  backgroundColor: searchType === 'locations' ? '#1565c0' : 'rgba(0,0,0,0.04)',
                }
              }}
            >
              Locations
            </Button>
            <Button
              size="small"
              fullWidth
              variant={searchType === 'devices' ? 'contained' : 'text'}
              onClick={() => {
                setSearchType('devices');
                setSearchQuery('');
              }}
              sx={{
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '12px',
                py: 0.5,
                boxShadow: searchType === 'devices' ? 1 : 0,
                backgroundColor: searchType === 'devices' ? '#1976d2' : 'transparent',
                color: searchType === 'devices' ? 'white' : '#555',
                '&:hover': {
                  backgroundColor: searchType === 'devices' ? '#1565c0' : 'rgba(0,0,0,0.04)',
                }
              }}
            >
              Devices
            </Button>
          </Box>

          {/* Search Bar */}
          <Box sx={{ p: 1.2, borderBottom: '1px solid #f0f0f0' }}>
            <TextField
              size="small"
              fullWidth
              placeholder={searchType === 'devices' ? 'Search devices by name or IP...' : `Search ${sidebarTitle.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'gray' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* List */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c1c1c1',
                borderRadius: '6px',
              },
            }}
          >
            {searchType === 'devices' ? (
              filteredDevices.map((dev, index) => {
                const devName = dev.ComputerName || dev.ComputerCode || 'Unknown Device';
                const devIp = dev.IP_Addres || dev.Com_IP || dev.ip || dev.IpAddress || 'No IP';
                const isPrinter = (dev.Com_Type || '').toLowerCase().includes('printer');
                
                const dock = docks.find((d) => d.id === dev.Build_Code);
                const dockName = dock ? (dock.description || dock.name) : dev.Build_Code;
                const floorText = dev.Flo_Code === '0' ? 'Ground Floor' : `${dev.Flo_Code} Floor`;
                const locationLabel = `${dockName} - ${floorText} - ${dev.Flo_Name}`;
                const devKey = `${devName}-${devIp}-${index}`;

                return (
                  <Tooltip key={devKey} title={locationLabel} arrow placement="right">
                    <Box
                      sx={{
                        p: 1.5,
                        pl: 2,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderLeft: '4px solid transparent',
                        borderBottom: '1px solid #f3f4f6',
                        '&:hover': {
                          backgroundColor: '#f3f4f6',
                          borderLeft: '4px solid #1976d2',
                          transform: 'translateX(4px)',
                        },
                        transition: 'all 0.25s ease',
                      }}
                      onClick={() => handleSearchDeviceClick(dev)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        {isPrinter ? (
                          <Print sx={{ fontSize: 16, color: '#1976d2' }} />
                        ) : (
                          <Computer sx={{ fontSize: 16, color: '#1976d2' }} />
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#1e293b',
                          }}
                        >
                          {devName}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px', pl: 2.5 }}>
                        IP: {devIp}
                      </Typography>
                      <Typography variant="caption" color="primary.light" sx={{ fontSize: '10px', pl: 2.5, fontWeight: 500 }}>
                        {locationLabel}
                      </Typography>
                    </Box>
                  </Tooltip>
                );
              })
            ) : (
              sidebarItems.map((item) => (
                <Tooltip key={item.id} title={item.name} arrow placement="right">
                  <Box
                    sx={{
                      p: 1.5,
                      pl: 2,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: hoveredState === item.id ? '#e3f2fd' : 'transparent',
                      borderLeft: hoveredState === item.id ? '4px solid #1976d2' : '4px solid transparent',
                      '&:hover': {
                        backgroundColor: '#a19d9dff',
                        transform: 'translateX(4px)',
                      },
                      transition: 'all 0.25s ease',
                    }}
                    onClick={() => {
                      if (showSwitches) console.log('Switch clicked:', item.name);
                      else if (showPrinters) console.log('Printer clicked:', item.name);
                      else if (showUps) console.log('UPS clicked:', item.name);
                      else handleDockClick(item);
                    }}
                    onMouseEnter={() => setHoveredState(item.id)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    {sidebarIcon}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '14px',
                        fontWeight: hoveredState === item.id ? 600 : 400,
                        color: hoveredState === item.id ? '#1976d2' : '#424242',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Tooltip>
              ))
            )}

            {searchType === 'devices' && searchQuery.trim() !== '' && filteredDevices.length === 0 && (
              <Typography variant="body2" sx={{ color: 'gray', p: 2, textAlign: 'center' }}>
                No devices found
              </Typography>
            )}

            {searchType === 'devices' && searchQuery.trim() === '' && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Computer sx={{ fontSize: 40, color: '#94a3b8', mb: 1, mx: 'auto' }} />
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '13px' }}>
                  Type a device name or IP to search
                </Typography>
                {allDevices.length > 0 ? (
                  <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1, fontSize: '11px', color: '#94a3b8' }}>
                    Indexing complete ({allDevices.length} devices found)
                  </Typography>
                ) : (
                  <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1, fontSize: '11px', color: '#3b82f6' }}>
                    Indexing devices in background...
                  </Typography>
                )}
              </Box>
            )}

            {sidebarItems.length === 0 && searchType !== 'devices' && (
              <Typography variant="body2" sx={{ color: 'gray', p: 2, textAlign: 'center' }}>
                No items found
              </Typography>
            )}
          </Box>
        </Box>

        {/* Map View */}
        <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Map Image */}
          <img
            src={Map}
            alt="Port Overview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />

          {/* Map Tool Buttons */}
          <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 40, display: 'flex', gap: 1 }}>
            <Tooltip title="Network Switch Map" arrow>
              <IconButton
                onClick={() => {
                  setZoomOpen(true);
                  setOpenImage('Network_Switch_Map');
                }}
                sx={{
                  bgcolor: 'white',
                  boxShadow: 2,
                  '&:hover': { boxShadow: '0 0 10px 2px #3b82f6' },
                }}
              >
                <img src={NetworkSwitch} alt="mini-map" style={{ width: 24, height: 24 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Network Diagram" arrow>
              <IconButton
                onClick={() => {
                  setZoomOpen(true);
                  setOpenImage('LAN_REVISED');
                }}
                sx={{
                  bgcolor: 'white',
                  boxShadow: 2,
                  '&:hover': { boxShadow: '0 0 10px 2px #3b82f6' },
                }}
              >
                <img src={NetworkDigIcon} alt="other mini-map" style={{ width: 24, height: 24 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title={showSwitches ? "Show Buildings" : "Show Switches"} arrow>
              <IconButton
                onClick={toggleSwitches}
                sx={{
                  bgcolor: showSwitches ? '#e0f2fe' : 'white',
                  boxShadow: 2,
                  '&:hover': { boxShadow: '0 0 10px 2px #3b82f6' },
                }}
              >
                <img src={Switches} alt="switch map" style={{ width: 24, height: 24 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title={showPrinters ? "Show Buildings" : "Show Printers"} arrow>
              <IconButton
                onClick={togglePrinters}
                sx={{
                  bgcolor: showPrinters ? '#e0f2fe' : 'white',
                  boxShadow: 2,
                  '&:hover': { boxShadow: '0 0 10px 2px #3b82f6' },
                }}
              >
                <Print sx={{ color: showPrinters ? '#1976d2' : '#424242' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title={showUps ? "Show Buildings" : "Show UPS"} arrow>
              <IconButton
                onClick={toggleUps}
                sx={{
                  bgcolor: showUps ? '#e0f2fe' : 'white',
                  boxShadow: 2,
                  '&:hover': { boxShadow: '0 0 10px 2px #3b82f6' },
                }}
              >
                {/* <BatteryChargingFull sx={{ color: showUps ? '#ed6c02' : '#424242' }} /> */}
                <img
                  src={UpsIcon}
                  alt="UPS"
                  style={{
                    width: 24,
                    height: 24,
                    filter: showUps ? 'none' : 'grayscale(100%)',
                    bgcolor: showPrinters ? '#e0f2fe' : 'white',
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Water overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%)',
              opacity: 0.15,
            }}
          />

          {/* Building Markers */}
          {!showSwitches && !showPrinters && !showUps && (
            <>
              {docks.map((dock) => {
                const isSelected = selectedDock?.id === dock.id;
                const isHovered = hoveredDock === dock.id;
                const stats = getDockStats(dock.id);
                const inactiveCount = stats.downCount; // only genuinely offline devices (excludes shutdown & untracked)

                return (
                  <Box
                    key={dock.id}
                    sx={{
                      position: 'absolute',
                      left: dock.x,
                      top: dock.y,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isSelected
                        ? 40
                        : locationPingStatus[dock.id] === 'down'
                        ? 30
                        : 10,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Always visible inactive devices count tooltip */}
                    {stats.totalCount > 0 && inactiveCount > 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: isSelected ? '44px' : '34px', // Floats up dynamically when selected
                          backgroundColor: '#1e293b',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '6px',
                          px: 1.0,
                          py: 0.3,
                          fontSize: '11px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease',
                          zIndex: locationPingStatus[dock.id] === 'down' ? 50 : 25,
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            borderWidth: '4px',
                            borderStyle: 'solid',
                            borderColor: '#1e293b transparent transparent transparent',
                          }
                        }}
                      >
                        {inactiveCount > 0 ? (
                          <WifiOff size={13} color="#ef4444" />
                        ) : (
                          <Wifi size={13} color="#4ade80" />
                        )}
                        <span>{inactiveCount} / {stats.totalCount}</span>
                      </Box>
                    )}

                    {/* Hover tooltip for full building stats */}
                    <Tooltip
                      title={
                        <Box sx={{ p: 1 }}>
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#fff', mb: 0.5 }}>
                            {dock.name}
                          </Typography>
                          {dock.description && (
                            <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                              {dock.description}
                            </Typography>
                          )}
                          <Typography variant="body2" sx={{ color: '#fff', mb: 0.5 }}>
                            Total Devices: {stats.totalCount}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#4ade80', mb: 0.5 }}>
                            Active: {stats.activeCount}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#ef4444', mb: 0.5 }}>
                            Inactive: {inactiveCount}
                          </Typography>
                          {/* <Typography
                            variant="body2"
                            sx={{
                              color:
                                locationPingStatus[dock.id] === 'down'
                                  ? '#ff6b6b'
                                  : locationPingStatus[dock.id] === 'up'
                                  ? '#4ade80'
                                  : '#aaa',
                              fontWeight: 'bold',
                              mt: 0.5,
                            }}
                          >
                            Ping:{' '}
                            {locationPingStatus[dock.id] === 'down'
                              ? '🔴 Device(s) Down'
                              : locationPingStatus[dock.id] === 'up'
                              ? '🟢 All Devices Up'
                              : locationPingStatus[dock.id] === 'loading'
                              ? '⏳ Checking...'
                              : '⚪ No Data'}
                          </Typography> */}
                        </Box>
                      }
                      arrow
                      placement="top"
                    >
                      <Fab
                        size="small"
                        onClick={() => handleDockClick(dock)}
                        onMouseEnter={() => setHoveredDock(dock.id)}
                        onMouseLeave={() => setHoveredDock(null)}
                        sx={{
                          color: '#fff',
                          backgroundColor: getDockPingColor(dock.id, isSelected, isHovered),
                          transform: isSelected
                            ? 'scale(1.4)'
                            : isHovered
                              ? 'scale(1.2)'
                              : 'scale(1)',
                          boxShadow: isHovered
                            ? '0 0 12px 14px rgba(25, 118, 210, 0.4)'
                            : isSelected
                              ? '0 4px 16px rgba(0,0,0,0.4)'
                              : locationPingStatus[dock.id] === 'down'
                                ? '0 0 8px 4px rgba(244, 67, 54, 0.5)'
                                : '0 2px 8px rgba(0,0,0,0.3)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '@keyframes pulseRed': {
                            '0%': {
                              boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.7)',
                            },
                            '70%': {
                              boxShadow: '0 0 0 10px rgba(244, 67, 54, 0)',
                            },
                            '100%': {
                              boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)',
                            },
                          },
                          '@keyframes pulseGreen': {
                            '0%': {
                              boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
                            },
                            '70%': {
                              boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)',
                            },
                            '100%': {
                              boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
                            },
                          },
                          animation: getDockAnimation(dock.id, isSelected, isHovered),
                          '&:hover': {
                            backgroundColor: '#1565c0',
                          },
                        }}
                      >
                        <LocationOn />
                      </Fab>
                    </Tooltip>
                  </Box>
                );
              })}
            </>
          )}

          {/* Switch Markers */}
          {showSwitches && (
            <>
              {dockswitches.map((switchItem) => {
                const isHovered = hoveredSwitch === switchItem.id;

                return (
                  <Tooltip
                    key={switchItem.id}
                    title={
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {switchItem.name}
                        </Typography>
                      </Box>
                    }
                    arrow
                    placement="top"
                  >
                    <Fab
                      size="small"
                      onClick={() => console.log('Switch clicked:', switchItem.name)}
                      onMouseEnter={() => setHoveredSwitch(switchItem.id)}
                      onMouseLeave={() => setHoveredSwitch(null)}
                      sx={{
                        color: '#fff',
                        backgroundColor: isHovered ? '#f44336' : '#4caf50',
                        position: 'absolute',
                        left: switchItem.x,
                        top: switchItem.y,
                        transform: isHovered
                          ? 'translate(-50%, -50%) scale(1.4)'
                          : 'translate(-50%, -50%) scale(1)',
                        zIndex: 15,
                        boxShadow: isHovered
                          ? '0 0 12px 14px rgba(244, 67, 54, 0.6)'
                          : '0 2px 8px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translate(-50%, -50%) scale(1.4)',
                          backgroundColor: '#f44336',
                          boxShadow: '0 0 12px 14px rgba(244, 67, 54, 0.6)',
                        },
                      }}
                    >
                      <Storage />
                    </Fab>
                  </Tooltip>
                );
              })}
            </>
          )}

          {/* Printer Markers */}
          {showPrinters && (
            <>
              {printers.map((printer) => {
                const isHovered = hoveredPrinter === printer.id;

                return (
                  <Tooltip
                    key={printer.id}
                    title={
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {printer.name}
                        </Typography>
                        {printer.description && (
                          <Typography variant="body2">{printer.description}</Typography>
                        )}
                      </Box>
                    }
                    arrow
                    placement="top"
                  >
                    <Fab
                      size="small"
                      onClick={() => console.log('Printer clicked:', printer.name)}
                      onMouseEnter={() => setHoveredPrinter(printer.id)}
                      onMouseLeave={() => setHoveredPrinter(null)}
                      sx={{
                        color: '#fff',
                        backgroundColor: isHovered ? '#f44336' : '#1976d2',
                        position: 'absolute',
                        left: printer.x,
                        top: printer.y,
                        transform: isHovered
                          ? 'translate(-50%, -50%) scale(1.4)'
                          : 'translate(-50%, -50%) scale(1)',
                        zIndex: 15,
                        boxShadow: isHovered
                          ? '0 0 12px 14px rgba(244, 67, 54, 0.6)'
                          : '0 2px 8px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translate(-50%, -50%) scale(1.4)',
                          backgroundColor: '#f44336',
                          boxShadow: '0 0 12px 14px rgba(244, 67, 54, 0.6)',
                        },
                      }}
                    >
                      <Print />
                    </Fab>
                  </Tooltip>
                );
              })}
            </>
          )}

          {/* UPS Markers */}
          {showUps && (
            <>
              {ups.map((upsItem) => {
                const isHovered = hoveredUps === upsItem.id;

                return (
                  <Tooltip
                    key={upsItem.id}
                    title={
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {upsItem.name}
                        </Typography>
                        {upsItem.description && (
                          <Typography variant="body2">{upsItem.description}</Typography>
                        )}
                      </Box>
                    }
                    arrow
                    placement="top"
                  >
                    <Fab
                      size="small"
                      onClick={() => console.log('UPS clicked:', upsItem.name)}
                      onMouseEnter={() => setHoveredUps(upsItem.id)}
                      onMouseLeave={() => setHoveredUps(null)}
                      sx={{
                        color: '#fff',
                        backgroundColor: isHovered ? '#f0857d' : '#f09245',
                        position: 'absolute',
                        left: upsItem.x,
                        top: upsItem.y,
                        transform: isHovered
                          ? 'translate(-50%, -50%) scale(1.4)'
                          : 'translate(-50%, -50%) scale(1)',
                        zIndex: 15,
                        boxShadow: isHovered
                          ? '0 0 12px 14px rgba(244, 67, 54, 0.6)'
                          : '0 2px 8px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translate(-50%, -50%) scale(1.4)',
                          backgroundColor: '#f44336',
                          boxShadow: '0 0 12px 14px rgba(244, 67, 54, 0.6)',
                        },
                      }}
                    >
                      {/* <BatteryChargingFull /> */}
                      <img
                        src={UpsIcon}
                        alt="UPS"
                        style={{
                          width: 20,
                          height: 20,
                          filter: showUps ? 'none' : 'grayscale(100%)'
                        }}
                      />
                    </Fab>
                  </Tooltip>
                );
              })}
            </>
          )}

          {/* Server Room Marker (always shown) */}
          {staticServers.map((server) => (
            <Tooltip key={server.id} title={server.name} arrow placement="top">
              <Fab
                size="small"
                onClick={() => console.log('Server clicked:', server.name)}
                sx={{
                  color: '#fff',
                  backgroundColor: '#4caf50',
                  position: 'absolute',
                  left: server.left,
                  top: server.top,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 25,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translate(-50%, -50%) scale(1.2)',
                    boxShadow: '0 0 12px rgba(0,0,0,0.5)',
                  },
                }}
              >
                <img
                  src={Serverroom}
                  alt="Server Room"
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
              </Fab>
            </Tooltip>
          ))}

          {/* Selected item info */}
          {(selectedDock && !showSwitches && !showPrinters && !showUps) && (
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                maxWidth: 240,
                zIndex: 30,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#1976d2' }}>
                {selectedDock.name}
              </Typography>
            </Box>
          )}

          {/* Connection Line - DTS to Server Room */}
          {!showSwitches && !showPrinters && !showUps && (() => {
            const dtsDock = docks.find((d) => d.id === 'DTS');
            const mainServer = staticServers.find((s) => s.id === 'server1');

            if (!dtsDock || !mainServer) return null;

            // Convert percentage strings to numbers for calculation
            const parsePercentage = (str) => parseFloat(str) / 100;

            const x1 = parsePercentage(dtsDock.x);
            const y1 = parsePercentage(dtsDock.y);
            const x2 = parsePercentage(mainServer.left);
            const y2 = parsePercentage(mainServer.top);

            return (
              <svg
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  zIndex: 22,
                }}
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="5"
                    orient="auto"
                  >
                    <path d="M2,2 L8,5 L2,8 Z" fill="#1976d2" />
                  </marker>
                </defs>

                {/* Glow effect line */}
                <line
                  x1={`${x1 * 100}%`}
                  y1={`${y1 * 100}%`}
                  x2={`${x2 * 100}%`}
                  y2={`${y2 * 100}%`}
                  stroke="#2196f3"
                  strokeWidth="4"
                  strokeDasharray="8,8"
                  filter="url(#glow)"
                  opacity="0.6"
                />

                {/* Main dotted line */}
                <line
                  x1={`${x1 * 100}%`}
                  y1={`${y1 * 100}%`}
                  x2={`${x2 * 100}%`}
                  y2={`${y2 * 100}%`}
                  stroke="#1976d2"
                  strokeWidth="2.5"
                  strokeDasharray="6,6"
                  markerEnd="url(#arrowhead)"
                />

                {/* Animated dashed line */}
                <line
                  x1={`${x1 * 100}%`}
                  y1={`${y1 * 100}%`}
                  x2={`${x2 * 100}%`}
                  y2={`${y2 * 100}%`}
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="4,12"
                  opacity="0.5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;16"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
              </svg>
            );
          })()}
        </Box>

        {/* Network Diagram Dialog */}
        <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)} maxWidth="lg" fullWidth>
          <DialogContent sx={{ p: 0 }}>
            <ZoomableImage
              src={openImage === 'LAN_REVISED' ? LAN_REVISED : Network_Switch_Map}
              alt="Zoomed Map"
            />
          </DialogContent>
        </Dialog>
      </Box>
    );
  };

  const renderFloorsView = () => {
    const buildingSectors = allSectorsData.filter((sector) => sector.Build_Code === selectedDock?.id);
    const floorMap = buildingSectors.reduce((acc, sector) => {
      const key = sector.Flo_No;

      if (!acc[key]) {
        acc[key] = {
          Flo_Code: sector.Flo_Code,
          Flo_No: sector.Flo_No,
          Build_Code: sector.Build_Code,
          DisplayName: sector.Flo_Code === '0' ? 'Ground Floor' : `${sector.Flo_Code} Floor`,
          ComputerCount: 0,
          ActiveCount: 0,
          DownCount: 0,
          sectors: [],
        };
      }

      acc[key].ComputerCount += Number(sector.ComputerCount || 0);
      acc[key].ActiveCount += Number(sector.ActiveCount !== undefined ? sector.ActiveCount : (sector.ComputerCount || 0));
      acc[key].DownCount += Number(sector.DownCount || 0); // genuinely offline only
      acc[key].sectors.push(sector);

      return acc;
    }, {});

    const formattedFloors = Object.values(floorMap).sort(
      (a, b) => Number(a.Flo_Code) - Number(b.Flo_Code),
    );

    return (
      <Box
        sx={{
          minHeight: '100vh',
          p: 4,
          background: 'linear-gradient(to bottom right, #1e293b, #1e40af)',
        }}
      >
        <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 6,
              flexShrink: 0,
            }}
          >
            <IconButton
              onClick={handleBack}
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
              }}
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
                Floor Selection
              </Typography>
            </Box>
          </Box>

          {/* Floor Cards */}
          <Grid container spacing={3}>
            {formattedFloors.map((floor) => {
              const activeCount = floor.ActiveCount;
              const totalCount = floor.ComputerCount;
              const inactiveCount = Number(floor.DownCount || 0); // genuinely offline only (excludes shutdown & untracked)

              return (
                <Grid item xs={12} sm={6} md={3} key={floor.Flo_No}>
                  <Card
                    onClick={() => handleFloorClick(floor)}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      background: inactiveCount > 0 ? 'rgba(244, 67, 54, 0.08)' : 'rgba(255,255,255,0.05)',
                      border: inactiveCount > 0 ? '1px solid rgba(244, 67, 54, 0.4)' : '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: inactiveCount > 0 ? '0 0 12px rgba(244, 67, 54, 0.4)' : 6,
                        background: inactiveCount > 0 ? 'rgba(244, 67, 54, 0.12)' : 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          position: 'relative',
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            background: inactiveCount > 0 ? 'linear-gradient(to right, #ef4444, #f44336)' : 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                            borderRadius: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Building color="white" size={32} />
                        </Box>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -10,
                            right: -10,
                            width: 40,
                            height: 40,
                            background: inactiveCount > 0 ? 'linear-gradient(to right, #ef4444, #f44336)' : 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                            color: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                          }}
                        >
                          {(floor.Flo_Code === '0' || isNaN(floor.Flo_Code)) ? 'G' : floor.Flo_Code}
                        </Box>
                      </Box>

                      <Typography variant="h6" align="center" color="white" gutterBottom>
                        {(floor.DisplayName === '0' || /^[A-Za-z]/.test(floor.DisplayName)) ? 'Ground Floor' : floor.DisplayName}
                      </Typography>

                      {/* Counts */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Monitor size={16} color="#93c5fd" />
                          <Typography variant="body2" color="white">
                            Total PCs
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="white">
                          {totalCount}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Wifi size={16} color="#4ade80" />
                          <Typography variant="body2" color="#4ade80">
                            Active
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="#4ade80">
                          {activeCount}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <WifiOff size={16} color="#ef4444" />
                          <Typography variant="body2" color="#ef4444">
                            Inactive
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="#ef4444">
                          {inactiveCount}
                        </Typography>
                      </Box>

                      {/* Progress Bar */}
                      <Box
                        sx={{
                          mt: 2,
                          width: '100%',
                          height: 8,
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          borderRadius: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: totalCount > 0 ? `${(activeCount / totalCount) * 100}%` : '0%',
                            height: '100%',
                            background: 'linear-gradient(to right, #4ade80, #3b82f6)',
                            borderRadius: 4,
                            transition: 'width 0.3s',
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    );
  };

  const renderSectorsView = () => {
    const filteredSectors = allSectorsData.filter(
      (sector) =>
        sector.Build_Code === selectedDock?.id &&
        sector.Flo_No.toString() === selectedFloor?.Flo_No.toString()
    );

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 6,
              flexShrink: 0,
            }}
          >
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
                Sector Selection
              </Typography>
            </Box>
          </Box>

          {/* Sector Cards */}
          <Grid container spacing={2}>
            {filteredSectors.map((sector) => {
              const totalCount = Number(sector.ComputerCount || 0);
              const activeCount = Number(sector.ActiveCount !== undefined ? sector.ActiveCount : (sector.ComputerCount || 0));
              const inactiveCount = Number(sector.DownCount || 0); // genuinely offline only (excludes shutdown & untracked)

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={`${sector.Flo_No}-${sector.Cat_CodeB}`}>
                  <Card
                    onClick={() => handleSectorClick(sector)}
                    sx={{
                      height: '100%',
                      borderRadius: 2,
                      p: 1.5,
                      cursor: 'pointer',
                      background: inactiveCount > 0 ? 'rgba(244, 67, 54, 0.08)' : 'rgba(255,255,255,0.05)',
                      border: inactiveCount > 0 ? '1px solid rgba(244, 67, 54, 0.4)' : '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: inactiveCount > 0 ? '0 0 12px rgba(244, 67, 54, 0.4)' : 6,
                        background: inactiveCount > 0 ? 'rgba(244, 67, 54, 0.12)' : 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0, width: '100%' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mb: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            background: inactiveCount > 0 ? 'linear-gradient(to right, #ef4444, #f44336)' : 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                            borderRadius: 1.5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img src={SectorIcon} alt="Sector" width={28} height={28} />
                        </Box>
                      </Box>

                      <Typography variant="subtitle1" align="center" color="white" fontWeight="bold" gutterBottom sx={{ mb: 1.5, fontSize: '0.95rem' }}>
                        {sector.Flo_Name}
                      </Typography>

                      {/* Counts */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Monitor size={14} color="#93c5fd" />
                          <Typography variant="body2" color="white" sx={{ fontSize: '0.8rem' }}>
                            Total PCs
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="white" sx={{ fontSize: '0.8rem' }}>
                          {totalCount}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Wifi size={14} color="#4ade80" />
                          <Typography variant="body2" color="#4ade80" sx={{ fontSize: '0.8rem' }}>
                            Active
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="#4ade80" sx={{ fontSize: '0.8rem' }}>
                          {activeCount}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <WifiOff size={14} color="#ef4444" />
                          <Typography variant="body2" color="#ef4444" sx={{ fontSize: '0.8rem' }}>
                            Inactive
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="#ef4444" sx={{ fontSize: '0.8rem' }}>
                          {inactiveCount}
                        </Typography>
                      </Box>

                      {/* Progress Bar */}
                      <Box
                        sx={{
                          mt: 1.5,
                          width: '100%',
                          height: 5,
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          borderRadius: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: totalCount > 0 ? `${(activeCount / totalCount) * 100}%` : '0%',
                            height: '100%',
                            background: 'linear-gradient(to right, #4ade80, #3b82f6)',
                            borderRadius: 4,
                            transition: 'width 0.3s',
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {currentView === 'port' && renderPortView()}
      {currentView === 'floors' && renderFloorsView()}
      {currentView === 'sectors' && renderSectorsView()}
      {currentView === 'network' && (
        <NetworkView
          handlePCClick={handlePCClick}
          handleBack={handleBack}
          selectedDock={selectedDock}
          selectedFloor={selectedFloor}
          selectedSector={selectedSector}
          devices={devices}
          Flo_No={selectedSector?.Flo_No}
          Cat_CodeB={selectedSector?.Cat_CodeB}
          highlightedDeviceName={highlightedDeviceName}
          setHighlightedDeviceName={setHighlightedDeviceName}
        />
      )}

      {/* PC Details Dialog */}
      <Dialog open={pcDetailsOpen} onClose={() => setPcDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Computer color="primary" />
            PC Details - {selectedPC?.id}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedPC && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Device Type
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPC.type}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Assigned User
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPC.user}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  IP Address
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPC.ip}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Operating System
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPC.os}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Specifications
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedPC.specs}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedPC.status}
                  color={
                    selectedPC.status === 'Online' || selectedPC.status === 'Operational'
                      ? 'success'
                      : 'error'
                  }
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Update
                </Typography>
                <Typography variant="body2">{selectedPC.lastUpdate}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPcDetailsOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PortNavigationApp;