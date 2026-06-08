import axios from 'axios';


const DeleteTicket = (data) => {
  return axios.post(`Admin/HelpDesk/DeleteTicket?id=${data}`).then((response) => {
    return response.data;
  });
};
const ticketService = {
  DeleteTicket
};

export default ticketService;
