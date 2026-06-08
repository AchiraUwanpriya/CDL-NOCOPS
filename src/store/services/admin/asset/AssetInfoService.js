import axios from 'axios';

const PostNewCompany = (data) => {
  return axios.post('Admin/Assests/PostNewCompany', data).then((response) => {
    return response.data;
  });
};

const GetCompany = (data) => {
  return axios.get(`Admin/Assests/GetCompany`, data).then((response) => {
    return response.data;
  });
};
const GetUserByCompany = (data) => {
  return axios.get(`Admin/Assests/GetUserByCompany`, data).then((response) => {
    return response.data;
  });
};
const UpdateCompany = (data) => {
  return axios.post(`Admin/Assests/UpdateCompany`, data).then((response) => {
    return response.data;
  });
};
const DeleteCompany = (data) => {
  return axios.post(`Admin/Assests/DeleteCompany?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewCompany,
  GetCompany,
  GetUserByCompany,
  UpdateCompany,
  DeleteCompany,
};

export default AuthService;
