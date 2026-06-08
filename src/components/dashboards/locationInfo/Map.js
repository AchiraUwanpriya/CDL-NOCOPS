// import { Box, Grid, List } from '@mui/material';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { GetMapData } from '../../../store/slices/common/locationInfo/LocationInfoSlices';
// import Scrollbar from '../../theme/custom-scroll/Scrollbar';
// import DashboardCard from '../../theme/shared/DashboardCard';
// import './MapStyle.css';
// import Spinner from '../../../components/app/spinner/Spinner';

// const containerStyle = {
//   height: '75vh',
//   width: '100%',
// };

// const locationTypeIcons = {
//   city: {
//     red: require('../../../assets/locationType/CityRed.png'), // Red icon for city
//     green: require('../../../assets/locationType/CityGreen.png'), // Green icon for city
//   },
//   airport: {
//     red: require('../../../assets/locationType/AirPortRed.png'), // Red icon for airport
//     green: require('../../../assets/locationType/AirPortGreen.png'), // Green icon for airport
//   },
//   harbour: {
//     red: require('../../../assets/locationType/HarbourRed.png'), // Red icon for harbour
//     green: require('../../../assets/locationType/HarbourGreen.png'), // Green icon for harbour
//   },
// };
// const center = {
//   lat: 7.9331,
//   lng: 80.7718,
// };

// const mapStyles = [
//   {
//     stylers: [
//       {
//         hue: '#baf4c4',
//       },
//       {
//         saturation: 10,
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     stylers: [
//       {
//         color: '#effefd',
//       },
//     ],
//   },
//   {
//     featureType: 'all',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },

//   {
//     featureType: 'road',
//     elementType: 'all',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'all',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'landscape',
//     elementType: 'all',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'landscape',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels',
//     stylers: [
//       {
//         visibility: 'off',
//       },
//     ],
//   },
// ];

// const defaultProps = {
//   center: {
//     lat: 7.9331,
//     lng: 80.7718,
//   },
//   disableDefaultUI: false,
//   zoom: 8,
// };

// function MapView() {
//   const dispatch = useDispatch();
//   const { mapData,loading } = useSelector((state) => state.LocationInfoSlices);

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyC8OTQD0BWExwMt04-goV9c5hV9cfer6DM',
//   });

//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const mapRef = useRef(null);

//   const onLoad = useCallback((map) => {
//     mapRef.current = map;
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);
//   }, []);

//   const onUnmount = useCallback(() => {
//     mapRef.current = null;
//   }, []);

//   const handleCardClick = (location) => {
//     setSelectedLocation(location);
//     if (mapRef.current) {
//       mapRef.current.panTo({
//         lat: parseFloat(location.latitude),
//         lng: parseFloat(location.longtitude),
//       });
//       mapRef.current.setZoom(8);
//     }
//   };

//   const handleMarkerClick = (location) => {
//     setSelectedLocation(location);
//     if (mapRef.current) {
//       mapRef.current.panTo({
//         lat: parseFloat(location.latitude),
//         lng: parseFloat(location.longtitude),
//       });
//       mapRef.current.setZoom(8);
//     }
//   };

//   useEffect(() => {
//     dispatch(GetMapData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (selectedLocation) {
//       document
//         .getElementById(`location-${selectedLocation.id}`)
//         .scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [selectedLocation]);

