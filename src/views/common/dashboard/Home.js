// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// import { Box, Paper } from "@mui/material";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";

// export default function DashBoard() {
//   // Function to handle iframe click for navigation
//   function handleClick(url) {
//     window.location.href = url;
//   }

//   // Function to inject CSS into the iframe
//   function handleIframeLoad(iframe, scale) {
//     const iframeDocument = iframe.contentWindow.document;

//     // Create style element for the iframe content
//     const style = document.createElement("style");
//     style.innerHTML = `
//         body { 
//             transform: scale(${scale}); 
//             transform-origin: 0 0; 
//             width: 200%; 
//             height: 200%; 
//             margin: 0; 
//             padding: 0; 
//             background: transparent !important; /* Transparent background */
//         }
//     `;
//     iframeDocument.head.appendChild(style);
//   }

//   // Slide data with iframes
//   const slides = [
//     { src: "/dashboard/networkStatus", title: "Network Status", scale: 0.43 },
//     { src: "/help-desk/tickets", title: "Tickets", scale: 0.5 },
//     { src: "/asset/equipment", title: "Equipment", scale: 0.5 },
//   ];

//   return (
//     <Box sx={{ textAlign: "center", maxWidth: "1100px", margin: "auto", paddingTop: "20px" }}>
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay, EffectFade]}
//         spaceBetween={50}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 8000, disableOnInteraction: false }}
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <Paper
//               elevation={5}
//               sx={{
//                 position: "relative",
//                 width: "1000px",
//                 height: "600px",
//                 margin: "auto",
//                 transition: "opacity 0.5s ease-in-out",
//                 opacity: 1, // Keep full opacity for active iframe
//               }}
//             >
//               <iframe
//                 src={slide.src}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   border: "none",
//                   background: "transparent",
//                   boxShadow: "4px 6px 15px rgba(0, 0, 0, 0.1)",
//                 }}
//                 title={slide.title}
//                 onLoad={(e) => handleIframeLoad(e.target, slide.scale)}
//                 onDoubleClick={() => handleClick(slide.src)}
//               />
//             </Paper>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Box>
//   );
// }
// 



//This is for Home Page

import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardActionArea, CardContent, Typography, CardMedia } from "@mui/material"; 
import NetworkStatus from "../../../assets/dashboard/NetworkStatus.jpg"  
import HelpDesk from "../../../assets/dashboard/HelpDesk.jpg"  
import Datacenter from "../../../assets/dashboard/Datacenter.jpg"  
import Location from "../../../assets/dashboard/Location.jpg"  
import Deviceinformation from "../../../assets/dashboard/Deviceinformation.jpg"  
import AssetEquipment from "../../../assets/dashboard/AssetEquipment.jpg"  
 
const cardData = [
  { title: "Asset Equipment", image: AssetEquipment, path: "/asset/equipment" },
  { title: "NetworkStatus", image: NetworkStatus, path: "/dashboard/networkStatus" },
  { title: "Server Center", image: Datacenter, path: "/dashboard/dataCenter" },
  { title: "Device Info", image: Deviceinformation, path: "/dashboard/deviceInfo" },
  { title: "Help Desk", image: HelpDesk, path: "/help-desk/tickets" },
  { title: "Location Info", image: Location, path: "/dashboard/locationInfo" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={4} pt={1} px={3}  justifyContent="center">
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
          <Card
          sx={{
            boxShadow: 3,
            transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
              backgroundColor: (theme) => theme.palette.primary.light, 
            },
          }}
          >
            <CardActionArea onClick={() => navigate(card.path)}>
              <CardMedia component="img"  image={card.image} alt={card.title} />
              <CardContent sx={{ padding: "6px 16px" }}>
                <Typography variant="h5" component="div" align="center">
                  {card.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;


