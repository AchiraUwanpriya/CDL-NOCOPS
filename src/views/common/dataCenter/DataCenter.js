// import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
// import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
// import ThermostatIcon from '@mui/icons-material/Thermostat';
// import { Grid, Typography } from '@mui/material';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import IconButton from '@mui/material/IconButton';
// import PropTypes from 'prop-types';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Spring, animated } from 'react-spring';
// import PageContainer from '../../../components/theme/container/PageContainer';
// import DashboardCard from '../../../components/theme/shared/DashboardCard';
// import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
// import { GetEnironmentalVariables } from '../../../store/slices/common/dataCenter/DataCenterSlices';

// const YoutubeEmbed = ({ embedId }) => (
//   <div className="video-responsive">
//     <iframe
//       width="753"
//       height="250"
//       src={`https://www.youtube.com/embed/${embedId}`}
//       frameBorder="0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//       title="Embedded youtube"
//     />
//   </div>
// );

// YoutubeEmbed.propTypes = {
//   embedId: PropTypes.string.isRequired,
// };

// export default function DataCenterEnvironment() {
//   const dispatch = useDispatch();
//   const { EnvironmentData } = useSelector((state) => state.dataCenterSlices);


//   useEffect(() => {
//     dispatch(GetEnironmentalVariables());
//   }, [dispatch]);

//   return (
//     <PageContainer title="Data Center Status" description="this is Network Status Page">
//       {/* breadcrumb */}
//       <Breadcrumb title="Data Center Status" />
//       {/* end breadcrumb */}
//       <DashboardCard title="">
//         <div className="main">
//           {" "}
//           <span></span>
//           {/* Heading01 */}
//           <div className="row">
//             <div className="col-md-12 col-sm-12">
//               <Card
//                 sx={{
//                   maxWidth: "100%",
//                   border: 1,
//                   borderColor: "lightgray",
//                   marginTop: "20px",
//                   // marginLeft: "100px",
//                   backgroundColor: "#f5f5f5",
//                   borderRadius: "15px",
//                 }}
//               >
//                 <Box>
//                   <Grid container spacing={3}>

//                     <Grid item xs={12} sm={12} lg={12} textAlign="center">
//                       <Typography
//                         variant="h7"
//                         fontWeight="fontWeightBold"
//                         color="#707590"
//                         width="100%"
//                         // backgroundColor="blue"
//                         alignItems="center"
//                         justifyContent="center"
//                         // paddingRight="15px"
//                         textAlign="center"
//                       >
//                         RATHMALANA SERVER STATION
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={12} lg={3}>
//                       <Card
//                         sx={{

//                           borderColor: "lightgray",
//                           marginTop: "20px",
//                           borderRadius: "18px",
//                         }}
//                       >
//                         <CardContent align="center">
//                           <Typography
//                             variant="h7"
//                             fontWeight="regular"
//                             color="#707590"
//                             align="center"
//                           >
//                             Server Temperature
//                           </Typography>
//                           <div className="col">
//                             <IconButton
//                               sx={{
//                                 // fontSize: 90,
//                                 color: "#228B22",
//                                 backgroundColor: "  #e9f5fb  ",
//                                 margin: "10px",
//                                 align: "center",
//                                 size: "large",
//                               }}
//                             >
//                               <ThermostatIcon
//                                 sx={{
//                                   fontSize: 60,
//                                   color: "#7eaee1",
//                                   // margin: "10px",
//                                   // align: "center",
//                                 }}
//                               />
//                             </IconButton>
//                           </div>
//                           <div className="col">
//                             <Typography variant="h4" color={"#512da8"}>
//                               {EnvironmentData.temperature}°C
//                             </Typography>
//                             <Typography
//                               gutterBottom
//                               variant="h6"
//                               component="div"
//                               color={"#00bfa5"}
//                             >
//                               {((parseFloat(EnvironmentData.temperature) * 9) / 5 + 32).toFixed(2)}°F
//                             </Typography>
//                           </div>
//                         </CardContent>
//                       </Card>

//                     </Grid>
//                     <Grid item xs={12} sm={12} lg={3}>
//                       <Card
//                         sx={{

