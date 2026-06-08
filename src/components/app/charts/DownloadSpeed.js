import React from "react";
import { Line } from "react-chartjs-2";
//import streamingPlugin from "chartjs-plugin-streaming";
import 'chartjs-adapter-date-fns';
import { useEffect, useState } from 'react';
//import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Typography from '@mui/material/Typography';


//Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, streamingPlugin);

var speedMbps = 0;
var maxSpeed = 0;
var avgSpeed = 0;
var minSpeed = 100;
var speedArry = [];
var sortedspeed = [];



const data = {
    datasets: [
        {
            label: "DownloadSpeed",
            fill:false,  // Fill the area beneath the line
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



//-------------
const imageAddr = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Brandenburger_Tor_abends.jpg';

const downloadSize = 2707459; // this must match with the image above

let startTime, endTime;




export default function DownloadSpeed() {
    const [showSpeed, setshowSpeed] = useState(speedMbps);
    const [showhigh, setshowhigh] = useState(maxSpeed);
    const [showlow, setshowlow] = useState(minSpeed);
    const [showavarage, setshowavarage] = useState(avgSpeed);
    const [downloaded, setdownloaded] = useState(true);
    useEffect(() => {
        downloadSpeed();
        let timeout = setInterval(() => {
            if (downloaded) {
                downloadSpeed();
            }


        }, 30000);
        return () => {
            clearInterval(timeout);
        }
    }, [])

    // function for downloadspeed
    async function downloadSpeed() {

        // for (var x = 0; x <= 500000; x++) {
        startTime = Date.now();
        const cacheBuster = '?nnn=' + startTime;

        const download = new Image();
        download.src = imageAddr + cacheBuster;

        // this returns when the image is finished downloading
        try {
            setdownloaded(false);
            await download.decode();
            endTime = Date.now();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = downloadSize * 8;
            const speedBps = (bitsLoaded / duration).toFixed(2);
            const speedKbps = (speedBps / 1024).toFixed(2);
            speedMbps = (speedKbps / 1024).toFixed(2);
            setshowSpeed(speedMbps);
            setdownloaded(true);
        }
        catch (err) {
            console.log(err)
            speedMbps = 0;
        }
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
        // var d = new Date();
        // addData2(myChart2, d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(), speedMbps, maxSpeed, minSpeed, avgSpeed);
        //addData(myChart,"Higher Beam",80);
        // if (x >= 20) {
        // popData2(myChart2);
        // await new Promise(resolve => setTimeout(resolve, 3000));
        // }
        setshowhigh(maxSpeed);
        setshowlow(minSpeed);
        // }
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
                <Typography variant="h6" align="left" style={{ color: '#7C7A7D', marginLeft: "10px" }}>
                    Download Speed
                </Typography>
                <Line data={data} options={options} height={30} />
            </div>
            <div className="col-1">
                <br /> <br /> <br />
                {/* <Typography align="right" style={{ color: '#0000ff', marginTop: "46%", fontSize: "18px",marginRight:"10px" }}>
                    {showSpeed} Mbps
                </Typography>
                <Typography align="right" style={{ color: '#008000', fontSize: "18px",marginRight:"10px" }}>
                    {showhigh} Mbps
                </Typography>
                <Typography align="right" style={{ color: '#ff0000', fontSize: "18px",marginRight:"10px" }}>
                    {showlow} Mbps
                </Typography>
                <Typography align="right" style={{ color: '#FFC300', fontSize: "18px",marginRight:"10px" }}>
                    {showavarage} Mbps
                </Typography> */}
                {DisplayInfo}
            </div>


        </div>
    );
}


