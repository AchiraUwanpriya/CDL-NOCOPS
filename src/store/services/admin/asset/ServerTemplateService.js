import axios from 'axios';

const PostSnmpDeviceTemplate = (data) => {
  return axios.post('Admin/SNMP/PostSnmpDeviceTemplate', data).then((response) => {
    return response.data;
  });
};

const GetSnmpDeviceTemplateMaster = (data) => {
  return axios.get(`Admin/SNMP/GetSnmpDeviceTemplateMaster?Id=`, data).then((response) => {
    return response.data;
  });
};

const UpdateSnmpDeviceTemplate = (data) => {
  return axios.post(`Admin/SNMP/UpdateSnmpDeviceTemplate`, data).then((response) => {
    return response.data;
  });
};
const DeleteSnmpDeviceTemplate = (data) => {
  return axios.post(`Admin/SNMP/DeleteSnmpDeviceTemplate?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostSnmpDeviceTemplate,
  UpdateSnmpDeviceTemplate,
  GetSnmpDeviceTemplateMaster,DeleteSnmpDeviceTemplate
};

export default AuthService;