//                           borderColor: "lightgray",
//                           marginTop: "20px",
//                           borderRadius: "18px",
//                         }}
//                       >
//                         <CardContent align="center">
//                               <div className="row">
//                                 <Typography
//                                   variant="h7"
//                                   fontWeight="regular"
//                                   color="#817777"
//                                   width="100%"
//                                   align="center"
//                                 >
//                                   Server Humidity Level
//                                 </Typography>
//                                 <div className="col">
//                                   <IconButton
//                                     sx={{
//                                       // fontSize: 90,
//                                       color: "#228B22",
//                                       backgroundColor: "  #e9f5fb  ",
//                                       margin: "10px",
//                                       align: "center",
//                                       size: "large",
//                                     }}
//                                   >
//                                     <OpacityOutlinedIcon
//                                       sx={{
//                                         fontSize: 55,
//                                         color: "#7eaee1",
//                                         // margin: "10px",
//                                         // align: "center",
//                                       }}
//                                     />
//                                   </IconButton>
//                                 </div>
//                                 <div className="col">
//                                   <br></br>
//                                   <Typography variant="h4" color={"#512da8"}>
//                                     {EnvironmentData.humidity}Rh
//                                   </Typography>
//                                 </div>
//                               </div>
//                             </CardContent>
//                       </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={12} lg={3}>
//                       <Card
//                         sx={{

//                           borderColor: "lightgray",
//                           marginTop: "20px",
//                           borderRadius: "18px",
//                         }}
//                       >
//                         <CardContent align="center">
//                               {EnvironmentData.flame === "Fire" ? (
//                                 <div className="row">
//                                   <Typography
//                                     variant="h7"
//                                     fontWeight="regular"
//                                     color="GrayText"
//                                     width="100%"
//                                     align="center"
//                                   >
//                                     Fire Status
//                                   </Typography>
//                                   <div className="col">
//                                     <Spring
//                                       loop
//                                       from={{ opacity: 0, color: "red" }}
//                                       to={[
//                                         { opacity: 1, color: "crimson" },
//                                         { opacity: 0, color: "rgb(14,26,19)" },
//                                       ]}
//                                     >
//                                       {(styles) => (
//                                         <animated.div style={styles}>
//                                           <IconButton
//                                             sx={{
//                                               // fontSize: 90,
//                                               color: "#228B22",
//                                               backgroundColor: "  #e9f5fb  ",
//                                               margin: "10px",
//                                               align: "center",
//                                               size: "large",
//                                             }}
//                                           >
//                                             <LocalFireDepartmentIcon
//                                               sx={{
//                                                 fontSize: 55,
//                                                 // margin: "10px",
//                                                 // align: "center",
//                                               }}
//                                             />
//                                           </IconButton>
//                                         </animated.div>
//                                       )}
//                                     </Spring>
//                                   </div>
//                                   <div className="col">
//                                     <br></br>
//                                     <Spring
//                                       loop
//                                       from={{ opacity: 0, color: "red" }}
//                                       to={[
//                                         { opacity: 1, color: "crimson" },
//                                         { opacity: 0, color: "rgb(14,26,19)" },
//                                       ]}
//                                     >
//                                       {(styles) => (
//                                         <animated.div style={styles}>
//                                           <Typography variant="h4" fontStyle="bold">
//                                             Fire
//                                           </Typography>
//                                         </animated.div>
//                                       )}
//                                     </Spring>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <div className="row">
//                                   <Typography
//                                     variant="h7"
//                                     fontWeight="regular"
//                                     color="#817777"
//                                     width="100%"
//                                     align="center"
//                                   >
//                                     Fire Status
//                                   </Typography>
//                                   <div className="col">
//                                     <IconButton
//                                       sx={{
//                                         // fontSize: 90,
//                                         color: "#228B22",
//                                         backgroundColor: "  #e9f5fb  ",
//                                         margin: "10px",
//                                         align: "center",
//                                         size: "large",
//                                       }}
//                                     >
//                                       <LocalFireDepartmentIcon
//                                         sx={{
//                                           fontSize: 55,
//                                           color: "#7eaee1",
//                                           // margin: "10px",
//                                           // align: "center",
//                                         }}
//                                       />
//                                     </IconButton>
//                                   </div>
//                                   <div className="col">
//                                     <br></br>
//                                     <Typography
//                                       variant="h5"
//                                       fontStyle="bold"
//                                       color={"#512da8"}
//                                     >
//                                       No Fire
//                                     </Typography>
//                                   </div>
//                                 </div>
//                               )}
//                             </CardContent>
//                       </Card>
//                     </Grid>

