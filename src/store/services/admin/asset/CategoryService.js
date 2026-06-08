import axios from 'axios';

const PostNewCategory = (data) => {
  return axios.post('Admin/Assests/PostNewCategory', data).then((response) => {
    return response.data;
  });
};

const GetCategory = (data) => {
  return axios.get(`Admin/Assests/GetCategory`, data).then((response) => {
    return response.data;
  });
};
const UpdateCategory = (data) => {
  return axios.post(`Admin/Assests/UpdateCategory`, data).then((response) => {
    return response.data;
  });
};
const DeleteCategory = (data) => {
  return axios.post(`Admin/Assests/DeleteCategory?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewCategory,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
};

export default AuthService;
