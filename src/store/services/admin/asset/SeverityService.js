import axios from 'axios';

const PostNewseverity = (data) => {
  return axios.post('Admin/Assests/PostNewseverity', data).then((response) => {
    return response.data;
  });
};

const GetSeverity = (data) => {
  return axios.get(`Admin/Assests/GetSeverity`, data).then((response) => {
    return response.data;
  });
};
const UpdateSeverity = (data) => {
  return axios.post(`Admin/Assests/UpdateSeverity`, data).then((response) => {
    return response.data;
  });
};
const DeleteSeverity = (data) => {
  return axios.post(`Admin/Assests/DeleteSeverity?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewseverity,
  GetSeverity,
  UpdateSeverity,
  DeleteSeverity,
};

export default AuthService;
