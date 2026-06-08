import axios from 'axios';

const PostNewEquipment = (data) => {
  return axios.post('Admin/Assests/PostNewEquipment', data).then((response) => {
    return response.data;
  });
};

const GetEquipment = (data) => {
  return axios.get(`Admin/Assests/GetEquipment`, data).then((response) => {
    return response.data;
  });
};
const UpdateEquipment = (data) => {
  return axios.post(`Admin/Assests/UpdateEquipment`, data).then((response) => {
    return response.data;
  });
};
const DeleteEquipment = (data) => {
  return axios.post(`Admin/Assests/DeleteEquipment?id=${data}`).then((response) => {
    return response.data;
  });
};

const AuthService = {
  PostNewEquipment,
  GetEquipment,
  UpdateEquipment,
  DeleteEquipment,
};

export default AuthService;
