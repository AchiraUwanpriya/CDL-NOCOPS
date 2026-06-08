import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Container, Box, Typography, Alert, Snackbar, Autocomplete } from '@mui/material';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import StreamingPlugin from 'chartjs-plugin-streaming';


Chart.register(StreamingPlugin);

const ipList = Array.from({ length: 50 }, (_, i) => `172.30.30.${100 + i}`);
const defaultIP = '172.30.30.147';

const CheckConnection = () => {


  const [ipAddress, setIpAddress] = useState(defaultIP); // Hardcoded IP for auto-start
  const [isMonitoring, setIsMonitoring] = useState(true); // Start monitoring automatically
  const [error, setError] = useState('');
  const [currentSpeeds, setCurrentSpeeds] = useState({ bandwidth: 0, upload: 0, download: 0 });
  const [beamValues, setBeamValues] = useState({
    bandwidth: { high: 0, low: 0, avg: 0 },
    upload: { high: 0, low: 0, avg: 0 },
    download: { high: 0, low: 0, avg: 0 },
  });



  const chartRefs = useRef([useRef(null), useRef(null), useRef(null)]);
  const chartInstances = useRef([null, null, null]);

  // Function for network speed test - hardcoded
  const simulateSpeedTest = (ip) => {
    const baseSpeed = parseInt(ip.split('.')[3]) || 50;
    return {
      bandwidth: baseSpeed + Math.random() * 20,
      download: baseSpeed + Math.random() * 30,
      upload: baseSpeed + Math.random() * 15,
    };
  };

  // Calculate high, low, and average beams - hardcoded
  const calculateBeams = (speed) => ({
    high: speed * 1.2,
    low: speed * 0.8,
    avg: speed,
  });

  // Function to take network speed data (simulated)
  const getNetworkSpeedData = (ip) => {
    return new Promise((resolve) => {
      const data = simulateSpeedTest(ip);
      resolve(data);
    });
  };

  useEffect(() => {
    if (chartRefs.current.every(ref => ref.current !== null) && isMonitoring) {
      const initCharts = () => {
        chartRefs.current.forEach((chartRef, index) => {
          const ctx = chartRef.current.getContext('2d');
          if (chartInstances.current[index]) {
            chartInstances.current[index].destroy();
          }

          chartInstances.current[index] = new Chart(ctx, {
            type: 'line',
            data: {
              datasets: [
                {
                  label: index === 0 ? "Bandwidth Speed" : index === 1 ? "Upload Speed" : "Download Speed",
                  fill: false,
                  lineTension: 0.4,
                  backgroundColor: "rgba(0, 0, 255, 1)",
                  borderColor: index === 0 ? "#0000FF" : index === 1 ? "#0000FF" : "#0000FF",
                  pointRadius: 0,
                  showLine: true,
                  data: [],
                },
                {
                  label: "Higher Beam",
                  fill: false,
                  lineTension: 0.4,
                  backgroundColor: "rgba(0, 128, 0, 1)",
                  borderColor: "#008000",
                  pointRadius: 0,
                  showLine: true,
                  data: [],
                },
                {
                  label: "Lower Beam",
                  fill: false,
                  lineTension: 0.4,
                  backgroundColor: "rgba(255, 0, 0, 1)",
                  borderColor: "#ff0000",
                  pointRadius: 0,
                  showLine: true,
                  data: [],
                },
                {
                  label: "Average Beam",
                  fill: false,
                  lineTension: 0.4,
                  backgroundColor: "rgba(255, 195, 0, 1)",
                  borderColor: "#FFC300",
                  pointRadius: 0,
                  showLine: true,
                  data: [],
                },
              ],
            },
            options: {
              scales: {
                x: {
                  type: "realtime",
                  realtime: {
                    onRefresh: async function (chart) {
                      try {
                        const networkData = await getNetworkSpeedData(ipAddress);
                        const beams = calculateBeams(
                          index === 0
                            ? networkData.bandwidth
                            : index === 1
                              ? networkData.upload
                              : networkData.download
                        );

                        // Update chart data for speed
                        chart.data.datasets[0].data.push({
                          x: Date.now(),
                          y: index === 0
                            ? networkData.bandwidth
                            : index === 1
                              ? networkData.upload
                              : networkData.download,
                        });

                        // Update chart data for beams
                        chart.data.datasets[1].data.push({
                          x: Date.now(),
                          y: beams.high,
                        });
                        chart.data.datasets[2].data.push({
                          x: Date.now(),
                          y: beams.low,
                        });
                        chart.data.datasets[3].data.push({
                          x: Date.now(),
                          y: beams.avg,
                        });

                        // Update the current speed values
                        setCurrentSpeeds((prev) => ({
                          ...prev,
                          [index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download']: index === 0
                            ? networkData.bandwidth
                            : index === 1
                              ? networkData.upload
                              : networkData.download,
                        }));

                        // Update the beam values independently
                        setBeamValues((prev) => ({
                          ...prev,
                          [index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download']: beams,
                        }));
                      } catch (error) {
                        setError('Failed to fetch network speed data');
                        setIsMonitoring(false);
                      }
                    },
                    delay: 2000,
                    refresh: 2000,
                    duration: 20000,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Speed (Mbps)",
                    font: { size: 15 },
                    color: "#6c757d",
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 200,
                    callback: function (value) {
                      return `${value} Mbps`;
                    },
                  },
                },
              },
              plugins: {
                streaming: { frameRate: 30 },
                title: {
                  display: true,
                  text: index === 0 ? 'Bandwidth Speed Monitor' : index === 1 ? 'Upload Speed Monitor' : 'Download Speed Monitor',
                  font: { size: 20 },
                },
                legend: {
                  position: 'top',
                },
              },
            },
          });
        });
      };
      initCharts();
    }

    return () => {
      chartInstances.current.forEach(chart => chart?.destroy());
    };
  }, [ipAddress, isMonitoring]);

  const handleStopMonitoring = () => {
    setIsMonitoring(false);
    setIpAddress(''); // Clear IP address
  };

  return (
    <Container
      sx={{
        width: { xs: '100%', sm: '90%', md: '80%', lg: '96%', xl: '96%' },
        maxWidth: '1200px', // Ensures it doesn't get too wide on large screens
        mx: 'auto', // Centers the container
      }}
    >
      <Box sx={{ my: -1 }}>

        {/* Only with the drop down */}
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="ip-select-label">Select IP Address</InputLabel>
            <Select
              labelId="ip-select-label"
              value={ipAddress}
              label="Select IP Address"
              onChange={(e) => setIpAddress(e.target.value)}
              disabled={!isMonitoring}
            >
              {ipList.map((ip, index) => (
                <MenuItem key={index} value={ip}>
                  {ip}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}

        {/* drop down and with input option of the IP adresss */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Autocomplete
            freeSolo
            options={ipList}
            inputValue={ipAddress} // <- use inputValue for freeSolo
            onInputChange={(event, newInputValue) => setIpAddress(newInputValue)}
            disabled={!isMonitoring}
            renderInput={(params) => (
              <TextField {...params} label="Select IP Address" />
            )}
            sx={{ width: '100%' }}
          />
        </Box>

        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Network Speed Monitor
        </Typography>



        {/* The IP Address input field is commented out */}
        {/* <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter IP Address"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="Enter your device IP address"
            error={!!error}
            helperText={error}
            disabled={isMonitoring}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            {!isMonitoring ? (
              <Button variant="contained" type="submit" color="primary">
                Start Monitoring
              </Button>
            ) : (
              <Button variant="contained" color="error" onClick={handleStopMonitoring}>
                Stop Monitoring
              </Button>
            )}
          </Box>
        </Box> */}

        {/* {isMonitoring && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', }}>
            {['Bandwidth', 'Upload', 'Download'].map((label, index) => (
              <Box key={index} sx={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',  // Added box-shadow
                borderRadius: '8px',  // Rounded corners for the box
                padding: '35px',  // Added padding
                backgroundColor: '#fff',  // White background for the box
                width: '100%',  // Ensures the box fills the container width
                ml: -1.5,
              }}>
                <canvas
                  ref={chartRefs.current[index]}
                  height="200" // or any fixed value like 250
                  style={{ maxHeight: '250px' }} // optional for safety
                />


                <Box sx={{ ml: 7 }}>
                  <Typography variant="h6" sx={{ color: "#0000FF" }}>
                    {currentSpeeds[index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download'].toFixed(2)} Mbps
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#008000" }}>
                    {beamValues[index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download'].high.toFixed(2)} Mbps
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#ff0000" }}>
                    {beamValues[index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download'].low.toFixed(2)} Mbps
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#FFC300" }}>
                    {beamValues[index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download'].avg.toFixed(2)} Mbps
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )} */}

        {isMonitoring && (
          <>
            {ipAddress && ipAddress.trim() !== '' ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
                {['Bandwidth', 'Upload', 'Download'].map((label, index) => (
                  <Box key={index} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                    borderRadius: '8px',
                    padding: '35px',
                    backgroundColor: '#fff',
                    width: '100%',
                    ml: -1.5,
                  }}>
                    <canvas
                      ref={chartRefs.current[index]}
                      height="200"
                      style={{ maxHeight: '250px' }}
                    />
                    <Box sx={{ ml: 7 }}>
                      <Typography variant="h6" sx={{ color: "#0000FF" }}>
                        {currentSpeeds[index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download'].toFixed(2)} Mbps
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#008000" }}>
                        {beamValues[index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download'].high.toFixed(2)} Mbps
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#ff0000" }}>
                        {beamValues[index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download'].low.toFixed(2)} Mbps
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#FFC300" }}>
                        {beamValues[index === 0 ? 'bandwidth' : index === 1 ? 'upload' : 'download'].avg.toFixed(2)} Mbps
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Please Select or Enter an IP address to view monitoring charts.
              </Alert>
            )} 
          </>
        )}


      </Box>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CheckConnection;
