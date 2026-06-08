import axios from 'axios';

const PostSnmpDeviceTemplateGroup = (data) => {
  return axios.post('Admin/SNMP/PostSnmpDeviceTemplateGroup', data).then((response) => {
    return response.data;
  });
};

const GetSnmpDeviceTemplateGroupMaster = (data) => {
  return axios.get(`Admin/SNMP/GetSnmpDeviceTemplateGroupMaster?Id=`, data).then((response) => {
    return response.data;
  });
};
const UpdateSnmpDeviceTemplateGroup = (data) => {
  return axios.post(`Admin/SNMP/UpdateSnmpDeviceTemplateGroup`, data).then((response) => {
    return response.data;
  });
};
const DeleteSnmpDeviceTemplateGroup = (data) => {
  return axios.post(`Admin/SNMP/DeleteSnmpDeviceTemplateGroup?Id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
   GetSnmpDeviceTemplateGroupMaster,
  UpdateSnmpDeviceTemplateGroup,
  PostSnmpDeviceTemplateGroup,
  DeleteSnmpDeviceTemplateGroup
};

export default AuthService;