//   return loading ? (
//     <Box>
//       <Grid container spacing={1}>
//         <Grid item xs={12} sm={12} lg={3}>
//           <DashboardCard title="Locations">
//             <TransitionGroup>
//               <List sx={{ px: 0 }}>
//                 <Scrollbar
//                   sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '667px' }}
//                 >
//                   {mapData.map((location) => (
//                     <CSSTransition key={location.id} timeout={3000} classNames="fade">
//                       <div
//                         id={`location-${location.id}`}
//                         onClick={() => handleCardClick(location)}
//                         style={{
//                           padding: '10px',
//                           margin: '10px 0',
//                           cursor: 'pointer',
//                           backgroundColor:
//                             selectedLocation?.id === location.id ? '#f0f0f0' : '#fff',
//                           border: '1px solid #ccc',
//                           borderRadius: '4px',
//                           transition: 'background-color 0.3s',
//                         }}
//                       >
//                         {location.location}
//                       </div>
//                     </CSSTransition>
//                   ))}
//                 </Scrollbar>
//               </List>
//             </TransitionGroup>
//           </DashboardCard>
//         </Grid>
//         <Grid item xs={12} sm={12} lg={9}>
//           <DashboardCard title="Map View">
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               defaultCenter={defaultProps.center}
//               defaultZoom={defaultProps.zoom}
//               center={
//                 selectedLocation
//                   ? {
//                       lat: parseFloat(selectedLocation.latitude),
//                       lng: parseFloat(selectedLocation.longtitude),
//                     }
//                   : center
//               }
//               zoom={8}
//               options={{
//                 zoomControl: true,
//                 maxZoom: 8,
//                 minZoom: 7.7,
//                 styles: mapStyles, // Add custom styles here
//               }}
//               onLoad={onLoad}
//               onUnmount={onUnmount}
//             >
//               {mapData.map((location) => {
//                 // Determine the icon URL based on the locationType and updownStatus
//                 const iconType = locationTypeIcons[location.locationType] || locationTypeIcons.city;
//                 const iconColor = location.updownStatus === 0 ? 'red' : 'green';
//                 return (
//                   <Marker
//                     key={location.id}
//                     position={{
//                       lat: parseFloat(location.latitude),
//                       lng: parseFloat(location.longtitude),
//                     }}
//                     onClick={() => handleMarkerClick(location)}
//                     icon={{
//                       url: iconType[iconColor], // Choose the icon based on status
//                       scaledSize: new window.google.maps.Size(32, 32), // Adjust size as needed
//                     }}
//                   />
//                 );
//               })}
//             </GoogleMap>
//           </DashboardCard>
//         </Grid>
//       </Grid>
//     </Box>
//   ) : (
//     <Spinner />
//   );
// }

// export default React.memo(MapView);


// import React, { useState } from 'react';

// // Mock data for locations (based on your image)
// const locations = [
//   { id: 1, name: 'Kurunegala Regional Branch', x: '15%', y: '25%' },
//   { id: 2, name: 'MRIA', x: '25%', y: '35%' },
//   { id: 3, name: 'BIA', x: '30%', y: '40%' },
//   { id: 4, name: 'Colombo Harbour', x: '20%', y: '72%' },
//   { id: 5, name: 'Mullaitivu International Airport', x: '85%', y: '18%' },
//   { id: 6, name: 'Immigration Office Galle', x: '25%', y: '85%' },
//   { id: 7, name: 'Immigration Office Kandy', x: '55%', y: '50%' },
//   { id: 8, name: 'Regional Office Matara', x: '30%', y: '90%' },
//   { id: 9, name: 'RIA', x: '75%', y: '45%' },
//   { id: 10, name: 'JIA', x: '70%', y: '55%' },
//   { id: 11, name: 'Hambanthota Harbor', x: '75%', y: '85%' },
//   { id: 12, name: 'Galle Harbor', x: '25%', y: '82%' }
// ];

// function MapView() {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const handleLocationClick = (location) => {
//     setSelectedLocation(location);
//   };

//   const sidebarStyle = {
//     width: '320px',
//     height: '100vh',
//     backgroundColor: 'white',
//     borderRight: '1px solid #e0e0e0',
//     overflow: 'auto',
//     boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
//   };

//   const headerStyle = {
//     padding: '16px 20px',
//     borderBottom: '1px solid #e0e0e0',
//     backgroundColor: '#fafafa',
//   };

//   const listStyle = {
//     margin: 0,
//     padding: 0,
//     listStyle: 'none',
//   };

//   const listItemStyle = (isSelected) => ({
//     padding: '12px 20px',
//     borderBottom: '1px solid #f0f0f0',
//     cursor: 'pointer',
//     backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
//     transition: 'background-color 0.2s ease',
//   });

//   const mapContainerStyle = {
//     flex: 1,
//     position: 'relative',
//     backgroundColor: '#e8f4f8',
//     overflow: 'hidden',
//   };

//   const mapHeaderStyle = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     padding: '16px 24px',
//     zIndex: 10,
//     borderBottom: '1px solid #e0e0e0',
//     backdropFilter: 'blur(10px)',
//   };

//   const markerStyle = (isSelected) => ({
//     position: 'absolute',
//     width: '36px',
//     height: '36px',
//     backgroundColor: isSelected ? '#ff4444' : '#1976d2',
//     border: '2px solid white',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: 'white',
//     fontSize: '18px',
//     cursor: 'pointer',
//     transform: 'translate(-50%, -50%)',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
//     transition: 'all 0.3s ease',
//     zIndex: 20,
//   });

