import axios from 'axios';

const PostNewIncident = (data) => {
  return axios.post('Admin/HelpDesk/PostNewIncident', data).then((response) => {
    return response.data;
  });
};

const GetHelpDeskIncidents = (data) => {
  return axios.get(`Admin/HelpDesk/GetHelpDeskIncidents`, data).then((response) => {
    return response.data;
  });
};
const UpdateIncident = (data) => {
  return axios.post(`Admin/HelpDesk/UpdateIncident`, data).then((response) => {
    return response.data;
  });
};
const DeleteIncident = (data) => {
  return axios.post(`Admin/HelpDesk/DeleteIncident?id=${data}`).then((response) => {
    return response.data;
  });
};

const incidentService = {
  PostNewIncident,
  GetHelpDeskIncidents,
   UpdateIncident,
   DeleteIncident,
};

export default incidentService;
