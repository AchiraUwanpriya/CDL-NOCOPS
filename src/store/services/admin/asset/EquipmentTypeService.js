import axios from 'axios';

const PostNewEqType = (data) => {
  return axios.post('Admin/Assests/PostNewEqType', data).then((response) => {
    return response.data;
  });
};

const GetEqType = (data) => {
  return axios.get(`Admin/Assests/GetEqType`, data).then((response) => {
    return response.data;
  });
};
const UpdateEqType = (data) => {
  return axios.post(`Admin/Assests/UpdateEqType`, data).then((response) => {
    return response.data;
  });
};
const DeleteEqType = (data) => {
  return axios.post(`Admin/Assests/DeleteEqType?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewEqType,
  GetEqType,
  UpdateEqType,
  DeleteEqType,
};

export default AuthService;