//   const infoPanelStyle = {
//     position: 'absolute',
//     bottom: '20px',
//     left: '20px',
//     right: '20px',
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
//     backdropFilter: 'blur(10px)',
//     zIndex: 30,
//   };

//   return (
//     <div style={{ display: 'flex', width: '100%', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
//       {/* Locations Sidebar */}
//       <div style={sidebarStyle}>
//         <div style={headerStyle}>
//           <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
//             Locations
//           </h3>
//         </div>
        
//         <ul style={listStyle}>
//           {locations.map((location) => (
//             <li
//               key={location.id}
//               style={{
//                 ...listItemStyle(selectedLocation?.id === location.id),
//                 ...(selectedLocation?.id !== location.id && {
//                   ':hover': { backgroundColor: '#f8f9fa' }
//                 })
//               }}
//               onClick={() => handleLocationClick(location)}
//               onMouseEnter={(e) => {
//                 if (selectedLocation?.id !== location.id) {
//                   e.target.style.backgroundColor = '#f8f9fa';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (selectedLocation?.id !== location.id) {
//                   e.target.style.backgroundColor = 'transparent';
//                 }
//               }}
//             >
//               <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.4' }}>
//                 {location.name}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Map View */}
//       <div style={mapContainerStyle}>
//         {/* Map Header */}
//         <div style={mapHeaderStyle}>
//           <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
//             Map View
//           </h3>
//         </div>

//         {/* Mock Sri Lanka Map Background */}
//         <div
//           style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '70%',
//             height: '75%',
//             backgroundColor: '#4a7c59',
//             borderRadius: '20px 20px 80px 20px',
//             opacity: 0.8,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
//           }}
//         />

//         {/* Water areas */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%)',
//             opacity: 0.3,
//           }}
//         />

//         {/* Location Markers */}
//         {locations.map((location) => (
//           <div
//             key={location.id}
//             style={{
//               ...markerStyle(selectedLocation?.id === location.id),
//               left: location.x,
//               top: location.y,
//             }}
//             onClick={() => handleLocationClick(location)}
//             onMouseEnter={(e) => {
//               e.target.style.transform = 'translate(-50%, -50%) scale(1.3)';
//               e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = 'translate(-50%, -50%) scale(1)';
//               e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
//             }}
//           >
//             📍
//           </div>
//         ))}

//         {/* Selected Location Info Panel */}
//         {selectedLocation && (
//           <div style={infoPanelStyle}>
//             <h4 style={{ 
//               margin: '0 0 8px 0', 
//               fontSize: '16px', 
//               fontWeight: 'bold', 
//               color: '#1976d2' 
//             }}>
//               {selectedLocation.name}
//             </h4>
//             <p style={{ 
//               margin: 0, 
//               fontSize: '14px', 
//               color: '#666',
//               lineHeight: '1.5' 
//             }}>
//               Click on location markers or select from the sidebar to view details.
//             </p>
//           </div>
//         )}

//         {/* Development watermark overlay */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.05) 100px, rgba(255,255,255,0.05) 200px)',
//             pointerEvents: 'none',
//             zIndex: 5,
//           }}
//         />
        
//         {/* Watermark text */}
//         <div
//           style={{
//             position: 'absolute',
//             top: '20%',
//             left: '10%',
//             color: 'rgba(255,255,255,0.4)',
//             fontSize: '16px',
//             fontWeight: 'bold',
//             transform: 'rotate(-15deg)',
//             pointerEvents: 'none',
//             zIndex: 15,
//             userSelect: 'none',
//           }}
//         >
//           For development purposes only
//         </div>

//         <div
//           style={{
//             position: 'absolute',
//             top: '40%',
//             right: '15%',
//             color: 'rgba(255,255,255,0.4)',
//             fontSize: '16px',
//             fontWeight: 'bold',
//             transform: 'rotate(-15deg)',
//             pointerEvents: 'none',
//             zIndex: 15,
//             userSelect: 'none',
//           }}
//         >
//           For development purposes only
//         </div>

