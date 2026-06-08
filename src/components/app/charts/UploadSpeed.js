import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import axios from "axios";
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
// var band = "";
// var maxSp = 100;;
// var highBeam = 0;
// var lowBeam = 5;
// var avgBeam = 0;

var speedMbps = 0;
var maxSpeed = 0;
var avgSpeed = 0;
var minSpeed = 100;
var speedArry = [];
var sortedspeed = [];

const data = {
  datasets: [
    {
      label: "UploadSpeed",
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
          type: "realtime",
          realtime: {
              onRefresh: function () {
                  data.datasets[0].data.push({
                      x: Date.now(),
                      y: speedMbps
                  });
                  data.datasets[1].data.push({
                      x: Date.now(),
                      y: maxSpeed
                  });
                  data.datasets[2].data.push({
                      x: Date.now(),
                      y: minSpeed
                  });
                  data.datasets[3].data.push({
                      x: Date.now(),
                      y: avgSpeed
                  });
              },
              delay: 300,
              refresh: 300,
              stepSize: 20000
          },
          time: {
              stepSize: 4,
              unit: 'second',
          }
      },
      y: {
          title: {
              display: true,
              text: "Speed (Mbps)",
              font: {
                  size: 15
              },
              color: "#6c757d"
          },
          ticks: {
              min: 0,  // Minimum value on the y-axis
              max: 200,  // Set a higher maximum value (adjust this according to your data)
              stepSize: 10, // Controls the interval between ticks
              callback: function (value) {
                  return `${value} Mbps`; // Formatting tick labels
              }
          }
      }
  }
};

export default function UploadSpeed() {
  const [showSpeed, setshowSpeed] = useState(speedMbps);
  const [showhigh, setshowhigh] = useState(maxSpeed);
  const [showlow, setshowlow] = useState(minSpeed);
  const [showavarage, setshowavarage] = useState(avgSpeed);
  const [downloaded, setdownloaded] = useState(true);
  useEffect(() => {
    let timeout = setInterval(() => {
      if (downloaded) {
        uploadspeed();
      }
    }, 30000);
    return () => {
      clearInterval(timeout);
    }

  }, [])

  function uploadspeed() {
    setdownloaded(false)
    let startTime;
    let endTime;
    var url = "/Ping/TestPing";
    var myData = { d: "k" }; // the raw data you will send
    var download_size = 1024 * 1024;
    for (var i = 0; i < 1024 * 1024; i++) //if you want to send 1 kb (2 + 1022 bytes = 1024b = 1kb). change it the way you want
    {
      myData.d += "k"; // add one byte of data;
    }
    startTime = (new Date()).getTime();

    axios({
      url: url,
      method: "POST",
      data: myData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then((response) => {
      endTime = (new Date()).getTime();

      var duration = (endTime - startTime) / 1000;
      var bitsLoaded = download_size * 8;
      speedMbps = ((1 / duration)).toFixed(2);
      setshowSpeed(speedMbps);


      if (parseFloat(maxSpeed) < parseFloat(speedMbps)) {
        maxSpeed = speedMbps;
        setshowhigh(maxSpeed);
      }

      if (parseFloat(minSpeed) > parseFloat(speedMbps)) {
        minSpeed = speedMbps;
        setshowlow(minSpeed);
      }

      avgSpeed = ((parseFloat(maxSpeed) + parseFloat(minSpeed)) / 2).toFixed(2);
      setshowavarage(avgSpeed);
      setdownloaded(true)
    }).catch((error) => {
      var speedMbps = 0;
      if (parseFloat(maxSpeed) < parseFloat(speedMbps))
        maxSpeed = speedMbps;

      if (parseFloat(minSpeed) > parseFloat(speedMbps))
        minSpeed = speedMbps;

      avgSpeed = ((parseFloat(maxSpeed) + parseFloat(minSpeed)) / 2).toFixed(2);
      setshowavarage(avgSpeed);

      setdownloaded(true)
    })


    
  }
  sortedspeed = [];
  speedArry = [];

  let p = {
    speed: speedMbps,
    color: '#0000ff',
  }

  let q = {
    speed: maxSpeed,
    color: '#008000',
  }
  let r = {
    speed: minSpeed,
    color: '#ff0000',
  }
  let s = {
    speed: avgSpeed,
    color: '#FFC300',
  }
  speedArry.push(p);
  speedArry.push(q);
  speedArry.push(r);
  speedArry.push(s);
  sortedspeed = speedArry.sort((a, b) => parseFloat(b.speed) - parseFloat(a.speed));

  const DisplayInfo = sortedspeed.map((info) => {
    return (
      <Typography align="right" style={{ color: info.color, fontSize: "18px", marginRight: "10px" }}>
        {info.speed} Mbps
      </Typography>
    );
  });
  return (
    <div className="row">
      <div className="col-11">
        <Typography variant="h6" align="left" style={{ color: '#60616C', marginLeft: "10px" }}>
          Upload Speed
        </Typography>
        <Line data={data} options={options} height={30} />
      </div>
      <div className="col-1" >
        <br /> <br /> <br />
        {DisplayInfo}
      </div>


    </div>
  );
}


