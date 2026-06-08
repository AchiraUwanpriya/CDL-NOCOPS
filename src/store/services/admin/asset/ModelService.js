import axios from 'axios';

const PostNewModel = (data) => {
  return axios.post('Admin/Assests/PostNewModel', data).then((response) => {
    return response.data;
  });
};

const GetModel = (data) => {
  return axios.get(`Admin/Assests/GetModel`, data).then((response) => {
    return response.data;
  });
};
const UpdateModel = (data) => {
  return axios.post(`Admin/Assests/UpdateModel`, data).then((response) => {
    return response.data;
  });
};
const DeleteModel = (data) => {
  return axios.post(`Admin/Assests/DeleteModel?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewModel,
  GetModel,
  UpdateModel,
  DeleteModel,
};

export default AuthService;