//         <div
//           style={{
//             position: 'absolute',
//             bottom: '30%',
//             left: '20%',
//             color: 'rgba(255,255,255,0.4)',
//             fontSize: '16px',
//             fontWeight: 'bold',
//             transform: 'rotate(-15deg)',
//             pointerEvents: 'none',
//             zIndex: 15,
//             userSelect: 'none',
//           }}
//         >
//           For development purposes only
//         </div>

//         {/* Google attribution (like in your image) */}
//         <div
//           style={{
//             position: 'absolute',
//             bottom: '10px',
//             left: '20px',
//             fontSize: '12px',
//             color: '#666',
//             backgroundColor: 'rgba(255,255,255,0.8)',
//             padding: '4px 8px',
//             borderRadius: '4px',
//             zIndex: 25,
//           }}
//         >
//           Google
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(MapView);



















//////network 


//  const renderNetworkView = () => {
//   const networkDevices = [
//     {
//       id: 'D-75',
//       name: 'IT Admin Workstation',
//       type: 'Desktop',
//       status: 'Online',
//       ip: '192.168.1.75',
//       user: 'IT Admin',
//       icon: Computer,
//       color: '#3b82f6',
//       position: { top: '25%', left: '10%' },
//       specs: 'Intel i7, 16GB RAM, 512GB SSD'
//     },
//     {
//       id: 'D-76',
//       name: 'Network Admin Station', 
//       type: 'Desktop',
//       status: 'Online',
//       ip: '192.168.1.76',
//       user: 'Network Admin',
//       icon: Computer,
//       color: '#3b82f6',
//       position: { top: '15%', left: '25%' },
//       specs: 'Intel i5, 8GB RAM, 256GB SSD'
//     },
//     {
//       id: 'DMD-ITO005',
//       name: 'IT Officer Laptop',
//       type: 'Laptop',
//       status: 'Online',
//       ip: '192.168.1.105',
//       user: 'IT Officer',
//       icon: Computer,
//       color: '#10b981',
//       position: { top: '25%', left: '17.5%' },
//       specs: 'Intel i7, 16GB RAM, 1TB SSD'
//     },
//     {
//       id: 'D-057',
//       name: 'System Admin Server',
//       type: 'Desktop',
//       status: 'Online',
//       ip: '192.168.1.57',
//       user: 'System Admin',
//       icon: Computer,
//       color: '#f59e0b',
//       position: { top: '35%', left: '30%' },
//       specs: 'Intel Xeon, 32GB RAM, 2TB HDD'
//     },
//     {
//       id: 'SWITCH-01',
//       name: '4th Floor Switch',
//       type: 'Network Switch',
//       status: 'Active',
//       ip: '192.168.1.1',
//       user: 'Network Infrastructure',
//       icon: Router,
//       color: '#8b5cf6',
//       position: { top: '60%', left: '22%' },
//       specs: '24-Port Gigabit Switch'
//     },
//     {
//       id: 'SERVER-ROOM',
//       name: 'Main Server Rack',
//       type: 'Server Infrastructure',
//       status: 'Operational',
//       ip: '192.168.1.10-20',
//       user: 'System Infrastructure',
//       icon: Storage,
//       color: '#ef4444',
//       position: { top: '50%', left: '45%' },
//       specs: 'Multiple Servers, RAID Storage'
//     },
//     {
//       id: 'PRINTER-01',
//       name: 'Toshiba e-studio',
//       type: 'Multifunction Printer',
//       status: 'Ready',
//       ip: '192.168.1.200',
//       user: 'Office Staff',
//       icon: Print,
//       color: '#6b7280',
//       position: { top: '70%', left: '65%' },
//       specs: 'Color Laser, A3 Support'
//     },
//     {
//       id: 'PRINTER-02',
//       name: 'Canon ImageRUNNER',
//       type: 'Document Printer',
//       status: 'Ready',
//       ip: '192.168.1.201',
//       user: 'Office Staff',
//       icon: Print,
//       color: '#6b7280',
//       position: { top: '80%', left: '75%' },
//       specs: 'Monochrome Laser, High Volume'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'online':
//       case 'operational':
//       case 'active':
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

