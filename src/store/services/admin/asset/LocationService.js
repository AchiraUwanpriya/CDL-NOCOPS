import axios from 'axios';

const PostNewLocation = (data) => {
  return axios.post('Admin/Assests/PostNewLocation', data).then((response) => {
    return response.data;
  });
};

const GetLocation = (data) => {
  return axios.get(`Admin/Assests/GetLocation`, data).then((response) => {
    return response.data;
  });
};
const UpdateLocation = (data) => {
  return axios.post(`Admin/Assests/UpdateLocation`, data).then((response) => {
    return response.data;
  });
};
const DeleteLocation = (data) => {
  return axios.post(`Admin/Assests/DeleteLocation?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewLocation,
  GetLocation,
  UpdateLocation,
  DeleteLocation,
};

export default AuthService;
