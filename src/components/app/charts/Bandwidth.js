import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend ,TimeScale} from "chart.js";

import streamingPlugin from "chartjs-plugin-streaming";

import axios from "axios";
import Typography from '@mui/material/Typography';
import 'chartjs-adapter-date-fns';



// Register the required scales and elements
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, streamingPlugin,TimeScale);

// Global variables for bandwidth data
let band = 0;
let maxSp = 100;
let highBeam = 0;
let lowBeam = 1000;
let avgBeam = 0;

const data = {
  datasets: [
    {
      label: "BandwidthSpeed",
      fill: false,  // Fill the area beneath the line
      lineTension: 0.4,
      backgroundColor: "rgb(0, 0, 255, 1)",  // Fill with green color, 20% opacity for box effct
      borderColor: "#0000FF",  // Border color for the line
      borderJoinStyle: "miter",
      pointRadius: 0,
      showLine: true,
      data: [],
    },
    {
      label: "Higher Beam",
      fill: false,  // Fill the area beneath the line
      lineTension: 0.4,
      backgroundColor: "rgba(0, 128, 0, 1)",  // Fill with green color, 20% opacity for box effect
      borderColor: "#008000",  // Border color for the line
      borderJoinStyle: "miter",
      pointRadius: 0,
      showLine: true,
      data: [],
    },
    {
      label: "Lower Beam",
      fill: false,  // Fill the area beneath the line
      lineTension: 0.4,
      backgroundColor: "rgba(255, 0, 0, 1)",  // Fill with red color, 20% opacity for box effect
      borderColor: "#ff0000",  // Border color for the line
      borderJoinStyle: "miter",
      pointRadius: 0,
      showLine: true,
      data: [],
    },
    {
      label: "Average Beam",
      fill: false,  // Fill the area beneath the line
      lineTension: 0.4,
      backgroundColor: "rgba(255, 195, 0, 1)",  // Fill with yellow color, 20% opacity for box effect
      borderColor: "#FFC300",  // Border color for the line
      borderJoinStyle: "miter",
      pointRadius: 0,
      showLine: true,
      data: [],
    },
  ],
};


const options = {
  scales: {
    x: {
      type: "realtime", // Use "realtime" scale from the plugin
      realtime: {
        onRefresh: function (chart) {
          data.datasets[0].data.push({
            x: Date.now(),
            y: band,
          });

          data.datasets[1].data.push({
            x: Date.now(),
            y: highBeam,
          });

          data.datasets[2].data.push({
            x: Date.now(),
            y: lowBeam,
          });

          data.datasets[3].data.push({
            x: Date.now(),
            y: avgBeam,
          });
        },
        delay: 300,
        refresh: 300,
        duration: 20000, // Duration of the chart in milliseconds
      },
    },
    y: 
    {
      title: {
        display: true,
        text: "Speed (Mbps)",
        font: {
            size: 15
        },
        color: "#6c757d"
    },
      scaleLabel: {
        display: true,
        fontFamily: "Arial",
        labelString: "Speed (Mbps)", // Updated label to Mbps
        fontSize: 15,
        fontColor: "#6c757d",
      },
      ticks: {
        beginAtZero: true, // Ensures the scale starts at 0
        stepSize: 200, // Set breaking values at every 200 Mbps
        callback: function (value) {
          return `${value} Mbps`; // Display values with 'Mbps'
        },
      },
    },
    
  },
  plugins: {
    streaming: {
      frameRate: 30, // Adjust the frame rate for smoother updates
    },
  },
};

export default function BandwidthChart(props) {
  const [showSpeed, setshowSpeed] = useState(band);
  const [showhigh, setshowhigh] = useState(highBeam);
  const [showlow, setshowlow] = useState(lowBeam);
  const [showavarage, setshowavarage] = useState(avgBeam);

  let height = props.height;

  useEffect(() => {
    let timeout = setInterval(() => {
      bandwidthspeed();
    }, 30000);
    return () => {
      clearInterval(timeout);
    };
  }, []);

  function bandwidthspeed() {
    axios
      .get("Ping/getBandwith")
      .then((res) => {
        band = parseFloat(res.data);
        setshowSpeed(band.toFixed(2));

        if (parseFloat(highBeam) < parseFloat(band)) {
          highBeam = band;
          setshowhigh(highBeam.toFixed(2));
        }

        if (parseFloat(lowBeam) > parseFloat(band)) {
          lowBeam = band;
          setshowlow(lowBeam.toFixed(2));
        }

        avgBeam = (parseFloat(highBeam) + parseFloat(lowBeam)) / 2;
        setshowavarage(avgBeam.toFixed(2));
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const sortedspeed = [
    { speed: band.toFixed(2), color: "#0000ff" },
    { speed: highBeam.toFixed(2), color: "#008000" },
    { speed: lowBeam.toFixed(2), color: "#ff0000" },
    { speed: avgBeam.toFixed(2), color: "#FFC300" },
  ].sort((a, b) => parseFloat(b.speed) - parseFloat(a.speed));

  const DisplayInfo = sortedspeed.map((info, index) => (
    <Typography key={index} align="right" style={{ color: info.color, fontSize: "18px", marginRight: "10px" }}>
      {info.speed} Kbps
    </Typography>
  ));

  return (
    <div className="row">
      <div className="col-11">
        <Typography variant="h6" align="left" style={{ color: "#7C7A7D", marginLeft: "10px" }}>
          Bandwidth Speed
        </Typography>
        <Line data={data} options={options} height={height} />
      </div>
      <div className="col-1" style={{ alignItems: "right" }}>
        <br /> <br /> <br />
        {DisplayInfo}
      </div>
    </div>
  );
}