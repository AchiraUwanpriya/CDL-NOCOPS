import axios from 'axios';

const PostNewUser = (data) => {
  return axios.post('Admin/Assests/PostNewUser', data).then((response) => {
    return response.data;
  });
};

const GetUser = (data) => {
  return axios.get(`Admin/Assests/GetUser`, data).then((response) => {
    return response.data;
  });
};
const GetUserByCompany = (data) => {
  return axios.get(`Admin/Assests/GetUserByCompany`, data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskUsers = (data) => {
  return axios.get(`Admin/Assests/GetHelpDeskUsers`, data).then((response) => {
    return response.data;
  });
};
const UpdateUser = (data) => {
  return axios.post(`Admin/Assests/UpdateUser`, data).then((response) => {
    return response.data;
  });
};
const DeleteUser = (data) => {
  return axios.post(`Admin/Assests/DeleteUser?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewUser,
  GetUser,
  GetUserByCompany,GetHelpDeskUsers,
  UpdateUser,
  DeleteUser,
};

export default AuthService;
