import axios from "axios";
import { de } from "date-fns/locale";

const GetMapData = (data) => {
    return axios.get('User/Map/GetMapData', data).then((response) => {
        return response.data;
    });
};

const GetNetworkTopology = (data) => {
    return axios.get('User/Map/GetNetworkTopology', data).then((response) => {
        return response.data;
    });
};

const GetSubNetworkPcs = (data) => {
    return axios.get('User/Map/GetSubNetworkPcs', data).then((response) => {
        return response.data;
    });
};

const GetNetworkUnAssignedDeviceList = (data) => {
    return axios.get('User/Map/GetNetworkUnAssignedDeviceList', data).then((response) => {
        return response.data;
    });
};

const PostNewMachine = (data) => {
    return axios.get('User/Map/PostNewMachine', data).then((response) => {
        return response.data;
    });
};

const NetworkStatus = {
    GetMapData,
    GetNetworkTopology,
    GetSubNetworkPcs,
    GetNetworkUnAssignedDeviceList,
    PostNewMachine,
};

export default NetworkStatus;