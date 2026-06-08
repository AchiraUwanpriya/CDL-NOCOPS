import axios from 'axios';

const GetAllHeaderComponents = () => {
    return axios.get(`Admin/Access/GetAllHeaderComponents`).then((response) => {
      return response.data;
    });
  };
const UpdateComponentAccess = (data) => {
    return axios.post(`Admin/Access/UpdateComponentAccess?userType=${data.userType}&componentId=${data.componentId}&accessMode=${data.accessMode}`).then((response) => {
      return response.data;
    });
  };

const UserAccessService = {
  GetAllHeaderComponents,
  UpdateComponentAccess
};

export default UserAccessService;
