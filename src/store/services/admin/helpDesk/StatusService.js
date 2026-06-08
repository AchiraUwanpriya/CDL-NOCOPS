import axios from 'axios';

const PostNewStatus = (data) => {
  return axios.post('Admin/HelpDesk/PostNewStatus', data).then((response) => {
    return response.data;
  });
};

const GetHelpDeskStatuses = (data) => {
  return axios.get(`Admin/HelpDesk/GetHelpDeskStatuses`, data).then((response) => {
    return response.data;
  });
};
const UpdateStatus = (data) => {
  return axios.post(`Admin/HelpDesk/UpdateStatus`, data).then((response) => {
    return response.data;
  });
};
const DeleteStatus = (data) => {
  return axios.post(`Admin/HelpDesk/DeleteStatus?id=${data}`).then((response) => {
    return response.data;
  });
};

const statusService = {
  PostNewStatus,
  GetHelpDeskStatuses,
  UpdateStatus,
  DeleteStatus,
};

export default statusService;
