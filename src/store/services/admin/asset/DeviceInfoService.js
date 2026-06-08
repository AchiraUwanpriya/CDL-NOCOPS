import { Data } from '@react-google-maps/api';
import axios from 'axios';

const GetOidData = (data) => {
    return axios.get('User/SystemHealth/GetOidData', data).then((response) => {
        return response.data;
    });
};

const GetOIDInfoList = (data) => {
    return axios.get('User/SystemHealth/GetOIDInfoList', data).then((response) => {
        return response.data;
    });
};

const GetOIDValueList = (data) => {
    return axios.get('User/SystemHealth/GetOIDValueList', data).then((response) => {
        return response.data;
    });
};

const GetLastOnlineInfo = (data) => {
    return axios.get('User/SystemHealth/GetLastOnlineInfo', data).then((response) => {
        return response.data;
    });
};

const GetSNMPTemplateGroups = (data) => {
    return axios.get('User/SystemHealth/GetSNMPTemplateGroups', data).then((response) => {
        return response.data;
    });
};

const GetSNMPTemplates = (data) => {
    return axios.get('User/SystemHealth/GetSNMPTemplates', data).then((response) => {
        return response.data;
    });
};

const DeviceInfo = {
    GetOidData,
    GetOIDInfoList,
    GetOIDValueList,
    GetLastOnlineInfo,
    GetSNMPTemplateGroups,
    GetSNMPTemplates,
};

export default DeviceInfo;