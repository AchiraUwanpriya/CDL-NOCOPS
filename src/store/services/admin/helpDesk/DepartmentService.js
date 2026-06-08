import axios from 'axios';

const PostNewDept = (data) => {
  return axios.post('Admin/HelpDesk/PostNewDept', data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskDepts = (data) => {
  return axios.get(`Admin/HelpDesk/GetHelpDeskDepts`, data).then((response) => {
    return response.data;
  });
};
const UpdateDept = (data) => {
  return axios.post(`Admin/HelpDesk/UpdateDept`, data).then((response) => {
    return response.data;
  });
};
const DeleteLocation = (data) => {
  return axios.post(`Admin/HelpDesk/DeleteDept?id=${data}`).then((response) => {
    return response.data;
  });
};
const AuthService = {
  PostNewDept,
  GetHelpDeskDepts,
  UpdateDept,
  DeleteLocation,
};

export default AuthService;
