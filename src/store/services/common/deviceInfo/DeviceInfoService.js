import axios from 'axios';

const DoPin = () => {
  return axios.get('Ping/DoPind').then((response) => {
    return response.data;
  });
};

const DoPinOne = (ipAddress) => {
  return axios.post(`Ping/DoPindOne`, { ipAddress }).then((response) => {
    return response.data;
  });
};

const SpeedPing = () => {
  return axios.post('Ping/SpeedPing').then((response) => {
    return response.data;
  });
};

const TestPing = () => {
  return axios.post(`Ping/TestPing`).then((response) => {
    return response.data;
  });
};

const TrafficStatus = () => {
  return axios.post(`Ping/TrafficStatus`).then((response) => {
    return response.data;
  });
};
const GetBandWith = () => {
  return axios.post(`Ping/Getbandwith`).then((response) => {
    return response.data;
  });
};
const GetTraffic = () => {
  return axios.post(`Ping/GetTraffic`).then((response) => {
    return response.data;
  });
};
const GetUpIPs = () => {
  return axios.post(`Ping/GetUpIPs`).then((response) => {
    return response.data;
  });
};

const DeviceInfoService = {
  DoPin,
  DoPinOne,
  SpeedPing,
  TestPing,
  TrafficStatus,
  GetBandWith,
  GetTraffic,
  GetUpIPs,
};

export default DeviceInfoService;
