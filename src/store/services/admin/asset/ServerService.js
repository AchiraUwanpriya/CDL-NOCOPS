import axios from 'axios';

const PostNewServerSnmpMaster = (data) => {
  return axios.post('Admin/SNMP/PostNewServerSnmpMaster', data).then((response) => {
    return response.data;
  });
};

const GetServerSnmpMaster = (data) => {
  return axios.get(`Admin/SNMP/GetServerSnmpMaster?id=`, data).then((response) => {
    return response.data;
  });
};
const GetIAServerSnmpMaster = (data) => {
  return axios.get(`Admin/SNMP/GetIAServerSnmpMaster?id=`, data).then((response) => {
    return response.data;
  });
};
const UpdateServerSnmpMaster = (data) => {
  return axios.post(`Admin/SNMP/UpdateServerSnmpMaster`, data).then((response) => {
    return response.data;
  });
};
// const ActiveServerSnmpMaster = (data) => {
//   return axios.post(`Admin/SNMP/ActiveServerSnmpMaster`, data).then((response) => {
//     return response.data;
//   });
// };
// const DeleteServerSnmpMaster = (data) => {
//   return axios.post(`Admin/SNMP/DeleteServerSnmpMaster?id=${data}`).then((response) => {
//     return response.data;
//   });
// };

const ServerService = {
  PostNewServerSnmpMaster,GetServerSnmpMaster,UpdateServerSnmpMaster,GetIAServerSnmpMaster,
};

export default ServerService;