//                     <Grid item xs={12} sm={12} lg={12} textAlign="center">
//                     <Box
//                         sx={{
//                           height: 305,
//                           border: 1,
//                           margin: "15px",
//                           borderColor: "lightgray",
//                           borderRadius: 5,
//                           //backgroundColor :'red',
//                           display: "flex",
//                           flexDirection: "column",
//                           backgroundColor: "white",
//                         }}
//                       >
//                         <div className="App">
//                           <h6>CAM 01</h6>
//                           {/* <YoutubeEmbed embedId="b5CZCdxaTL8" /> */}
//                         </div>
//                       </Box>
//                     </Grid>
                    
//                   </Grid>
//                 </Box>
//               </Card>

             
//             </div>
//           </div>
//           <br></br>
//         </div>
//       </DashboardCard>
//     </PageContainer>
//   );
// }


import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spring, animated } from 'react-spring';
import PageContainer from '../../../components/theme/container/PageContainer';
import DashboardCard from '../../../components/theme/shared/DashboardCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { GetEnironmentalVariables } from '../../../store/slices/common/dataCenter/DataCenterSlices';

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="753"
      height="250"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default function DataCenterEnvironment() {
  const dispatch = useDispatch();
  const { EnvironmentData } = useSelector((state) => state.dataCenterSlices);

  useEffect(() => {
  window.location.replace('http://192.168.1.75');
}, []);


  useEffect(() => {
    dispatch(GetEnironmentalVariables());
  }, [dispatch]);

  // return (
  //   <PageContainer title="Data Center Status" description="this is Network Status Page">
  //     {/* breadcrumb */}
  //     <Breadcrumb title="Data Center Status" />
  //     {/* end breadcrumb */}
  //     <DashboardCard title="">
  //       <div className="main">
  //         {" "}
  //         <span></span>
  //         {/* Heading01 */}
  //         <div className="row">
  //           <div className="col-md-12 col-sm-12">
  //             <Card
  //               sx={{
  //                 maxWidth: "100%",
  //                 border: 1,
  //                 borderColor: "lightgray",
  //                 marginTop: "20px",
  //                 // marginLeft: "100px",
  //                 backgroundColor: "#f5f5f5",
  //                 borderRadius: "15px",
  //               }}
  //             >
  //               <Box>
  //                 <Grid container spacing={3}>
  //                   <Grid item xs={12} sm={12} lg={12} textAlign="center">
  //                     <Typography
  //                       variant="h7"
  //                       fontWeight="fontWeightBold"
  //                       color="#707590"
  //                       width="100%"
  //                       // backgroundColor="blue"
  //                       alignItems="center"
  //                       justifyContent="center"
  //                       // paddingRight="15px"
  //                       textAlign="center"
  //                     >
  //                       RATHMALANA SERVER STATION
  //                     </Typography>
  //                   </Grid>
  //                   <Grid item xs={12} sm={12} lg={3}>
  //                     <Card
  //                       sx={{
  //                         borderColor: "lightgray",
  //                         marginTop: "20px",
  //                         borderRadius: "18px",
  //                       }}
  //                     >
  //                       <CardContent align="center">
  //                         <Typography
  //                           variant="h7"
  //                           fontWeight="regular"
  //                           color="#707590"
  //                           align="center"
  //                         >
  //                           Server Temperature
  //                         </Typography>
  //                         <div className="col">
  //                           <IconButton
  //                             sx={{
  //                               // fontSize: 90,
  //                               color: "#228B22",
  //                               backgroundColor: "  #e9f5fb  ",
  //                               margin: "10px",
  //                               align: "center",
  //                               size: "large",
  //                             }}
  //                           >
  //                             <ThermostatIcon
  //                               sx={{
  //                                 fontSize: 60,
  //                                 color: "#7eaee1",
  //                                 // margin: "10px",
  //                                 // align: "center",
  //                               }}
  //                             />
  //                           </IconButton>
  //                         </div>
  //                         <div className="col">
  //                           <Typography variant="h4" color={"#512da8"}>
  //                             {EnvironmentData.temperature}°C
  //                           </Typography>
  //                           <Typography
  //                             gutterBottom
  //                             variant="h6"
  //                             component="div"
  //                             color={"#00bfa5"}
  //                           >
  //                             {((parseFloat(EnvironmentData.temperature) * 9) / 5 + 32).toFixed(2)}°F
  //                           </Typography>
  //                         </div>
  //                       </CardContent>
  //                     </Card>
  //                   </Grid>
  //                   {/* more cards follow... */}
  //                 </Grid>
  //               </Box>
  //             </Card>
  //           </div>
  //         </div>
  //       </div>
  //     </DashboardCard>
  //   </PageContainer>
  // );
}
