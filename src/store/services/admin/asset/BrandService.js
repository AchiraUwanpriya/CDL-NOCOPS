import axios from 'axios';

const PostNewBrand = (data) => {
  return axios.post('Admin/Assests/PostNewBrand', data).then((response) => {
    return response.data;
  });
};

const GetBrand = (data) => {
  return axios.get(`Admin/Assests/GetBrand`, data).then((response) => {
    return response.data;
  });
};
const UpdateBrand = (data) => {
  return axios.post(`Admin/Assests/UpdateBrand`, data).then((response) => {
    return response.data;
  });
};
const DeleteBrand = (data) => {
  return axios.post(`Admin/Assests/DeleteBrand?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewBrand,
  GetBrand,
  UpdateBrand,
  DeleteBrand,
};

export default AuthService;
