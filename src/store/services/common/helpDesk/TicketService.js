import axios from 'axios';

const GetHelpDeskDetails = (id) => {
  return axios.post('HelpDesk/GetHelpDeskDetails?id=' + id).then((response) => {
    return response.data;
  });
};
const GetDetailedHelpDeskDetails = (id) => {
  return axios.post('HelpDesk/GetDetailedHelpDeskDetails?id=' + id).then((response) => {
    return response.data;
  });
};
const GetHelpDeskActivities = (data) => {
  return axios.post('HelpDesk/GetHelpDeskActivities', data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskCategories = (data) => {
  return axios.post('HelpDesk/GetHelpDeskCategories', data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskStatuses = (data) => {
  return axios.post('HelpDesk/GetHelpDeskStatuses', data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskSeverities = (data) => {
  return axios.post('HelpDesk/GetHelpDeskSeverities', data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskIncidents = (data) => {
  return axios.post('HelpDesk/GetHelpDeskIncidents', data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskUsers = (data) => {
  return axios.post('HelpDesk/GetHelpDeskUsers', data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskAssets = (data) => {
  return axios.post('HelpDesk/GetHelpDeskAssets', data).then((response) => {
    return response.data;
  });
};
const GetCompany = (data) => {
  return axios.post('HelpDesk/GetCompany', data).then((response) => {
    return response.data;
  });
};
const GetSeverity = (data) => {
  return axios.post('HelpDesk/GetSeverity', data).then((response) => {
    return response.data;
  });
};
const GetBrand = (data) => {
  return axios.post('HelpDesk/GetBrand', data).then((response) => {
    return response.data;
  });
};
const GetCategory = (data) => {
  return axios.post('HelpDesk/GetCategory', data).then((response) => {
    return response.data;
  });
};

const GetModel = (data) => {
  return axios.post('HelpDesk/GetModel', data).then((response) => {
    return response.data;
  });
};
const GetEquipment = (id) => {
  return axios.post('HelpDesk/GetEquipment?id=' + id).then((response) => {
    return response.data;
  });
};
const GetEqType = (data) => {
  return axios.post('HelpDesk/GetEqType', data).then((response) => {
    return response.data;
  });
};
const GetUserByCompany = (companyId) => {
  return axios.post('HelpDesk/GetUserByCompany?companyId=' + companyId).then((response) => {
    return response.data;
  });
};
const GetAssignedTickets = (data) => {
  return axios.post('HelpDesk/GetAssignedTickets', data).then((response) => {
    return response.data;
  });
};
const GetAssigneeTickets = (data) => {
  return axios.post('HelpDesk/GetAssigneeTickets', data).then((response) => {
    return response.data;
  });
};
const GetTicketsLogs = (id) => {
  return axios.post('HelpDesk/GetTicketsLogs?id=' + id).then((response) => {
    return response.data;
  });
};
const PostNewHelp = (data) => {
  return axios.post('HelpDesk/PostNewHelp', data).then((response) => {
    return response.data;
  });
};
const UpdateHelp = (data) => {
  return axios.post('HelpDesk/UpdateHelp', data).then((response) => {
    return response.data;
  });
};
const PostTicketLog = (data) => {
  return axios.post('HelpDesk/PostTicketLog', data).then((response) => {
    return response.data;
  });
};
//Delete the Ticket
const DeleteTicket = (id) => {
  return axios.post(`/Admin/HelpDesk/DeleteTicket?id=${id}`).then((response) => {
    return response.data;
  });
};
//updating chart counts
const GetHelpDeskChartCounts = (data) => {
  return axios.get(`HelpDesk/GetHelpDeskChartCounts`, data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskNewLocations = (data) => {
  return axios.get(`HelpDesk/GetHelpDeskNewLocations`, data).then((response) => {
    return response.data;
  });
};

const GetLocation = (data) => {
  return axios.get(`HelpDesk/GetLocation`, data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskDepts = (data) => {
  return axios.get(`HelpDesk/GetHelpDeskDepts`, data).then((response) => {
    return response.data;
  });
};
const PostNewEquipment = (data) => {
  return axios.post('HelpDesk/PostNewEquipment', data).then((response) => {
    return response.data;
  });
};
//updating table chart details
const GetAllTickets = (data) => {
  return axios.get(`HelpDesk/GetAllTickets`, data).then((response) => {
    return response.data;
  });
};
const HelpDeskService = {
  DeleteTicket,
  GetHelpDeskNewLocations,
  // GetHelpDeskLocations,
  GetHelpDeskDepts,
  GetAssignedTickets,
  GetAssigneeTickets,
  GetBrand,
  GetCategory,
  GetCompany,
  GetDetailedHelpDeskDetails,
  GetEqType,
  GetEquipment,
  GetHelpDeskActivities,
  GetHelpDeskCategories,
  GetHelpDeskDetails,
  GetHelpDeskIncidents,
  GetHelpDeskSeverities,
  GetHelpDeskStatuses,
  GetHelpDeskUsers,
  GetLocation,
  GetModel,
  GetSeverity,
  GetTicketsLogs,
  GetUserByCompany,
  PostNewHelp,
  PostTicketLog,
  UpdateHelp,
  GetHelpDeskChartCounts,
  GetHelpDeskAssets,
  PostNewEquipment,
  GetAllTickets,
};

export default HelpDeskService;
