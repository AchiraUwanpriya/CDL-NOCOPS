import axios from 'axios';

const PostNewSeverity = (data) => {
  return axios.post('Admin/HelpDesk/PostNewSeverity', data).then((response) => {
    return response.data;
  });
};

const GetHelpDeskSeverities = (data) => {
  return axios.get(`Admin/HelpDesk/GetHelpDeskSeverities`, data).then((response) => {
    return response.data;
  });
};
const UpdateSeverity = (data) => {
  return axios.post(`Admin/HelpDesk/UpdateSeverity`, data).then((response) => {
    return response.data;
  });
};
const DeleteSeverity = (data) => {
  return axios.post(`Admin/HelpDesk/DeleteSeverity?id=${data}`).then((response) => {
    return response.data;
  });
};

const severityService = {
  PostNewSeverity,
  GetHelpDeskSeverities,
  UpdateSeverity,
  DeleteSeverity,
};

export default severityService;
