import axios from 'axios';

const GetMapData = () => {
  return axios.get('Map/GetMapData').then((response) => {
    return response.data;
  });
};

const GetNetworkTopology = () => {
  return axios.post(`Map/GetNetworkTopology`, ).then((response) => {
    return response.data;
  });
};

const GetSubNetworkPcs = () => {
  return axios.post('Map/GetSubNetworkPcs').then((response) => {
    return response.data;
  });
};

const GetNetworkUnAssignedDeviceList = () => {
  return axios.post(`Map/GetNetworkUnAssignedDeviceList`).then((response) => {
    return response.data;
  });
};

const PostNewMachine = () => {
  return axios.post(`Map/PostNewMachine`).then((response) => {
    return response.data;
  });
};

const GetFloorDetails = () => {
  return axios.get('http://localhost:51976/ICTDevice/GetHeadBulid').then((response) => {
    return response.data;
  });
};
const LocationInfoService = {
  GetMapData,
  GetNetworkTopology,
  GetSubNetworkPcs,
  GetNetworkUnAssignedDeviceList,
  PostNewMachine,
  GetFloorDetails
};

export default LocationInfoService;
