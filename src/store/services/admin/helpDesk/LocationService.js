import axios from 'axios';

const PostNewLocation = (data) => {
  return axios.post('Admin/HelpDesk/PostNewLocation', data).then((response) => {
    return response.data;
  });
};

const GetLocation = (data) => {
  return axios.get(`Admin/HelpDesk/GetHelpDeskLocations`, data).then((response) => {
    return response.data;
  });
};
const UpdateLocation = (data) => {
  return axios.post(`Admin/HelpDesk/UpdateLocation`, data).then((response) => {
    return response.data;
  });
};
const DeleteLocation = (data) => {
  return axios.post(`Admin/HelpDesk/DeleteLocation?id=${data}`).then((response) => {
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