//   const NetworkDeviceNode = ({ device }) => (
//     <Box
//       onClick={() => handlePCClick(device.id)}
//       sx={{
//         position: 'absolute',
//         top: device.position.top,
//         left: device.position.left,
//         transform: 'translate(-50%, -50%)',
//         cursor: 'pointer',
//         transition: 'all 0.3s ease',
//         '&:hover': {
//           transform: 'translate(-50%, -50%) scale(1.1)',
//           zIndex: 1000
//         }
//       }}
//     >
//       <Box
//         sx={{
//           background: 'rgba(255,255,255,0.05)',
//           border: '1px solid rgba(255,255,255,0.2)',
//           borderRadius: 2,
//           p: 1.5,
//           minWidth: 120,
//           textAlign: 'center',
//           backdropFilter: 'blur(10px)',
//           boxShadow: `0 4px 20px ${device.color}33`,
//           '&:hover': {
//             background: 'rgba(255,255,255,0.1)',
//             borderColor: device.color,
//             boxShadow: `0 8px 32px ${device.color}55`
//           }
//         }}
//       >
//         {/* Device Icon with Status Indicator */}
//         <Box sx={{ position: 'relative', display: 'inline-block', mb: 1 }}>
//           <Box
//             sx={{
//               width: 48,
//               height: 48,
//               background: `linear-gradient(135deg, ${device.color}, ${device.color}aa)`,
//               borderRadius: 2,
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               mx: 'auto'
//             }}
//           >
//             <device.icon sx={{ color: 'white', fontSize: '24px' }} />
//           </Box>
//           <Box
//             sx={{
//               position: 'absolute',
//               top: -4,
//               right: -4,
//               width: 16,
//               height: 16,
//               background: getStatusColor(device.status),
//               borderRadius: '50%',
//               border: '2px solid white',
//               boxShadow: 2
//             }}
//           />
//         </Box>

//         {/* Device Name */}
//         <Typography variant="caption" color="white" display="block" fontWeight="bold" sx={{ mb: 0.5 }}>
//           {device.id}
//         </Typography>
//         <Typography variant="caption" color="primary.light" display="block" sx={{ fontSize: '0.7rem', mb: 1 }}>
//           {device.type}
//         </Typography>
        
//         {/* Status Chip */}
//         <Chip 
//           label={device.status} 
//           size="small"
//           sx={{ 
//             bgcolor: `${getStatusColor(device.status)}22`,
//             color: getStatusColor(device.status),
//             height: 18,
//             fontSize: '0.65rem',
//             '& .MuiChip-label': { px: 0.5 }
//           }} 
//         />
//       </Box>
//     </Box>
//   );

//   return (
//     <Box sx={{ minHeight: '100vh', p: 4, background: 'linear-gradient(to bottom right, #1e293b, #1e40af)' }}>
//       <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
//         {/* Header with Back Button */}
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//           <IconButton 
//             onClick={handleBack} 
//             sx={{ 
//               mr: 2, 
//               bgcolor: 'rgba(255,255,255,0.1)', 
//               color: 'white',
//               '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
//             }}
//           >
//             <ArrowBack />
//           </IconButton>
//           <Box sx={{ textAlign: 'left', flex: 1 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//               <Router sx={{ fontSize: '32px', color: '#60a5fa' }} />
//               <Typography variant="h4" color="white" fontWeight="bold">
//                 {selectedDock?.name} - {selectedFloor?.name}
//               </Typography>
//             </Box>
//             <Typography variant="h6" color="primary.light">
//               Network Infrastructure & Connected Devices
//             </Typography>
//           </Box>
//         </Box>

//         {/* Network Status Summary */}
//         <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//           <Box sx={{ 
//             bgcolor: 'rgba(16, 185, 129, 0.1)', 
//             border: '1px solid rgba(16, 185, 129, 0.3)',
//             borderRadius: 2, 
//             p: 2, 
//             flex: '1 1 200px',
//             minWidth: 200
//           }}>
//             <Typography variant="h6" color="#10b981">
//               {networkDevices.filter(d => ['online', 'operational', 'active'].includes(d.status.toLowerCase())).length}
//             </Typography>
//             <Typography variant="body2" color="white">Active Devices</Typography>
//           </Box>
//           <Box sx={{ 
//             bgcolor: 'rgba(59, 130, 246, 0.1)', 
//             border: '1px solid rgba(59, 130, 246, 0.3)',
//             borderRadius: 2, 
//             p: 2, 
//             flex: '1 1 200px',
//             minWidth: 200
//           }}>
//             <Typography variant="h6" color="#3b82f6">
//               {networkDevices.filter(d => d.type.includes('Desktop') || d.type.includes('Laptop')).length}
//             </Typography>
//             <Typography variant="body2" color="white">Workstations</Typography>
//           </Box>
//           <Box sx={{ 
//             bgcolor: 'rgba(139, 92, 246, 0.1)', 
//             border: '1px solid rgba(139, 92, 246, 0.3)',
//             borderRadius: 2, 
//             p: 2, 
//             flex: '1 1 200px',
//             minWidth: 200
//           }}>
//             <Typography variant="h6" color="#8b5cf6">
//               {networkDevices.filter(d => d.type.includes('Server') || d.type.includes('Switch')).length}
//             </Typography>
//             <Typography variant="body2" color="white">Infrastructure</Typography>
//           </Box>
//         </Box>

//         {/* Network Diagram Container */}
//         <Box
//           sx={{
//             position: 'relative',
//             width: '100%',
//             height: '600px',
//             background: 'rgba(255,255,255,0.05)',
//             border: '1px solid rgba(255,255,255,0.1)',
//             borderRadius: 3,
//             backdropFilter: 'blur(10px)',
//             overflow: 'hidden'
//           }}
//         >
//           {/* Network Diagram Title */}
//           <Box sx={{ textAlign: 'center', pt: 2, pb: 1 }}>
//             <Typography variant="h6" color="white" fontWeight="bold">
//               Network Topology Diagram
//             </Typography>
//             <Typography variant="body2" color="primary.light">
//               Click on any device for detailed information
//             </Typography>
//           </Box>

//           {/* Connection Lines SVG */}
//           <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
//             <defs>
//               <filter id="glow">
//                 <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
//                 <feMerge> 
//                   <feMergeNode in="coloredBlur"/>
//                   <feMergeNode in="SourceGraphic"/>
//                 </feMerge>
//               </filter>
//             </defs>
            
//             {/* Connections from devices to switch */}
//             <line x1="10%" y1="15%" x2="22%" y2="60%" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" filter="url(#glow)" />
//             <line x1="25%" y1="15%" x2="22%" y2="60%" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" filter="url(#glow)" />
//             <line x1="17.5%" y1="25%" x2="22%" y2="60%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" filter="url(#glow)" />
//             <line x1="30%" y1="35%" x2="22%" y2="60%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" filter="url(#glow)" />
            
//             {/* Connection from switch to server */}
//             <line x1="22%" y1="60%" x2="45%" y2="50%" stroke="#8b5cf6" strokeWidth="3" filter="url(#glow)" />
            
//             {/* Connections to printers */}
//             <line x1="22%" y1="60%" x2="65%" y2="70%" stroke="#6b7280" strokeWidth="2" strokeDasharray="3,3" filter="url(#glow)" />
//             <line x1="22%" y1="60%" x2="75%" y2="80%" stroke="#6b7280" strokeWidth="2" strokeDasharray="3,3" filter="url(#glow)" />
//           </svg>

//           {/* Render Network Devices */}
//           {networkDevices.map((device) => (
//             <NetworkDeviceNode key={device.id} device={device} />
//           ))}
//         </Box>

//         {/* Network Legend */}
//         <Box sx={{ mt: 4, textAlign: 'center' }}>
//           <Typography variant="body2" color="primary.light" sx={{ mb: 2 }}>
//             Network Device Legend
//           </Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Chip icon={<Computer />} label="Workstations" size="small" sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }} />
//             <Chip icon={<Storage />} label="Servers" size="small" sx={{ bgcolor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }} />
//             <Chip icon={<Router />} label="Network Equipment" size="small" sx={{ bgcolor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }} />
//             <Chip icon={<Print />} label="Printers" size="small" sx={{ bgcolor: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' }} />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };


 

// Reusable device component
// const DeviceBox = ({ top, left, label, onClick, children, border, padding = 1 }) => (
//   <Box
//     onClick={onClick}
//     sx={{
//       position: 'absolute',
//       top,
//       left,
//       cursor: 'pointer',
//       p: padding,
//       bgcolor: 'white',
//       border: `2px solid ${border}`,
//       borderRadius: 1,
//       textAlign: 'center',
//       '&:hover': {
//         bgcolor: '#f1f8ff',
//         transform: 'scale(1.05)',
//         transition: '0.2s ease-in-out',
//       },
//     }}
//   >
//     {children}
//     <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
//       {label}
//     </Typography>
//   </Box>
// );